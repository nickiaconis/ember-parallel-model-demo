import Ember from 'ember';

export default Ember.Route.extend({
  prefetch() {
    console.log("child - prefetch entered");
    this.modelFor('authenticated'); // => undefined
    this.prefetched('authenticated'); // => Promise
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "child"}); console.log("child - prefetch resolved"); }, 3000);
    });
  },
  model() {
    console.log("child - model entered");
    this.modelFor('authenticated'); // => Object
    this.prefetched('authenticated'); // => Promise
    return this._super.apply(this, arguments).then((value) => {
      console.log("child - model resolved");
      return value;
    });
  }
});
