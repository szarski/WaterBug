FakeConsole=Class({

  initialize: function() {
    this.calls = [];
  },
    
  log: function() {
    this.calls.push(arguments);
  },

  call: function(object) {
    for (var index in this.calls) {
      args = this.calls[index];
      object.log.apply(object, args);
    }
  }

},{});
