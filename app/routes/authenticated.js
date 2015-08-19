import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("beforeModel - authenticated"); resolve({whichModel: "authenticated"}); }, 1500);
    });
  },
  model() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("model - authenticated"); resolve({whichModel: "authenticated"}); }, 1500);
    });
  },
  afterModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("afterModel - authenticated"); resolve({whichModel: "authenticated"}); }, 1500);
    });
  }
});
