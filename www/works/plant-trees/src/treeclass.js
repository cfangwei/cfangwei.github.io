(function(f) {
    var g = Math.PI
      , d = 60
      , b = g / 180
      , a = {};
    function h(k, j, m, l, i, o, n) {
        this._color = i;
        this._isDay = n;
        this._changeColor = 90;
        this._brances = [];
        this._brances.push(new c(k,j,m,l,CMUtiles.randomFloat(3, 6),o,1))
    }
    h.prototype = {
        _brances: null ,
        _complete: false,
        complete: function() {
            return this._complete
        },
        draw: function(s) {
            var r = this._brances, o = r.length, l, p, m, j;
            if (!o) {
                this._complete = true;
                return
            }
            for (l = 0; l < o; l++) {
                p = r[l];
                p.update();
                if (p.complete()) {
                    r.splice(l, 1);
                    l--;
                    j = p.generation() < 3 ? CMUtiles.randomInteger(3, 4) : CMUtiles.randomInteger(2, 4);
                    m = p.createNext(j);
                    if (m) {
                        r = this._brances = r.concat(m)
                    }
                    o = r.length
                }
            }
            if (this._isDay == 1) {
                s.strokeStyle = "hsl(0,100%,0%)"
            } else {
                s.strokeStyle = "hsl(" + this._color + ",100%," + this._changeColor + "%)";
                if (this._changeColor > 50) {
                    this._changeColor = this._changeColor - 0.4
                }
            }
            var k, u, t;
            for (var q in a) {
                k = a[q];
                t = k.lines;
                s.beginPath();
                s.lineWidth = k.lineWidth;
                for (l = 0,
                o = t.length; l < o; l++) {
                    u = t[l];
                    s.moveTo(u[0][0], u[0][1]);
                    s.lineTo(u[1][0], u[1][1])
                }
                s.stroke();
                delete a[q]
            }
        }
    };
    function c(k, j, l, p, n, o, m) {
        this._start = new e(k,j);
        this._length = l || 1;
        this._angle = p || -90;
        this._speed = n || 3;
        this._depth = o || 1;
        this._generation = m;
        this._speed *= 60 / d;
        var i = this._angle * b;
        this._end = new e(this._start.x + this._length * Math.cos(i),
                          this._start.y + this._length * Math.sin(i));
        this._v = this._end.subtract(this._start);
        this._v.normalize(this._speed);
        this._current = this._start.add(this._v);
        this._latest = this._start.clone();
        this._currentLength = this._speed
    }
    c.prototype = {
        _complete: false,
        _angleOffsetRange: 90,
        generation: function() {
            return this._generation
        },
        complete: function() {
            return this._complete
        },
        interpolate: function(i) {
            return e.interpolate(this._end, this._start, i)
        },
        createNext: function(v) {
            var o = Math.max(this._depth - 1, 0);
            if (!o) {
                return null 
            }
            var y = [], w = this._angleOffsetRange, k = w / v, u, r, z;
            for (u = 0; u < v; u++) {
                r = k * u - w / 2;
                z = r + k;
                y[u] = (CMUtiles.randomFloat(r, z)) | 0
            }
            y.sort(function(l, i) {
                return (l > 0 ? l : -l) - (i > 0 ? i : -i)
            });
            var C = [], q = this._generation + 1, B = 0.55 / v, x, A, D, m, j;
            for (u = 0; u < v; u++) {
                x = u === 0 ? 0 : CMUtiles.randomFloat(B * u, B * (u + 1));
                j = this.interpolate(x);
                A = this._angle + y[u];
                D = 0.3 * Math.abs(Math.cos((A + 90) * b));
                m = this._length * CMUtiles.randomFloat(0.25 + D, 0.65 + D);
                C[u] = new c(j.x,j.y,m,A,CMUtiles.randomFloat(3, 5),o,q)
            }
            return C
        },
        update: function() {
            var j = this._complete;
            if (j) {
                return
            }
            var m = this._current
              , k = this._latest;
            if (this._length <= this._currentLength) {
                m = this._end;
                j = this._complete = true
            }
            var i = this._depth * this._depth * 0.2
              , l = "CM" + i
              , n = a[l];
            if (!n) {
                n = a[l] = {
                    lineWidth: i,
                    lines: []
                }
            }
            n.lines.push([[k.x, k.y], [m.x, m.y]]);
            if (j) {
                return
            }
            k.set(m);
            m.offset(this._v);
            this._currentLength += this._speed
        }
    };
    function e(i, j) {
        this.x = i || 0;
        this.y = j || 0
    }
    e.create = function(i, j) {
        if (CMUtiles.isObject(i)) {
            return new e(i.x,i.y)
        }
        return new e(i,j)
    }
    ;
    e.add = function(j, i) {
        return new e(j.x + i.x,j.y + i.y)
    }
    ;
    e.subtract = function(j, i) {
        return new e(j.x - i.x,j.y - i.y)
    }
    ;
    e.interpolate = function(m, l, k) {
        var j = l.x - m.x
          , i = l.y - m.y;
        return new e(m.x + j * k,m.y + i * k)
    }
    ;
    e.prototype = {
        add: function(i) {
            return e.add(this, i)
        },
        subtract: function(i) {
            return e.subtract(this, i)
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        set: function(i, j) {
            if (CMUtiles.isObject(i)) {
                j = i.y;
                i = i.x
            }
            this.x = i || 0;
            this.y = j || 0;
            return this
        },
        offset: function(i, j) {
            if (CMUtiles.isObject(i)) {
                j = i.y;
                i = i.x
            }
            this.x += i || 0;
            this.y += j || 0;
            return this
        },
        normalize: function(i) {
            if ((i === null ) || (i === "undefined")) {
                i = 1
            }
            var j = this.length();
            if (j > 0) {
                this.x = this.x / j * i;
                this.y = this.y / j * i
            }
            return this
        },
        clone: function() {
            return e.create(this)
        }
    };
    f.TreeClass = h
})(window);
