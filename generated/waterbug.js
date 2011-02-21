// ::.      ::-      ::-                                       `::::::::-`                            
// hMh     +MMN`    -MM:             /do                       :MMyyyyyhNMy`                          
// -MM-   `NNyMo    hMh   `-:::.    .oMh.`    .::-`     .. `-: :MN      `mMo  `..     `.`     .:-` `` 
//  yMy   sMo`NN.  .MM- `yMdssyNN+  ymMNh/ `oNmyyhNd/   mMsNmd :MN     `:NN-  -MN     yM/  `yNmyymdmM.
//  .MM. -Mm` +My  yMy  :y+    -MN   +My   dMo    `mM/  mMh`   :MMNNNNNMMN+`  -MN     yM/  mM+    :MM.
//   sMy hM/   dM-.MN.   :syhddmMN   +My  -MMhhhhhhmMy  mM-    :MN      .sMm. -MN     yM/ :Mm      dM.
//   .NM+Md    :MdsMs   dMy:.` .MN   +My  -MM-`````-:.  mM-    :MN       `MM: -MN     dM/ -MN`    `mM.
//    oMMM-     hMMN`   NM+` `:dMN`  +Md.` sMd-  `+Nm.  mM-    :MN::::::+mMy  .MM/``-yMM/  yMh-``:dMM.
//    `hho      .hh+    .sdmmds-sdd- `ydd+  -sdmmmh+`   yh.    -hhhhhhhhy+-    -ydmmh++h:   :shdhy/mM.
//                                                                                         os-    :Mm 
//                                                                                         -hNdhhmNy. 
//                                                                                            ...`    
//
//
//                                                                                               ``   
//                                                                                           ````     
//                                                                                      `````         
//                                                                                  ````              
//                                                                                ``                  
//                                                                              ``                    
//                             `.                                              .                      
//                               .`                                 ..        ``                      
// ``                             `..`                              -         .                       
//  -.                               `.-:-...                     `-`         `.                      
//    `..`             ``..------.      ``...---:.              ./.            .                      
//       .....-/:-:/::/::-...``-//+:`          :::            ./-              .                      
//            ```.`             .////----:::/::/::-...`` `..:/-`              ``                      
//               `..`    `..-/+oooosssssyssss++oooo+/++//o+/:.            ````                        
//                 `-:---+oosssyyyyhhhhhyyo/+sysso/:/oo:o/../o/.      `````                           
//                 `-//+oosyhhhhhhhhhhhhy++yhyhhyyyyyss/::/sysoo+-/..`                                
//                 //o+syyyhhhhhhhhhhhys+yhhhhhhhhhyys++::/o+o+os+::                                  
//                 :+++syyyhhhhhhhdhhyyshhhhhyyyyysssooo//+ooososo/:                                  
//                 -/:++osssyyhhhhhyyyossyyyyyhyyyyyyo//++/oosss+:/-.``                               
//                `-/:-:/+oosssyyyyyssoo++osssyyysso+:-+/+/+o//-      ``````                          
//               --`     `..:+osssssssssssooooo+///++///--:::/-            ````                       
//               ``.``          `.-+++/:-----:-://-.```      .-/-              .                      
//             `-:/+/+/+::-...`   -/++-        `/+:             -/-            .                      
//         `.-.`      ` .`----//::++:`      ` .-:/.              `--           .                      
//        :.                              .:/+--.                  `-`         .                      
//      .:`                             :/:-`                        -.        .                      
//      `                             `-.                                      .`                     
//                                   `/`                                        .`                    
//                                   /                                            .`                  
//                                  -.                                              ````              
//                                                                                      ``````        
//                                                                                            `````   
//                                                                                                 `  
//
// Copyright (c) 2010 Jacek Szarski
// jacek@applicake.com
// Released under the GPL license.
// You can use the code for any purpose you want as long as you keep this note.

Class = function(instance_methods, class_methods){
  var klass = function(){
    var prototype = {};
    for (key in klass.prototype) {
      prototype[key] = klass.prototype[key];
    }
    prototype.initialize.apply(prototype, arguments);
    klass.all.push(prototype);
    var id = klass.all.length;
    prototype.id = function(){return id};
    return prototype;
  }

  klass.prototype = instance_methods;
  for (key in class_methods) {
    klass[key] = class_methods[key];
  }

  klass.all = [];
  return klass;
}

function escapeHTML(string) {
 return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
};

