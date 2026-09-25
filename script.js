/* Compatibility entry point. The application now lives in js/main.js and feature modules. */
(function () {
  'use strict';
  if (!window.__engSphereModuleLoaded) {
    window.__engSphereModuleLoaded = true;
    import('./js/main.js').catch(error => console.error('EngSphere failed to start', error));
  }
})();
