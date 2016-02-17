define([

    'api/api',
    'api/debug',
    'museum/museum',
    'api/template',
    'api/visited',

    'components/loader',
    'components/omnibar/omnibar',

    'api/route',
    'api/model/user',

    'api/assets', // only in TreeDisplayer.prepareResponse
    'tree/TreeData', // only in TreeDisplayer.prepareResponse

    'tree/NodeUtils',
    'tree/Viewport',
    'tree/VideoPlayer',
    'tree/HoverPlayer',
    'tree/AddButton',
    'tree/Layout',
    'tree/Minimap',
    'tree/Fruit',
    'tree/moderatedWarning',

    'dat/require/svg!tree/symbols.svg',

    'utils/math',
    'utils/EasyTween',

    'dat/svg/utils',

    'dat/utils/Batcher',

    'dat/dom/dom',
    'dat/dom/fade',
    'dat/dom/evaluate',
    'dat/utils/urlArgs',
    'api/siteCopy',
    'api/links',

    'text!tree/svg/arrow.txt', // todo move to symbols.svg
    'text!tree/templates/tree-meta.html',
    //  'css!../../styles/tree.css',

    'DMAF',

    'moderate/Curate',
    'text!moderate/templates/curated-tree.html',
    'panels/MessagePanel',

    'underscore',
    'tween'

], function(api, debug, museum, template, visited, loader, omnibar, route, user, assets, TreeData, NodeUtils, Viewport, VideoPlayer, HoverPlayer, AddButton, Layout, Minimap, Fruit, moderatedWarning, symbols, math, EasyTween, svg, Batcher, dom, fade, evaluateDOM, urlArgs, siteCopy, links, ARROW, META, dmaf, Curate, curatedHTML, MessagePanel) {

    var getVisitedBatcher = new Batcher({
        bin: 5,
        timeout: 3000,
        batch: function(trees) {
            var tree_map = {};
            var ids = [];
            _.each(trees, function(tree) {
                if (!tree.id) return;
                tree_map[tree.id] = tree;
                ids.push(tree.id);
            });
            if (ids.length == 0) return;
            if (user.loggedIn) {
                api.getTreesVisited(ids, function(visits) {
                    _.each(visits, function(visited_at, tree_id) {
                        //temp
                        if (!tree_map[tree_id].nodeUtils) {
                            // console.log(tree_map[tree_id], tree_id);
                        }
                        tree_map[tree_id].nodeUtils.setVisited(visited_at);
                    });
                    if (user.loggedIn) {
                        api.visitTree(ids, function() {
                        });
                    }

                });
            }

        }

    });

    var nodeViewBatcher = new Batcher({
        bin: 10,
        timeout: 10000,
        unique: true,
        batch: function(node_ids) {
            api.viewNodes(node_ids, function() {
            });
        }
    });

    var TreeDisplayer = function (params) {


        var _this = this;

        params = _.extend(params, {
            data: new TreeData(params.nodes),
            width: 350,
            height: 350,
            thumbnail_url: assets.getSmallVideoURL(params.nodes[0]),
            user_link: links.getProfileLink(params.user_name)
        });

        params = _.defaults(params, {
            normalize: true,
            fullsize: true,
            padding: 100,
            width: 500,
            height: 500,
            minScale: 0.0002,
            id: false,
            silent: false
        });



        this.drafts = params.drafts || [];
        this.interest = params.interest || [];

        this.seedSize = params.seed_size;
        this.silent = params.silent;

        this.nodeUtils = NodeUtils(this);
        this.nodesArr = params.data.nodesArr;
        this.nodesMap = params.data.nodesMap;
        this.maxGen = params.data.maxGen;
        this.fullsize = params.fullsize;

        params.isAdmin = user.isAdmin;
        params.projection = museum.isProjection();

        this.params = params;

        this.hoverMode = urlArgs['hover'] || 'clip';
        this.clickMode = urlArgs['click'] || 'focus';

        this.id = params.id;
        this.owner = params.user_name;
        this.moderated = params.moderated;



        getVisitedBatcher.add(this);

        /* ===== SVG Structure ===== */

        // Main container
        this.domElement = document.createElement('div');
        this.domElement.setAttribute('class', 'tree-container');

        // Tree displayer itself.
        this.svgElement = svg.createElement('svg');
        this.svgElement.setAttribute('class', 'tree');
        this.domElement.appendChild(this.svgElement);

        // Group that is translated to simulate viewport manipulation.
        // Nodes are appended here.
        this.viewportGroup = svg.createElement('g');
        this.svgElement.appendChild(this.viewportGroup);

        this.id = params.id;
        this.owner = params.user_name;
        this.moderated = params.moderated;
        this.curate = new Curate();

        /* ===== Width & Height ===== */

        if (params.fullsize) {

            var rect = dom.getRect(document.getElementById('content'));

            params.height = rect.height;
            params.width = rect.width;

            this.domElement.style.position = 'absolute';

        }

        this.setSize(params.width, params.height);

        /* ===== Viewport ===== */

        this.viewport = new Viewport(this);

        this.tweenProgress = { t: 0 };
        this.tweenDest = {};
        this.tweenStart = {};

        // TODO move to EasyTween
        this.tween = new TWEEN.Tween(this.tweenProgress)
            .onUpdate(function() {
                _this.onAnimateViewport();
            });

        /* ===== Find extremities ===== */

        this.getExtremities();

        /* ===== Rest viewport ===== */

        //    this.restScale = params.normalize ? Math.min(this.height / this.treeHeight, this.width / this.treeWidth) : 0.05;

        this.normalize = params.normalize;
        this.minScale = params.minScale;

        this.getRestPosition();
        this.resetViewport();

        /* ===== Display ===== */

        this.fruit = [];

        this.animate = true;

        this.minBT = 0.50;
        this.maxBT = 0.15;

        this.dt = 0.9;

        this.lineShrink = 1;

        this.bezierStrength = 0.41;
        this.animationBezierStrength = 0.3;

        this.tweenLengthFocused = 1200;
        this.tweenLengthFromRest = 2000;
        this.tweenLengthToRest = 1500;

        this.focusLineScale = 0.18;
        this.restLineScale = 2;

        /* ===== Add defs ===== */

        this.defs = svg.createElement('defs');

        var g = svg.createElement('g');
        g.setAttribute('transform', 'translate( -0.5 -0.5 )');

        var path = svg.createElement('path');
        path.setAttribute('d', ARROW);
        g.setAttribute('id', 'arrow');
        g.appendChild(path);

        this.bulb = symbols.querySelector('#bulb').firstElementChild;
        this.base = symbols.querySelector('#base').firstElementChild.cloneNode(false);
        this.fruitSymbol = symbols.querySelector('#' + (urlArgs.fruit || 'leaf-thin-2')).firstElementChild;
        this.defs.appendChild(g);
        //          this.defs.appendChild();
        this.svgElement.appendChild(this.defs);

        this.cameraDebug = false;

        /* ===== Fruit ===== */

        this.hoverPlayer = new HoverPlayer(this);

        this.playhead = svg.createElement('rect', { width: 12, height: 5, x: -6, y: -2.5, rx: 2, ry: 2 });
        svg.addClass(this.playhead, 'playhead-pos');

        this.playhead2 = svg.createElement('g');
        svg.addClass(this.playhead2, 'playhead-path');

        //    this.viewportGroup.appendChild(this.playhead);


        this.setFruit();
        _.each(this.nodesArr, function(node) {
            if (!node.hidden) {
                this.addNodeToViewport(node);
            }
        }, this);


        // add base

        this.base.setAttribute('transform', 'translate(0,' + this.nodesArr[0].dy2 +  1 + ') scale(' + this.nodesArr[0].dlineWidth / 20 + ')');
        svg.addClass(this.base, 'base');
        this.nodesArr[0].elem.appendChild(this.base);


        if (urlArgs.getBoolean('zoomable', true)) {

            var zoomSpeed = 10 / 9;

            this.zoom = function(e) {

                if (!_this.interactive || museum.isProjection()) return;

                e.preventDefault();
                e.stopPropagation();

                var scale = _this.viewport.scale,
                    x = _this.viewport.x,
                    y = _this.viewport.y;

                if (!_this.focusedNode) {

                    if (_this.viewport.scale == _this.restScale && e.wheelDelta < 0) return false;

                    scale = e.wheelDelta > 0 ? scale * zoomSpeed : scale / zoomSpeed;

                    var scaleRatio = 1 - _this.viewport.scale / scale;

                    // The origin point about which we scale.
                    var o = _this.nodeUtils.getWorldPosition(e.clientX, e.clientY);
                    o.x -= _this.viewport.x;
                    o.y -= _this.viewport.y;

                    x += o.x * scaleRatio;
                    y += o.y * scaleRatio;

                    // Clamp scale at rest
                    scale = Math.max(scale, _this.restScale);

                    if (scale > 10 / Layout.scaleAll) return;
                    // Keep trunk in ground
                    y = Math.min(y, _this.maxY - _this.viewport.height / 2);

                    _this.viewport.set(x, y, _this.viewport.rotation, scale);

                } else {

                    _this.setFocusedNode(undefined);

                }
                return false;


            };


            dom.bind(this.domElement, 'mousewheel', this.zoom);

        }


    };

    _.extend(
        TreeDisplayer.prototype,
        {

            more: function() {

                var _this = this;

                if (this.params.more) {

                    loader.show('corner');
                    api.getTree(this.id, this.params.cursor, function(resp) {
                        var add = function() {
                            loader.hide();
                            if (_this.interactive) {
                                _this.addNodes(resp);
                                _this.more();
                            }
                        };
                        add();
                    });
                } else {
                    debug("No more nodes left to get.");
                }

            },

            addNodes: function(resp) {


                var _this = this;

                this.params.data.addNodes(resp.nodes);
                this.params.cursor = resp.cursor;
                this.params.more = resp.more;

                this.maxGen = this.params.data.maxGen;

                this.setFruit();

                _.each(resp.nodes, function(node) {
                    if (!node.hidden) {
                        _this.addNodeToViewport(node);
                    }
                }, this);

                if (this.focusedNode) {
                    this.nodeUtils.onfocus(this.focusedNode);
                }

                this.getExtremities();

                if (!this.focusedNode) {
                    //            if (this.minimap) this.minimap.refreshImage();
                } else {
                    this.onAnimateViewport();
                    //            this.nodeUtils.recurseDescendants(this.focusedNode, function(node) {
                    //              _this.nodeUtils.setPosition(node);
                    //            }, 1);
                }

                if (this.visited_at) {
                    this.nodeUtils.setVisited(this.visited_at);
                }

            },

            setFruit: function() {

                _.each(this.nodesArr, function(node) {
                    if (node.descendants == 0) {
                        this.nodeUtils.setFruit(node);
                    }
                }, this);

            },

            update: function() {

                if (this.hoverPlayer) this.hoverPlayer.update();
                if (this.videoPlayer) this.videoPlayer.update();

                // Update the camera if our position has changed.
                if (!this.freezeCamera && this.viewport.changed) {
                    this.applyViewport();
                }

                var i = 0;

                // See who's in the viewport
                _.each(this.nodesArr, function(node) {

                    node.added = true;
                    node.visible = true;
                    node.order = i;
                    i++;

                    if (node.elem && node.needsUpdate) {
                        this.nodeUtils.setPosition(node);
                        node.needsUpdate = false;
                    }

                }, this);

                // Make sure we don't do this again next frame unless things change
                this.viewport.changed = false;

            },

            removeNodeFromViewport: function(node) {
                if (node.elem && dom.getParent(node.elem))
                    fade.out(node.elem, 500);
                if (node.fruit && dom.getParent(node.fruit)) {
                    fade.out(node.fruit.tail, 500);
                }
            },

            addNodeToViewport: function(node) {

                // Create elements for fresh nodes.
                var elem = node.elem || this.nodeUtils.makeElement(node);

                if (!this.focusedNode && node.fruit) {
                    this.viewportGroup.appendChild(node.fruit.tail);
                }
                // Maintain prescribed order
                if (node.front) {

                    if (node.parent && node.parent.added) {
                        fade.into(elem, this.viewportGroup, undefined, node.parent.elem);
                    } else {
                        fade.into(elem, this.viewportGroup);
                    }

                } else {
                    fade.into(elem, this.viewportGroup, undefined, this.viewportGroup.firstElementChild);
                }



            },

            /**
             * Sets the currently active node on the tree, or clears focus and zooms
             * the tree out.
             *
             * @param node The node to focus, or undefined to clear focus.
             * @param reverse True if moving backwards in the tree. This ensures the
             * bezier handles point in the right direction for the camera path.
             */
            setFocusedNode:function (node, reverse, noHistory) {

                // Don't let this fire during transitions, or on repeat clicks.
                if (museum.isProjection() || this.tweening || node == this.focusedNode) return;
                this.tmp = node;

                this.hoverPlayer.hide();

                var _this = this, ax, ay, aa, as, ab, at;

                // Was there a node before?
                if (this.focusedNode) this.nodeUtils.onunfocus(this.focusedNode);

                if (node) {

                    this.nodeUtils.onfocus(node);

                    ax = node.restLayout.rrx;
                    ay = node.restLayout.rry;
                    aa = node.restLayout.rangle;
                    as = node.restLayout.viewportScale;
                    ab = 0;
                    at = this.focusedNode ? this.tweenLengthFocused : this.tweenLengthFromRest;

                    if (this.restAddButton) {
                        dom.addClass(this.restAddButton, 'hidden');
                    }

                } else {

                    this.getRestPosition();

                    svg.removeClass(this.svgElement, 'focused');

                    ax = this.restX;
                    ay = this.restY;
                    aa = this.restRotation;
                    as = this.restScale;
                    ab = 0;
                    at = this.tweenLengthToRest;

                    if (this.restAddButton) {
                        this.restAddButton.className = '';
                    }

                }


                this.prevFocusedNode = this.focusedNode;
                this.focusedNode = node;

                if (!this.prevFocusedNode && this.focusedNode) {

                    this.hideFruit();

                } else if (this.prevFocusedNode && !this.focusedNode) {

                    this.showFruit();
                }

                this.animateViewport(ax, ay, aa, as, ab, at, reverse);

                if (noHistory !== true) this.setHistoryState();

            },

            /**
             * Light boxes the video player given the thumbnail of a node. You
             * don't pass in the node directly as the thumb could be a normal thumb
             * or a fruit. All thumbs have a node.
             *
             * @param thumb
             */
            setViewingNode: function(node, fromThumb, noHistory) {

                if (museum.isProjection()) return;

                //          if (thumb == this.viewingNode) return;

                this.hoverPlayer.hide();

                if (node) {

                    this.viewNode(node);

                    svg.addClass(this.svgElement, 'viewing');
                    if (fromThumb) fromThumb.center();

                    this.videoPlayer.lightbox(node, this.nodesMap);


                } else {

                    svg.removeClass(this.svgElement, 'viewing');
                    //            this.svgElement.insertBefore(this.backgroundElement,
                    //                this.svgElement.firstElementChild);


                }

                this.prevViewingNode = this.viewingNode;

                if (this.prevViewingNode) {
                    this.videoPlayer.hide();
                    if (this.prevThumb) this.prevThumb.uncenter();
                }

                this.viewingNode = node;
                this.prevThumb = fromThumb;

                if (noHistory !== true) this.setHistoryState();

            },

            setHistoryState: function() {

                var s = [];

                if (this.viewingNode) {
                    s.push('v=' + this.viewingNode.id);
                }

                if (this.focusedNode) {
                    s.push('f=' + this.focusedNode.id);
                }


                history.replaceState({}, null, '?' + s.join('&'))

            },

            setSize: function(w, h) {

                if (this.interactive && this.needsModerationPanel) {
                    w -= 390;
                }

                this.width = this.svgElement.width = w;
                this.height = this.svgElement.height = h;
                this.domElement.style.width = this.width + 'px';
                this.domElement.style.height = this.height + 'px';

                if (this.viewport) {
                    if (this.restScale && !this.focusedNode) {
                        this.getRestPosition();
                        this.resetViewport();
                    }
                    this.viewport.updateWidthAndHeight();
                    this.applyViewport();
                }

                return this;

            },

            onResize: function(elem) {

                var _this = this;

                var rect = dom.getRect(elem || document.getElementById('content'));
                this.setSize(rect.width, rect.height);

                if (this.focusedNode) {
                    this.nodeUtils.recurseDescendants(this.focusedNode, function(node) {
                        if (node.elem)
                            _this.nodeUtils.setPosition(node);
                    }, 1);
                }

            },

            viewNode: function(node) {

                nodeViewBatcher.add(node.id);
                this.nodeUtils.removeNodeClass(node, 'new');
                if (node.fruit) {
                    svg.removeClass(node.fruit.tail, 'new');
                }

            },


            getExtremities: function() {

                this.minX = this.maxX = this.minY = this.maxY = false;

                var fruitPadding = TreeDisplayer.getPadding(this, Fruit);


                var i = 0;
                _.each(this.nodesMap, function(node) {

                    Layout.layout(node, this, node);

                    node.treeIndex = i;


                    i++;
                    if (!this.minX || node.dx1 - fruitPadding < this.minX) this.minX = node.dx1 - fruitPadding;
                    if (!this.maxX || node.dx1 + fruitPadding > this.maxX) this.maxX = node.dx1 + fruitPadding;
                    if (!this.minY || node.dy1 - fruitPadding < this.minY) this.minY = node.dy1 - fruitPadding; // Account for fruit


                }, this);


                this.maxY = this.nodesArr[0].dy2;
                //          this.minY -= this.params.padding;


                this.treeWidth = Math.max(Math.abs(this.maxX), Math.abs(this.minX)) * 2 + this.params.padding * 2;
                this.treeHeight = this.maxY - this.minY;


            },

            showFruit: function() {
                _.each(this.fruit, function(node) {
                    node.fruit.show();
                }, this);
            },

            hideFruit: function() {

                _.each(this.fruit, function(node) {
                    if (node.added)
                        node.fruit.hide();
                }, this);
            },

            onClickBackground: function() {
                if (this.viewingNode) {
                    this.setViewingNode(undefined);
                } else if (this.focusedNode) {
                    this.setFocusedNode(undefined);
                }
            },

            applyViewport: function() {

                if (_.isNaN(this.viewport.width) || this.viewport.width == Infinity || this.viewport.width == -Infinity) return;

                // Apply viewport
                if (!this.cameraDebug) {

                    this.svgElement.setAttribute('viewBox',
                                                 (this.viewport.x - this.viewport.width / 2) + ' ' +
                                                 (this.viewport.y - this.viewport.height / 2) + ' ' +
                                                 this.viewport.width + ' ' +
                                                 this.viewport.height);

                    this.viewportGroup.setAttribute('transform',
                                                    'rotate (' +
                                                    (-this.viewport.rotation * math.RADIANS_TO_DEGREES) + ' ' +
                                                    this.viewport.x + ' ' +
                                                    this.viewport.y + ')');

                } else {

                    TreeDisplayer.setViewportShapePosition(this.viewport, this.viewportShape);

                }

                // Keep background element fullscreen
                if (this.backgroundElement) {
                    this.backgroundElement.setAttribute('x', this.viewport.x - this.viewport.width / 2);
                    this.backgroundElement.setAttribute('y', this.viewport.y - this.viewport.height / 2);
                    this.backgroundElement.setAttribute('width', this.viewport.width);
                    this.backgroundElement.setAttribute('height', this.viewport.height);
                }


                if (this.interactive && !museum.isProjection()) {


                    if (this.viewport.scale > this.restScale * 1.05) {
                        if (_.isElement(this.metaText)) {
                            this.metaText.style.opacity = 0;
                        }
                        if (this.minimap && this.minimap.domElement) {
                            this.minimap.domElement.setAttribute('class', 'tree interactive');
                        }
                    } else {
                        if (_.isElement(this.metaText)) {
                            this.metaText.style.opacity = 1;
                        }
                        if (this.minimap && this.minimap.domElement) {
                            this.minimap.domElement.setAttribute('class', 'tree interactive hidden');
                        }
                    }

                    if (this.minimap) this.minimap.update();
                }

            },

            resetViewport: function() {
                this.viewport.set(this.restX, this.restY, this.restRotation, this.restScale);
            },

            animateViewport: function(x, y, rotation, scale, bezierStrength, time, reverse) {

                var i = reverse ? -1 : 1;

                var bd = math.dist(this.viewport.x, this.viewport.y, x, y) * bezierStrength;

                this.tweenDest.x = x;
                this.tweenDest.y = y;

                this.tweenDest.rotation = rotation;
                this.tweenDest.scale = scale;

                this.tweenDest.cx = this.tweenDest.x + Math.cos(this.tweenDest.rotation + math.HALF_PI * i) * bd;
                this.tweenDest.cy = this.tweenDest.y + Math.sin(this.tweenDest.rotation + math.HALF_PI * i) * bd;

                this.tweenStart.x = this.viewport.x;
                this.tweenStart.y = this.viewport.y;

                this.tweenStart.rotation = this.viewport.rotation;
                this.tweenStart.scale = this.viewport.scale;

                this.tweenStart.cx = this.tweenStart.x + Math.cos(this.tweenStart.rotation - math.HALF_PI * i) * bd;
                this.tweenStart.cy = this.tweenStart.y + Math.sin(this.tweenStart.rotation - math.HALF_PI * i) * bd;

                svg.setAttributes(this.tweenShape, {
                    d:'M' + this.viewport.x + ',' + this.viewport.y + ' C' +
                        this.tweenStart.cx + ',' + this.tweenStart.cy + ' ' +
                        this.tweenDest.cx + ',' + this.tweenDest.cy + ' ' + x + ' ' + y
                });

                this.tween.stop();
                this.tweenProgress.t = 0;

                var _this = this;

                this.tweening = true;

                this.prevScale = undefined;

                this.tween.onComplete(function() {
                    _this.tweening = false;
                    if (!_this.tmp) {
                        _.each(_this.nodesArr, function(node) {
                            _.extend(node, node.restLayout);
                        });
                    }
                });

                _.defer(function() {
                    _this.tween.to(math.FINISHED, time).start();
                });


            },

            onAnimateViewport: function() {

                var _this = this;
                var t = this.tweenProgress.t;
                var t1 = TWEEN.Easing.Cubic.EaseInOut(t);

                var t2 = this.prevFocusedNode && this.focusedNode ?
                    TWEEN.Easing.Cubic.EaseOut(t) : TWEEN.Easing.Exponential.EaseOut(t);

                if (this.prevFocusedNode) {

                    this.nodeUtils.recurseDescendants(this.prevFocusedNode, function(node) {
                        //              if (node.focused) return;
                        if (!node.focused && node.descendsFromFocused) return;
                        _.each(node.focusedLayout, function(val, prop) {
                            node[prop] = math.lerp(node.init[prop], node.restLayout[prop], this.focusedNode ? t2 : t1);
                            if (isNaN(node[prop])) debug('nan found', prop)
                        }, _this);

                        node.needsUpdate = true;

                        if (node.parent) {
                            node.dx2 = node.parent.dx1;
                            node.dy2 = node.parent.dy1;
                        }


                        //              var r = Math.round(Math.random()*255);
                        //              var g = Math.round(Math.random()*255);
                        //              var b = Math.round(Math.random()*255);
                        //              if (node.line) node.line.setAttribute('stroke', 'rgb('+r+','+g+','+b+')');

                    }, 2);

                }

                if (this.focusedNode) {

                    /// TEMP ////
                    this.nodeUtils.recurseDescendants(this.focusedNode, function(node, depth) {


                        //              var r = Math.round(Math.random()*255);
                        //              var g = Math.round(Math.random()*255);
                        //              var b = Math.round(Math.random()*255);
                        //              if (node.line) node.line.setAttribute('stroke', 'rgb('+r+','+g+','+b+')');

                        if (depth === 0) {

                            var o = {};
                            Layout.layout(node, _this, o, false);
                            _.each(o, function(val, prop) {
                                if (prop == 'dx1' || prop == 'dy1' || prop == 'cx1' || prop == 'cy1') return;
                                node[prop] = o[prop];

                            });


                        } else if (depth == 2) {

                            node['dlineWidth'] = math.lerp(node.init['dlineWidth'], node.focusedLayout['dlineWidth'], t2);

                        } else {

                            _this.nodeUtils.calcPosition(node, false);

                            _.each(node.focusedLayout, function(val, prop) {

                                node[prop] = math.lerp(node.init[prop], node.focusedLayout[prop], t2);
                            });


                        }

                        if (node.parent) {
                            node.dx2 = node.parent.dx1;
                            node.dy2 = node.parent.dy1;
                        }

                        node.needsUpdate = true;

                    }, 2);

                } else {
                    t1 = TWEEN.Easing.Cubic.EaseOut(t);
                }


                var scale = math.lerp(
                    this.tweenStart.scale,
                    this.tweenDest.scale,
                    t1);
                var rotation = math.lerp(
                    this.tweenStart.rotation,
                    this.tweenDest.rotation,
                    t1);

                var x, y;

                if (this.prevFocusedNode && this.focusedNode) {

                    x = math.lerp(
                        this.tweenStart.x,
                        this.tweenDest.x,
                        t2);

                    y = math.lerp(
                        this.tweenStart.y,
                        this.tweenDest.y,
                        t2);

                } else {

                    var scaleRatio, ox, oy;

                    scaleRatio = (1 - this.viewport.scale / scale);

                    if (this.tweenDest.scale > this.tweenStart.scale) {
                        ox = this.tweenDest.x;
                        oy = this.tweenDest.y;
                        x = this.viewport.x + (ox - this.viewport.x) * scaleRatio;
                        y = this.viewport.y + (oy - this.viewport.y) * scaleRatio;
                        x = math.lerp(x, this.tweenDest.x, t1);
                        y = math.lerp(y, this.tweenDest.y, t1);
                    } else {
                        ox = this.tweenStart.x;
                        oy = this.tweenStart.y;
                        x = this.viewport.x + (ox - this.viewport.x) * scaleRatio;
                        y = this.viewport.y + (oy - this.viewport.y) * scaleRatio;
                        x = math.lerp(x, this.tweenDest.x, Math.pow(t1, 50)); // big hack.
                        y = math.lerp(y, this.tweenDest.y, Math.pow(t1, 50));
                    }

                }

                this.viewport.set(x, y, rotation, scale);


            },

            getRestPosition: function() {
                _.extend(this, TreeDisplayer.getRestPosition(this, this.normalize));
            },

            fuzzyClick: function(e) {

                var hoverNode = this.hoverNode;

                if (this.dragged || this.viewingNode || this.focusedNode || this.tweening) return;

                if (this.hoverNode) this.nodeUtils.onmouseout(this.hoverNode, e);

                if (this.hoverNode && this.restAddButtonActive && this.hoverNode.generation < 60) {

                    var fork = function() {
                        window.location.href = links.getForkLink(hoverNode.id);
                    };

                    if (hoverNode.generation >= 60) return;
                    if (this.moderated) {
                        moderatedWarning(fork);
                    } else {
                        fork();
                    }

                } else if (!(this.restAddButtonActive && this.overFruit)) {
                    this.setFocusedNode(this.hoverNode);
                }

                if (this.hoverNode) document.body.style.cursor = 'auto';

                _.defer(_.bind(this.hoverPlayer.hide, this.hoverPlayer));
                this.hoverNode = this.prevHoverNode = undefined;


            },

            fuzzyHover: function(e) {
                if (this.overFruit ||
                    this.viewingNode ||
                    this.focusedNode ||
                    this.tweening ||
                    this.hoverSupressed) return; // todo kill, bind and unbind this

                this.prevHoverNode = this.hoverNode;
                this.hoverNode = this.nodeUtils.getClosestNode(e.clientX, e.clientY);

                if (this.prevHoverNode && this.prevHoverNode != this.hoverNode) {
                    this.nodeUtils.onmouseout(this.prevHoverNode);
                }

                if (this.hoverNode) {

                    document.body.style.cursor = 'pointer';

                    this.nodeUtils.onmousemove(this.hoverNode, e);

                    if (this.prevHoverNode != this.hoverNode) {

                        if (this.hoverNode.generation >= 60) {
                            dom.addClass(this.hoverNode, 'prohibited');
                        } else {
                            dom.removeClass(this.hoverNode, 'prohibited');
                        }

                        this.hoverPlayer.show(this.hoverNode, this.hoverMode);
                        this.nodeUtils.onmouseover(this.hoverNode);
                    }

                } else if (this.prevHoverNode) {

                    this.hoverPlayer.hide();
                    document.body.style.cursor = 'auto';

                }

            },

            transitionToInteractive: function() {

                this.fullsize = true;
                this.normalize = true;

                // Replace domElement in previous position
                this.initRect = dom.getRect(this.domElement, true);
                this.destRect = dom.getRect(document.getElementById('content'), true);

                this.placeHolder = this.placeHolder || document.createElement('div');
                this.prevParent = this.prevParent || dom.getParent(this.domElement);

                this.prevStyles = _.extend(this.prevStyles || {}, this.domElement.style);

                this.domElement.style.position = 'absolute';
                this.domElement.style.zIndex = 1;
                //
                this.domElement.style.marginTop = 0;
                this.domElement.style.marginLeft = 0;
                //
                this.domElement.style.top = 0;//this.destRect.top + 'px';
                this.domElement.style.left = 0;//this.destRect.left + 'px';
                this.setSize(this.destRect.width, this.destRect.height);

                this.placeHolder.style.width = this.initRect.width + 'px';
                this.placeHolder.style.height = this.initRect.height + 'px';
                this.prevParent.insertBefore(this.placeHolder, this.domElement);


                dom.removeClass(document.body, 'rest-add');

                this.makeInteractive();

            },

            forceTweenComplete: function() {
                this.tweening = false;
                this.tweenProgress.t = 1;
                this.onAnimateViewport();
                this.update();

            },

            transitionToThumbnail: function(onComplete) {

                if (this.tweening) {
                    this.forceTweenComplete();
                }

                this.setViewingNode(undefined, false, true);
                this.setFocusedNode(undefined, false, true);

                this.forceTweenComplete();

                this.normalize = false;
                if (this.minimap && this.minimap.domElement) svg.addClass(this.minimap.domElement, 'hidden');


                fade.out(this.meta);
                if (this.restAddButton) dom.getParent(this.restAddButton).removeChild(this.restAddButton);

                //          this.galleryTween.onComplete(_.bind(function() {

                this.fullsize = false;

                this.interactive = false;

                this.prevParent.insertBefore(this.domElement, this.prevParent.firstElementChild);
                //          fade.into(this.domElement, this.prevParent.firstElementChild);
                if (dom.getParent(this.placeHolder)) this.prevParent.removeChild(this.placeHolder);

                this.setSize(this.initRect.width, this.initRect.height);
                _.extend(this.domElement.style, this.prevStyles);

                if (onComplete) onComplete();

                var framework = DMAF.getCore();
                if (!framework.isSilent) {
                    framework.dispatch('leaveSingleTreePage');
                }

                dom.removeClass(document.body, 'rest-add');
                if (this.restAddButtonTip && dom.getParent(this.restAddButtonTip)) {
                    dom.getParent(this.restAddButtonTip).removeChild(this.restAddButtonTip);
                }

                //          }, this));

                this.destroyInteractivity();
                this.getRestPosition();
                this.resetViewport();
                this.applyViewport();

                loader.hide();
            },

            destroyInteractivity: function() {


                if ( this.curate.moderation )
                    this.curate.hide();

                if (this.minimap && this.minimap.domElement) {
                    this.minimap.hide();
                }

                this.interactive = false;

                svg.removeClass(this.svgElement, 'interactive');
                dom.removeClass(document.body, 'no-fade');

                this.hoverPlayer.hide();
                this.setViewingNode(undefined, false, true);
                this.setFocusedNode(undefined, false, true);



                _.each(this.interactivityBindings, function(b) {
                    b.unbind();
                });

            },

            makeInteractive: function() {

                var _this = tree = this;

                this.getRestPosition();
                this.resetViewport();
                this.applyViewport();

                this.interactive = true;

                svg.addClass(this.svgElement, 'interactive');
                dom.addClass(document.body, 'no-fade');


                // Accommodate fake data
                if (this.id) {


                    //            api.getTreeFullview(this.id, function(fullview) {
                    //              _.each(fullview.nodes, function(nodeInfo, i) {
                    ////                _.extend(_this.nodesMap[nodeInfo.id], nodeInfo);
                    //              });
                    //              dmaf.ready(function() {
                    //                dmaf.framework.setMusicData(fullview.music);
                    //                dmaf.framework.setTreeStructureData(_this.nodesMap);
                    //                dmaf.framework.dispatch('enterSingleTreePage');
                    //              });
                    //            });

                    //            api.getTreeVotes(this.id, function(votes) {
                    //              _.each(votes, function(votedir, id) {
                    //                _this.nodesMap[id].my_vote = votedir;
                    //              });
                    //            });

                }

                _.each(this.nodesArr, function(node) {
                    if (node.elem) this.nodeUtils.makeFollowElement(node);
                }, this);

                /* ===== Debug Elements ===== */

                this.viewportShape = svg.createElement('rect', {
                    'stroke-width': TreeDisplayer.StrokeWidth / this.restScale,
                    stroke:'#999',
                    fill:'#fff'
                });

                this.tweenShape = svg.createElement('path', {
                    'stroke-width': TreeDisplayer.StrokeWidth,
                    stroke:'#00f',
                    fill:'none'
                });

                /* ===== Minimap ===== */

                _.defer(function() {
                    _this.minimap = new Minimap(_this);
                });

                /* ===== Add button ===== */

                this.addButton = new AddButton(this);

                /* ===== Player ===== */

                if (!this.videoPlayer) this.videoPlayer = VideoPlayer;
                this.videoPlayer.setTreeInfo(
                    this.params.name || siteCopy('untitled'),
                    this.params.user_name,
                    this.nodesArr[0].category,
                    this.seedSize,
                    this.nodesArr.length,
                    this.moderated);


                // This captures clicks to the background, for unfocusing and such.
                this.backgroundElement = svg.createElement('rect');
                svg.addClass(this.backgroundElement, 'background');
                this.svgElement.insertBefore(this.backgroundElement,
                                             this.svgElement.firstElementChild);


                if (_.isString(this.params.instructions))
                    this.params.instructions = this.params.instructions.split(api.Identifier);

                // console.log(META, this.params);

                this.params.isAdmin = !!this.params.isAdmin;

                this.meta = template(META, this.params);
                this.metaText = this.meta.querySelector('#tree-meta-text');
                this.instructions = true;
                this.instructionsClosedEver = false;
                this.instructionsToggle = this.meta.querySelector('#instructions-toggle');

                // Double check userIsOwner

                /**
                 * Toggle moderated button.
                 */

                if (this.params.user_key === me.id) {

                    var curatedElement = this.meta.querySelector('#curated-container');
                    curatedElement.innerHTML = _.template(curatedHTML, {
                        moderated: this.moderated
                    });

                    var checkbox = curatedElement.querySelector('input[type="checkbox"]');

                    var curatedPanel = new MessagePanel({
                        height: 84,
                        width: 180,
                        cancelCallback: function() {
                            checkbox.checked = !checkbox.checked;
                            curatedPanel.hide();
                        },
                        submitCallback: function() {
                            api.setTreeModerated(_this.id, checkbox.checked, function(resp) {
                                curatedPanel.hide();
                                _this.moderated = checkbox.checked;
                                if (_this.moderated) {
                                    _this.curate.start( _this, function(needsPanel) {
                                        _this.needsModerationPanel = needsPanel;
                                        if (needsPanel) _this.onResize();
                                    });
                                } else {
                                    _this.curate.moderation.hide();
                                    _this.curate.moderation.domElement.style.display = 'none';
                                }

                            }, function() { // Error Callback for api.setTreeModerated

                                checkbox.checked = !checkbox.checked;
                                curatedPanel.hide();

                            });
                        }

                    });

                    dom.bind( checkbox, 'change', function(){

                        var message = (checkbox.checked)
                            ? 'New contributions will require approval, continue?'
                            : 'New contributions will be automatically approved, continue?';

                        curatedPanel.message(message);
                        curatedPanel.show(true);

                    });

                }

                // disable author link for projection
                if (museum.isProjection()) {

                    var authorLink = this.meta.querySelector('#tree-seeder a');
                    authorLink.href = '';
                    authorLink.innerHTML = museum.displayName();
                    dom.bind(authorLink, 'click', function(e) {
                        e.preventDefault();
                        return false;
                    });

                } else {

                    if (this.params.isAdmin) {
                        api.getSubscribed(this.id, function(data) {
                            
                            var box = _this.meta.querySelector('#subscribe input');
                            var sub = _this.meta.querySelector('#subscribe');
                            if (_.isElement(box)) {
                                box.checked = data.subscribe;
                                dom.bind(box, 'change', function() {
                                    api.setSubscribed(_this.id, this.checked, function(){});
                                });
                            }
                            if (_.isElement(sub)) {
                                sub.style.display = 'inline-block';
                            }
                        });
                    }


                    this.makeRestButton();

                }

                //          dom.bind(this.instructionsToggle, 'click', function() {
                //            _this.toggleInstructions();
                //          });

                var backToGallery = this.meta.querySelector('#back-to-gallery');

                route.intercept(backToGallery);

                // need to stop the music when going back
                // to the tree browser
                dmaf.ready(function() {
                    var framework = DMAF.getCore();
                    if (!framework.isSilent) {
                        dom.bind(backToGallery, 'click', function(e) {
                            framework.dispatch('backToGalleryPressed');
                        });
                    }
                });


                this.domElement.appendChild(this.meta);

                /* ===== Interactivity Bindings ===== */

                if (!this.interactivityBindings) {

                    this.interactivityBindings = [];

                    _.each(this.fruit, function(node) {
                        node.fruit.makeInteractive();
                    });

                    dom.makeBinding(window, 'resize', this.onResize)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.domElement, 'mousedown', this.startDrag)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.domElement, 'mouseup', this.fuzzyClick)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.domElement, 'mousemove', this.fuzzyHover)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    // not part of video player, so it doesn't have to know about tree.
                    dom.makeBinding(this.videoPlayer.childCount, 'click', function(e) {
                        e.preventDefault();
                        this.setFocusedNode(this.viewingNode);
                        this.setViewingNode(undefined);
                        return false;
                    })
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.videoPlayer.shade, 'click', this.onClickBackground)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.videoPlayer.closeButton, 'click', this.onClickBackground)
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.videoPlayer.flagButton, 'click', function() {
                        this.setViewingNode(undefined);
                    })
                        .addTo(this.interactivityBindings)
                        .context(this);

                    dom.makeBinding(this.backgroundElement, 'click', this.onClickBackground)
                        .addTo(this.interactivityBindings)
                        .context(this);


                }

                _.each(this.interactivityBindings, function(b) {
                    b.bind();
                });


                if (this.moderated === true && !museum.isProjection()) {
                    _.defer(function() {
                        _this.curate.start(_this, function(needsPanel) {
                            _this.needsModerationPanel = needsPanel;
                            if (needsPanel) _this.onResize();
                        });
                    });
                }

                var v = urlArgs.getInt('v', 0);
                if (v) _.defer(function() {
                    _this.setViewingNode(_this.nodesMap[v]);
                });

                setTimeout(function() {
                    var f = urlArgs.getInt('f', 0);
                    if (f) {

                        var focus = function() {
                            _this.setFocusedNode(_this.nodesMap[f]);
                        };

                        if (_this.nodesMap[f]) {
                            focus();
                        } else {
                            debug('Node ID ' + f + ' not present. Grafting.');
                            loader.show('corner');
                            api.getNodeLineage(f, function(nodes) {
                                loader.hide();

                                //hax. seed is being duplicated and the resp is backwards.
                                nodes.pop();
                                nodes.reverse();

                                if (nodes[nodes.length-1].status == 'denied' ||
                                    nodes[nodes.length-1].status == 'removed') {
                                    omnibar.message("This branch is not available.").show();
                                    return;
                                }

                                _this.addNodes({nodes:nodes});
                                setTimeout(focus, 200);
                            });
                        }

                    }
                }, 200);

                this.more();

            },

            startDrag: function(e) {

                var _this = this;

                var px = e.clientX;
                var py = e.clientY;
                var onDrag = function(e) {

                    e.preventDefault();

                    _this.dragged = true;

                    if (_this.focusedNode || _this.tweening) return;
                    _this.supressHover();

                    _this.viewport.set(_this.viewport.x - (e.clientX - px) / _this.viewport.scale,
                                       _this.viewport.y - (e.clientY - py) / _this.viewport.scale,
                                       _this.viewport.rotation,
                                       _this.viewport.scale);

                    px = e.clientX;
                    py = e.clientY;

                    return false;

                };
                var endDrag = function() {
                    _this.hoverNode = _this.prevHoverNode = undefined;
                    dom.unbind(window, 'mousemove', onDrag);
                    dom.unbind(window, 'mouseup', endDrag);
                    _.defer(function() {
                        _this.dragged = false;
                        _this.unsupressHover();
                    });
                };
                dom.bind(window, 'mousemove', onDrag);
                dom.bind(window, 'mouseup', endDrag)
            },

            setCameraDebug: function(v) {
                this.viewport.changed = this.cameraDebug != v;
                if (!(this.cameraDebug = v)) {
                    this.svgElement.removeChild(this.viewportShape);
                    this.svgElement.removeChild(this.tweenShape);
                } else {
                    this.svgElement.appendChild(this.viewportShape);
                    this.svgElement.appendChild(this.tweenShape);
                    this.svgElement.setAttribute('viewBox', -this.width / 2 + ' ' + -this.height / 2 + ' ' + this.width + ' ' + this.height);
                    this.viewportGroup.removeAttribute('transform');
                }
            },

            supressHover: function() {
                this.hoverPlayer.hide();
                this.hoverSupressed = true;
            },

            unsupressHover: function() {
                this.hoverSupressed = false;
            },

            toggleInstructions: function() {
                this.instructions = !this.instructions;
                this.instructionsClosedEver = true;
                if (!this.instructionsToggle) return;
                if (this.instructions) {
                    dom.addClass(dom.getParent(this.instructionsToggle), 'showing');
                    this.innerHTML = siteCopy('hide-instructions');
                } else {
                    dom.removeClass(dom.getParent(this.instructionsToggle), 'showing');
                    this.innerHTML = siteCopy('view-instructions');
                }
            },

            makeRestButton: function() {

                var _this = this;
                var content = document.getElementById('content');

                if (!this.restAddButton) {


                    this.restAddButton = document.createElement('div');
                    this.restAddButton.id = 'rest-add-button';

                    this.restAddButtonActive = false;

                    this.restAddButtonTip = document.createElement('div');
                    this.restAddButtonTip.id = 'rest-add-button-tip';
                    this.restAddButtonTip.innerHTML = 'Select where to contribute';

                    dom.bind(this.restAddButton, 'mouseover', function() {
                        _this.supressHover();
                    });
                    dom.bind(this.restAddButton, 'mouseout', function() {
                        _this.unsupressHover();
                    });

                    var clearRestAddKey = function(e) {
                        if (e.keyCode == 27) {
                            clearRestAdd();
                        }
                    };

                    var clearRestAdd = function() {
                        dom.removeClass(_this.restAddButton, 'active');
                        dom.removeClass(document.body, 'rest-add');
                        dom.unbind(window, 'keydown', clearRestAddKey);
                        fade.out(_this.restAddButtonTip);
                        _this.restAddButtonActive = false;
                    };

                    dom.bind(this.restAddButton, 'click', function() {

                        // console.log('clicked');

                        _this.restAddButtonActive = !_this.restAddButtonActive;

                        if (_this.restAddButtonActive) {
                            dom.addClass(_this.restAddButton, 'active');
                            dom.addClass(document.body, 'rest-add');
                            fade.into(_this.restAddButtonTip, content);
                            setTimeout(function() {
                                fade.out(_this.restAddButtonTip);
                            }, 7000);
                            dom.bind(window, 'keydown', clearRestAdd);
                        } else {
                            clearRestAdd();
                        }

                    });




                }

                content.appendChild(this.restAddButton);

            }

        }

    );

    TreeDisplayer.StrokeWidth = 5;

    TreeDisplayer.getPadding = function (tree, Fruit) {
        return Fruit.getScale(tree.maxGen, 0) * Layout.fruitPadding;
    };

    var c = document.getElementById('content');
    TreeDisplayer.getRestPosition = function(tree, normalize, width, height) {
        tree.getExtremities();
        width = width || tree.width;
        height = height || tree.height;
        var response = {};
        if (normalize) {
            response.restScale = Math.min(height / tree.treeHeight, width / tree.treeWidth);
        } else {
            response.restScale = 0.15 / Layout.scaleAll * (c.offsetHeight/300);
        }
        response.restY = -(height) / 2 / response.restScale + tree.nodesArr[0].d;
        response.restX = 0;
        response.restRotation = 0;

        return response;
    };

    /**
     * Decorates response from the Tree API with client-side stuff. Made into a
     * static method to accommodate use in both TreeThumbnail and js/tree.js
     * @param resp
     */
    TreeDisplayer.prepareResponse = function(resp) {
        _.extend(resp, {
            data: new TreeData(resp.nodes),
            width: 350,
            height: 350,
            maxNodes: 200,
            thumbnail_url: assets.getSmallVideoURL(resp.nodes[0]),
            user_link: links.getProfileLink(resp.user_name)
        });
    };

    TreeDisplayer.generateFakeResponse = function(count, fertilityFnc) {
        return {
            nodes: TreeData.generateRandom(count, fertilityFnc),
            user_name: 'Dali',
            created_at: 0,
            moderated: false,
            category: 0,
            description: '',
            title: '',
            instructions: '',
            minScale: 0.006,
            fake: true,
            size: count
        }
    };
    
    TreeDisplayer.setViewportShapePosition = function(viewport, viewportShape) {

        if (_.isNaN(viewport.width) || viewport.width == Infinity || viewport.width == -Infinity) return;

        viewportShape.setAttribute('width', viewport.width);
        viewportShape.setAttribute('height', viewport.height);
        viewportShape.setAttribute('x', -viewport.width / 2);
        viewportShape.setAttribute('y', -viewport.height / 2);
        viewportShape.setAttribute('transform',
                                   'translate (' +
                                   viewport.x + ' ' +
                                   viewport.y + ') ' +
                                   'rotate (' +
                                   (viewport.rotation * math.RADIANS_TO_DEGREES) + ')');

    };

    return TreeDisplayer;

});
