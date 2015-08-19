import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("beforeModel - child"); resolve({whichModel: "child"}); }, 1500);
    });
  },
  model() {
    var that = this;
    this.modelFor('authenticated');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log("model - child");
        resolve({whichModel: "child"});
        setTimeout(function() {
          that.modelFor('authenticated');
        }, 2000);
      }, 1500);
    });
  },
  afterModel() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { console.log("afterModel - child"); resolve({whichModel: "child"}); }, 2500);
    });
  }
});
