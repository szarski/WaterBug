WaterBug.Exception = WaterBug.Class({
  initialize: function(message, url, line) {
    this.message = message;
    this.url     = url;
    this.line    = line;
  },

  exception: true,

  report: function() {
    WaterBug.console.log(this);
  },

  to_json: function() {
    return ({message: this.message, url: this.url, line: this.line, browser_info: this.debug_info()});
  },

  serialize: function() {
    return someserialize(this.to_json(),'exception');
  },

  url_encoded: function() {
    for(var index in WaterBug.Exception.navigator_fields)
      var field_name = WaterBug.Exception.navigator_fields[index];
    return 'exception[message]='+escape(this.message)
  },

  to_s: function() {
    return 'WaterBug.Exception: '+this.message+'\n\ncaught in: '+this.url+'\nline: '+this.line;
  },

  short_broken_with: function(separator) {
    var result = this.message;
    if (this.line)
      result += separator + this.url + ':' + this.line;    
    return result;
  },

  debug_info: function() {
    result = {};
    for(var index in WaterBug.Exception.navigator_fields) {
      var field_name = WaterBug.Exception.navigator_fields[index];
      result[field_name] = navigator[field_name];
    }
    return result;
  }

},{

  navigator_fields: 'appCodeName appName appVersion cookieEnabled platform userAgent'.split(' ')

});

WaterBug.ExceptionHandler = {

  load: function() {
    this.old_onerror = window.onerror;
    window.onerror = this.on_error;
  },

  unload: function() {
    window.onerror = this.old_onerror;
  },

  on_error: function(message, url, line) {
    var exception = WaterBug.Exception(message, url, line);
    exception.report();
    return true;
  }

};

WaterBug.ExceptionHandler.load();
