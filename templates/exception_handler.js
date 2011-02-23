//function someserialize(obj, prefix) {
//var str = [];
//for(var p in obj) {
//var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
//str.push(typeof v == "object" ? 
//someserialize(v, k) :
//encodeURIComponent(k) + "=" + encodeURIComponent(v));
//}
//return str.join("&");
//}


WaterBug.Exception = WaterBug.Class({
  initialize: function(message, url, line) {
    this.message = message;
    this.url     = url;
    this.line    = line;
  },

  exception: true,

  report: function() {
    WaterBug.console.log(this);
    //var xhr; 
    //try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    //catch (e) 
    //{
    //    try {   xhr = new ActiveXObject('Microsoft.XMLHTTP');    }
    //    catch (e2) 
    //    {
    //      try {  xhr = new XMLHttpRequest();     }
    //      catch (e3) {  xhr = false;   }
    //    }
    //}
    //
    //if (xhr) {
    //  xhr.open('post', "/javascript_exceptions",  true); 
    //  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //  xhr.send(this.serialize()); 
    //}
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
    window.onerror = this.on_error;
  },

  on_error: function(message, url, line) {
    var exception = WaterBug.Exception(message, url, line);
    exception.report();
    return true;
  }

};

WaterBug.ExceptionHandler.load();
