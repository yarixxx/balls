function EventDispatcher() {
  var events = {};
  
  function getEventHandlers(event) {
    return events[event];
  }

  var publicMethods = {
    removeEventListener: function(event, callback) {
      for (var i = 0; i < events[event].length; i++) {
        if (events[event][i] === callback) {
          events[event].splice(i,1);
        }
      }
    },
    addEventListener: function(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },
    triggerEvent: function (event) {
      var handlers = getEventHandlers(event);
      if (handlers) {
        for (var key in handlers) {
          var callback = handlers[key];
          callback();
        };
      }
    }
  };
  return publicMethods;
}
