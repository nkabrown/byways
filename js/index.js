'use strict';
import { naiveClearRenderedDom, naiveRenderIntoDom } from './helpers.js';

const routerCore = window["@uirouter/core"];
const router = new routerCore.UIRouter();

router.plugin(routerCore.pushStateLocationPlugin);
router.plugin(routerCore.servicesPlugin);

router.transitionService.onSuccess({}, (trans, state) => {
  trans.exiting().forEach(stateDef => naiveClearRenderedDom(stateDef));
  trans.entering().forEach(stateDef => naiveRenderIntoDom(stateDef));
});

console.log(router);

// register two test states
router.stateRegistry.register({name: 'landing', url: '/', html: `<h1>Landing Page</h1><button id="app">Forward</button>`});
router.stateRegistry.register({name: 'app', url: '/app', html: `<h1>Core Page</h1><button id="landing">Back</button>`});

// enable console logging of transitions
// 0 = resolves, 1 = transitions, 2 = hooks, 3 = ui views, 4 = viewconfig
router.trace.enable(1);
router.urlService.rules.initial({state: 'landing'});
router.urlService.listen();
router.urlService.sync();

// set event delegation on the '#root' element for testing
document.getElementById('root').addEventListener('click', event => {
  if (event.target.matches('#landing')) {
    router.stateService.go('landing');
  }

  if (event.target.matches('#app')) {
    router.stateService.go('app'); 
  }
});
