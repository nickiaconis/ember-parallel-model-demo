import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('authenticated', { path: '/' }, function() {
    this.route('parent', { path: '/' }, function() {
      this.route('child', { path: '/' });
    });
  });
});

export default Router;
