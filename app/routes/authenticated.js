import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log("authenticated - model entered");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "authenticated"}); console.log("authenticated - model resolved"); }, 2000);
    });
  }
});
