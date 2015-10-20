"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('ember-parallel-model-demo/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-parallel-model-demo/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  // Reroute logs to the DOM
  var console$log = console.log;
  var logOutput = document.createElement('div');
  var prevTimeStringLength = 0;
  logOutput.classList.add('log-output');
  document.querySelector('body').appendChild(logOutput);
  console.log = function () {
    var time = window.performance.now().toFixed(3);
    var timeStringLengthDiff = time.length - prevTimeStringLength;
    if (timeStringLengthDiff > 0) {
      (function () {
        var zeros = new Array(timeStringLengthDiff + 1).join('0');
        Array.prototype.slice.call(logOutput.childNodes).forEach(function (node) {
          node.firstChild.data = node.firstChild.data.replace(/^\[/, '[' + zeros);
        });
        prevTimeStringLength = time.length;
      })();
    }

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var text = document.createTextNode('[' + time + '] ' + args[0]);
    var logItem = document.createElement('div');
    logItem.classList.add('log-item');
    logItem.appendChild(text);
    logOutput.appendChild(logItem);
    console$log.apply(console, args);
  };

  exports['default'] = App;

});
define('ember-parallel-model-demo/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-parallel-model-demo/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('ember-parallel-model-demo/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-parallel-model-demo/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-parallel-model-demo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-parallel-model-demo/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('ember-parallel-model-demo/initializers/export-application-global', ['exports', 'ember', 'ember-parallel-model-demo/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-parallel-model-demo/router', ['exports', 'ember', 'ember-parallel-model-demo/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('authenticated', { path: '/' }, function () {
      this.route('parent', { path: '/' }, function () {
        this.route('child', { path: '/' });
      });
    });
  });

  exports['default'] = Router;

});
define('ember-parallel-model-demo/routes/authenticated/loading', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('ember-parallel-model-demo/routes/authenticated/parent/child', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      console.log("child - model entered");
      this.modelFor('authenticated'); // => Object
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({ whichModel: "child" });console.log("child - model resolved");
        }, 3000);
      });
    }
  });

});
define('ember-parallel-model-demo/routes/authenticated/parent/loading', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('ember-parallel-model-demo/routes/authenticated/parent', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      console.log("parent - model entered");
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({ whichModel: "parent" });console.log("parent - model resolved");
        }, 1000);
      });
    }
  });

});
define('ember-parallel-model-demo/routes/authenticated', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      console.log("authenticated - model entered");
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({ whichModel: "authenticated" });console.log("authenticated - model resolved");
        }, 2000);
      });
    }
  });

});
define('ember-parallel-model-demo/routes/loading', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('ember-parallel-model-demo/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Welcome to Sequential Ember");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/authenticated/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/authenticated/loading.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Authenticated loading route.\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","loader green");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/authenticated/parent/child', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/authenticated/parent/child.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Child Route");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" loaded\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.whichModel",["loc",[null,[2,0],[2,20]]]],
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/authenticated/parent/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/authenticated/parent/loading.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Parent loading route.\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","loader blue");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/authenticated/parent', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/authenticated/parent.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Parent Route");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" loaded\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.whichModel",["loc",[null,[2,0],[2,20]]]],
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/authenticated', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/authenticated.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Authenticated Route");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" loaded\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.whichModel",["loc",[null,[2,0],[2,20]]]],
        ["content","outlet",["loc",[null,[3,0],[3,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/templates/loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.7",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "ember-parallel-model-demo/templates/loading.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Application loading route.\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","loader red");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('ember-parallel-model-demo/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-parallel-model-demo/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-parallel-model-demo/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/helpers/start-app', ['exports', 'ember', 'ember-parallel-model-demo/app', 'ember-parallel-model-demo/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-parallel-model-demo/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/routes/authenticated/loading.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/authenticated');
  QUnit.test('routes/authenticated/loading.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/authenticated/loading.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/routes/authenticated/parent/child.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/authenticated/parent');
  QUnit.test('routes/authenticated/parent/child.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/authenticated/parent/child.js should pass jshint.\nroutes/authenticated/parent/child.js: line 7, col 53, \'reject\' is defined but never used.\n\n1 error'); 
  });

});
define('ember-parallel-model-demo/tests/routes/authenticated/parent/loading.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/authenticated/parent');
  QUnit.test('routes/authenticated/parent/loading.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/authenticated/parent/loading.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/routes/authenticated/parent.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/authenticated');
  QUnit.test('routes/authenticated/parent.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/authenticated/parent.js should pass jshint.\nroutes/authenticated/parent.js: line 6, col 53, \'reject\' is defined but never used.\n\n1 error'); 
  });

});
define('ember-parallel-model-demo/tests/routes/authenticated.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/authenticated.js should pass jshint', function(assert) { 
    assert.ok(false, 'routes/authenticated.js should pass jshint.\nroutes/authenticated.js: line 6, col 53, \'reject\' is defined but never used.\n\n1 error'); 
  });

});
define('ember-parallel-model-demo/tests/routes/loading.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/loading.js should pass jshint', function(assert) { 
    assert.ok(true, 'routes/loading.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/test-helper', ['ember-parallel-model-demo/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-parallel-model-demo/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/initializers/prefetch-patch-test', ['ember', 'ember-parallel-model-demo/initializers/prefetch-patch', 'qunit'], function (Ember, prefetch_patch, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | prefetch patch', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    prefetch_patch.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
define('ember-parallel-model-demo/tests/unit/initializers/prefetch-patch-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/prefetch-patch-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/initializers/prefetch-patch-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:authenticated/loading', 'Unit | Route | authenticated/loading', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/loading-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/authenticated');
  QUnit.test('unit/routes/authenticated/loading-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/authenticated/loading-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent/child-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:authenticated/parent/child', 'Unit | Route | authenticated/parent/child', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent/child-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/authenticated/parent');
  QUnit.test('unit/routes/authenticated/parent/child-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/authenticated/parent/child-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent/loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:authenticated/parent/loading', 'Unit | Route | authenticated/parent/loading', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent/loading-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/authenticated/parent');
  QUnit.test('unit/routes/authenticated/parent/loading-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/authenticated/parent/loading-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:authenticated/parent', 'Unit | Route | authenticated/parent', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated/parent-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/authenticated');
  QUnit.test('unit/routes/authenticated/parent-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/authenticated/parent-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:authenticated', 'Unit | Route | authenticated', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/authenticated-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/authenticated-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/authenticated-test.js should pass jshint.'); 
  });

});
define('ember-parallel-model-demo/tests/unit/routes/loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:loading', 'Unit | Route | loading', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('ember-parallel-model-demo/tests/unit/routes/loading-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/loading-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/routes/loading-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-parallel-model-demo/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-parallel-model-demo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-parallel-model-demo/tests/test-helper");
} else {
  require("ember-parallel-model-demo/app")["default"].create({"name":"ember-parallel-model-demo","version":"0.0.0+6dfee13f"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-parallel-model-demo.map