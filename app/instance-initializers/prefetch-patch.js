import Ember from 'ember';

export function initialize(instance) {
  const lookup = instance.lookup && instance.lookup.bind(instance) || instance.container.lookup && instance.container.lookup.bind(instance.container);
  const router = lookup('router:main');

  router.on('willTransition', function(transition) {
    const pivotHandler = transition.pivotHandler;

    // If there is no pivot, we should try to prefetch all handlers.
    let hasSeenPivot = pivotHandler == null ? true : false;

    transition.handlerInfos.forEach(function(handlerInfo) {
      // Don't prefetch handlers above the pivot.
      if (!hasSeenPivot) {
        // The pivot is the first common ancestor, so it is skipped as well.
        if (handlerInfo.handler === pivotHandler) {
          hasSeenPivot = true;
        }

        return;
      }

      // Skip handlers that have been provided a model.
      if (handlerInfo.context != null) {
        return;
      }

      // Build fullParams as in unresolved-handler-info-by-param#getModel.
      let fullParams = handlerInfo.params || {};
      if (transition && transition.queryParams) {
        fullParams = Ember.copy(fullParams);
        fullParams.queryParams = transition.queryParams;
      }

      // Run the prefetch hook if the route has one.
      const promise = handlerInfo.runSharedModelHook(transition, 'prefetch', [fullParams]);

      // runSharedModelHook always returns a promise. We check to make
      // sure the promise is still pending or has resolved with something
      // other than undefined before stashing it on the route.
      if (!promise._state || typeof promise._result !== 'undefined') {
        handlerInfo.handler.asyncData = promise;
      }
    });
  });
}

export default {
  name: 'prefetch-patch',
  initialize: initialize
};
