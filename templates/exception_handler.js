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


Exception = Class({
  initialize: function(message, url, line) {
    this.message = message;
    this.url     = url;
    this.line    = line;
  },

  exception: true,

  report: function() {
    Exception.all.push(this);
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
    for(var index in Exception.navigator_fields)
      var field_name = Exception.navigator_fields[index];
    return 'exception[message]='+escape(this.message)
  },

  log: function(){
    console.log(this.to_s());
  },

  alert: function(){
    alert(this.to_s());
  },

  to_s: function() {
    return 'Exception: '+this.message+'\n\ncaught in: '+this.url+'\nline: '+this.line;
  },

  debug_info: function() {
    result = {};
    for(var index in Exception.navigator_fields) {
      var field_name = Exception.navigator_fields[index];
      result[field_name] = navigator[field_name];
    }
    return result;
  }

},{

  navigator_fields: 'appCodeName appName appVersion cookieEnabled platform userAgent'.split(' '),

  all: []

});

ExceptionHandler = {

  load: function() {
    window.onerror = this.on_error;
  },

  on_error: function(message, url, line) {
    var exception = new Exception(message, url, line);
    exception.report();
    return true;
  }

};

ExceptionHandler.load();