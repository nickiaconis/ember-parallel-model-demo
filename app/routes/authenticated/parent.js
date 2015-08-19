import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("beforeModel - parent"); resolve({whichModel: "parent"}); }, 1500);
    });
  },
  model() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("model - parent"); resolve({whichModel: "parent"}); }, 1500);
    });
  },
  afterModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("afterModel - parent"); resolve({whichModel: "parent"}); }, 1500);
    });
  }
});
