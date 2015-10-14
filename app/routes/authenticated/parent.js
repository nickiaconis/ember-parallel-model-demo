import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log("parent - model entered");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "parent"}); console.log("parent - model resolved"); }, 1000);
    });
  }
});
