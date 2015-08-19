import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

// Reroute logs to the DOM
const console$log = console.log;
const logOutput = document.createElement('div');
let prevTimeStringLength = 0;
logOutput.classList.add('log-output');
document.querySelector('body').appendChild(logOutput);
console.log = function(...args) {
  const time = window.performance.now().toFixed(3);
  const timeStringLengthDiff = time.length - prevTimeStringLength;
  if (timeStringLengthDiff > 0) {
    const zeros = new Array(timeStringLengthDiff + 1).join('0');
    Array.prototype.slice.call(logOutput.childNodes).forEach((node) => {
      node.firstChild.data = node.firstChild.data.replace(/^\[/, `[${zeros}`);
    });
    prevTimeStringLength = time.length;
  }
  const text = document.createTextNode(`[${time}] ${args[0]}`);
  const logItem = document.createElement('div');
  logItem.classList.add('log-item');
  logItem.appendChild(text);
  logOutput.appendChild(logItem);
  console$log.apply(console, args);
};

export default App;
