requirejs.config({
  nodeIdCompat: true,
  paths: {
    app: 'app',
    spec: 'spec',
    templates: '../templates',

    backbone: 'lib/backbone',
    bootstrap: 'lib/bootstrap',
    hogan: 'lib/hogan-3.0.2.amd',
    jquery: 'lib/jquery-1.11.2',
    moment: 'lib/moment',
    underscore: 'lib/underscore'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
    },
  }
});

require(['app/app']);
