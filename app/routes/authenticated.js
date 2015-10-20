import Ember from 'ember';

export default Ember.Route.extend({
  prefetch() {
    console.log("authenticated - prefetch entered");
    return new Ember.RSVP.Promise(function(resolve, reject) {
      setTimeout(function() { resolve({whichModel: "authenticated"}); console.log("authenticated - prefetch resolved"); }, 2000);
    });
  },
  model() {
    console.log("authenticated - model entered");
    return this._super.apply(this, arguments).then((value) => {
      console.log("authenticated - model resolved");
      return value;
    });
  }
});
