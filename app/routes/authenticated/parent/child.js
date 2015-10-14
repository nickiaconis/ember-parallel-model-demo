import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log("child - model entered");
    this.modelFor('authenticated'); // => Object
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "child"}); console.log("child - model resolved"); }, 3000);
    });
  }
});
