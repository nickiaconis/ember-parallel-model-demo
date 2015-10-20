import Ember from 'ember';

export default Ember.Route.extend({
  prefetch() {
    console.log("parent - prefetch entered");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "parent"}); console.log("parent - prefetch resolved"); }, 1000);
    });
  },
  model() {
    console.log("parent - model entered");
    return this._super.apply(this, arguments).then((value) => {
      console.log("parent - model resolved");
      return value;
    });
  }
});