Console = Class({

  initialize: function(input_element, output_element) {
    this.command_history = [];
    this.command_history_index = 0;
    this.input_element = input_element;
    this.output_element = output_element;
    var that = this;
    this.input_element.onkeyup = function(e){
      var key;
      if(window.event) // IE
        key = ({38: 'up', 40: 'down', 13: 'enter'})[event.keyCode];
      else // FF and ?
        key = ({38: 'up', 40: 'down', 13: 'enter'})[e.keyCode];
      return that.keypress(key);
    };
  },

  log: function(object) {
    if (object.exception)
      this.output_element.innerHTML += this.format_output('', object.message + ' (' + object.url + ':' +object.line + ')', 1);
    else
      this.output_element.innerHTML += this.format_output('', object, '');
  },

  run: function(command) {
    var result;
    var exception = 0;
    this.command_history.push(command);
    this.reset_command_history_index();
    try {
      result = eval(command);
    } catch(e) {
      result = e.message;
      exception = e.message;
    }
    this.output_element.innerHTML += this.format_output(command, result, exception);
    this.input_element.value = '';
  },

  format_output: function(command, result, exception){
    if (exception)
      return "\n(" + this.command_history.length + ") <span class=\"exception\">" + this.inspect(result) + "</span><br />";
    else
      return "\n(" + this.command_history.length + ") " + this.inspect(result) + "<br />";
  },

  inspect: function(string) {
    return escapeHTML(string).replace(/\n/,'<br />');
  },

  previous_command: function(){
    this.load_command_from_history(-1);
  },

  next_command: function(){
    this.load_command_from_history(+1);
  },

  load_command_from_history: function(shift) {
    this.command_history_index += shift;
    if (this.command_history_index < 0)
      this.command_history_index = 0;
    if (this.command_history_index > this.command_history.length)
      this.reset_command_history_index();
    this.input_element.value = this.command_history[this.command_history_index] || '';
  },

  reset_command_history_index: function() {
    this.command_history_index = this.command_history.length;
  },

  keypress: function(key) {
    if (key=='enter') {
      this.run(this.input_element.value);
      return false
    } else if (key=='up') {
      this.previous_command();
      return false
    } else if (key=='down') {
      this.next_command();
      return false
    } else
      return true;
  }

},{
});

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

  navigator_fields: 'appCodeName appName appVersion cookieEnabled platform userAgent'.split(' ')

});

ExceptionHandler = {

  load: function() {
    window.onerror = this.on_error;
  },

  on_error: function(message, url, line) {
    var exception = Exception(message, url, line);
    exception.report();
    return true;
  }

};

ExceptionHandler.load();

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



WaterBug = {
  html_string: ("<style type=\"text/css\">\n  #waterbug_spacer {\n  margin: 0px;\n  padding: 0px;\n  height: 250px;\n  width: 100%;\n  border-top: 3px dotted #F00;\n}\n\ndiv.main_wrapper {\n  position: fixed;\n  width: 100%;\n  background-color: #FFF;\n  border-top: 2px solid #000;\n  padding: 0px;\n  margin: 0px;\n  bottom: 0px;\n  z-index: 50000;\n}\n\nspan.exception {\n  color: #F00;\n}\n\n#console_display {\n  width: 600px;\n  border: 1px solid #000;\n  height: 200px;\n  margin: 5px;\n  overflow: scroll;\n}\n\n#console_input {\n  width: 600px;\n  border: 1px solid #000;\n  margin: 5px;\n}\n\n<\/style>\n<div class=\"main_wrapper\" id=\"main_wrapper\">\n  <div id=\"console_display\"><\/div>\n  <input id=\"console_input\" type=\"text\" />\n<\/div>\n<div id=\"waterbug_spacer\"><!-- zZz --><\/div>\n"),
  console: FakeConsole(),

  insert_body: function() {
    var container = document.createElement('div');
    container.innerHTML = this.html_string;
    var last_element = document.body.children[document.body.children.length - 1];
    var children=[];
    for (var index=0; index < container.childElementCount; index+=1)
      children.push(container.children[index]);
    while (children.length > 0) {
      var child = children.shift();
      console.log('pop:');
      console.log(child);
      document.body.insertBefore(child, last_element);
    }
  },

  load: function() {
    this.insert_body();
    var fake_console = this.console;
    this.console = Console(document.getElementById('console_input'), document.getElementById('console_display'));
    fake_console.call(this.console);
  }
}

setTimeout('WaterBug.load();', 1000); // this is a mockup od document.ready :)
