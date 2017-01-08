import {startCircleShadow} from './index/shadow';
import {startCanvasStage} from './index/canvas';
import {startRightNavCtrl} from './index/nav';

function init() {
  startCircleShadow();
  startRightNavCtrl();
  startCanvasStage();
};

init();
