WaterBug = {};

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

WaterBug.Class = function(instance_methods, class_methods){
  var klass = function(){
    var prototype = {};
    for (key in klass.prototype) {
      prototype[key] = klass.prototype[key];
    }
    prototype.initialize.apply(prototype, arguments);
    klass.all.push(prototype);
    var id = klass.all.length;
    prototype.id = id;
    prototype.class = klass;
    return prototype;
  }

  klass.prototype = instance_methods;
  for (key in class_methods) {
    klass[key] = class_methods[key];
  }

  klass.all = [];
  return klass;
}

WaterBug.Console = WaterBug.Class({

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

  run: function(command) {
    var result;
    var exception = 0;
    this.command_history.push(command);
    this.reset_command_history_index();
    try {
      result = eval(command);
    } catch(e) {
      result = WaterBug.Exception(e.message);
    }
    this.log(result, command);
    this.input_element.value = '';
  },

  log: function(object, command) {
    var command_output = command ? '<div class="WaterBug_command">'+WaterBug.Console.escapeHTML('' + command)+'</div>' : '';

    var output = '\n<div class="WaterBug_line"><div class="WaterBug_line_number">' + this.command_history.length + '</div><div class="WaterBug_content">' + command_output + this.inspect(object) + '</div><div style="clear:both;"></div></div>';

    this.output_element.innerHTML += output;
    this.output_element.scrollTop = this.output_element.scrollHeight;
  },

  inspect: function(obj, level) {
    if (!level)
      level = 0;
    var representation;
    var type;
    if (obj && (obj.class) && (obj.class == WaterBug.Exception)) {
      representation = "<span class=\"WaterBug_exception\">" + obj.short_broken_with('<br />') + "</span>";
      type = "!";
    } else {
      type = typeof(obj);
      switch (typeof obj) {
        case 'string': 
          representation = '"' + WaterBug.Console.escapeHTML(obj).replace(/\n/,'<br />') + '"';
          break;
        case 'number': 
          representation = '' + obj;
          break;
        case 'boolean': 
          representation = (obj ? 'true' : 'false');
          break;
        case 'undefined':
          representation = 'undefined';
          break;
        case 'object':
          if (level < 3) {
            var values = [];
            for (var property in obj)
              values.push(property+': '+this.inspect(obj[property], level+1));
            representation =  '{' + values.join(", ") + '}';
          } else {
            representation =  "<span class=\"WaterBug_too_deep\">(too deep...)</span>";
          }
          break;
        default:
          representation = WaterBug.Console.escapeHTML('' + obj);
          break;
      }
    }
    if (level == 0)
      return '<span class="WaterBug_object_type">'+ type +'</span>' + representation;
    else
      return representation;
  },

  object_to_string: function(obj) {
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

  escapeHTML: function(string) {
    return (''+string).replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

});

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

WaterBug.FakeConsole=WaterBug.Class({

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

WaterBug.Button = WaterBug.Class({

  initialize: function(element, click_event) {
    this.element = element;
    this.click_event = click_event || function(){};
    var that = this;
    this.element.onclick = function(){ that.click_event.apply(that, arguments); };
  }

},{});


WaterBug.console = WaterBug.FakeConsole();

WaterBug.Runner = {
  minimized: 0,

  html_string: ("<div id=\"WaterBug_style_wrapper\">\n  <br />\n  <!-- both this DIV and this BR are necesary here for IE7 to dynamicaly load css style element. -->\n  <style type=\"text/css\">\n    #WaterBug_spacer {\n  margin: 0px;\n  padding: 0px;\n  height: 250px;\n  width: 100%;\n  border-top: 3px dotted #F00;\n}\n\ndiv.WaterBug_main_wrapper {\n  position: fixed;\n  width: 100%;\n  background-color: #DEDEDE;\n  border-top: 1px solid #000;\n  padding: 0px;\n  margin: 0px;\n  bottom: 0px;\n  left: 0px;\n  z-index: 50000;\n}\n\n#WaterBug_console_display {\n  width: 600px;\n  border: 1px solid #000;\n  height: 200px;\n  margin: 3px;\n  overflow: scroll;\n  font-size: 14px;\n  background-color: #FFF;\n}\n\n#WaterBug_console_input {\n  width: 600px;\n  border: 1px solid #000;\n  margin: 0px 3px 3px;\n}\n\n\n#WaterBug_console_display span.WaterBug_exception {\n  color: #F00;\n}\n\n#WaterBug_console_display span.WaterBug_object_type {\n  background-color: #000000;\n  color: #FFFFFF;\n  font-size: 12px;\n  margin-right: 5px;\n  padding: 2px 5px 1px;\n}\n\n#WaterBug_console_display span.WaterBug_too_deep {\n  font-style: italic;\n  font-size: 12px;\n}\n\n#WaterBug_console_display div {\n  margin: 0px;\n  padding: 0px;\n}\n\n#WaterBug_console_display .WaterBug_line {\n  min-height: 18px;\n  border-bottom: 1px dotted #DDDDDD;\n}\n\n#WaterBug_console_display .WaterBug_line_number {\n  border: 0px;\n  background-color: #AAAAAA;\n  float: left;\n  height: 16px;\n  padding: 3px 5px 0 0;\n  text-align: right;\n  width: 50px;\n  color: #444;\n}\n\n#WaterBug_console_display .WaterBug_content {\n  border: 0px;\n  float: left;\n  min-height: 17px;\n  overflow: hidden;\n  width: 522px;\n  padding: 2px 0 0 5px;\n}\n\n#WaterBug_console_display .WaterBug_command {\n  color: #07F;\n  margin-bottom: 5px;\n}\n\ndiv.WaterBug_top_nav {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n}\n\ndiv.WaterBug_top_nav .WaterBug_button {\n  background-color: #EEEEEE;\n  color: #555555;\n  cursor: pointer;\n  float: left;\n  font-size: 11px;\n  height: 12px;\n  margin: 0px 0px 0px 3px;\n  padding-top: 2px;\n  text-align: center;\n  width: 14px;\n}\n\n  <\/style>\n<\/div>\n<div class=\"WaterBug_main_wrapper\" id=\"WaterBug_main_wrapper\">\n  <div id=\"WaterBug_console_display\"><\/div>\n  <input id=\"WaterBug_console_input\" type=\"text\" />\n  <div class=\"WaterBug_top_nav\">\n    <div class=\"WaterBug_button\" id=\"WaterBug_minimize_button\">_<\/div>\n    <div class=\"WaterBug_button\" id=\"WaterBug_close_button\">X<\/div>\n    <div style=\"clear:both;\"><\/div>\n  <\/div>\n<\/div>\n<div id=\"WaterBug_spacer\"><!-- zZz --><\/div>\n"),

  insert_body: function() {
    var container = document.createElement('div');
    container.innerHTML = this.html_string;
    var last_element = document.body.children[document.body.children.length - 1];
    var children=[];
    var element_count = container.children.length;
    for (var index=0; index < element_count; index+=1)
      children.push(container.children[index]);
    while (children.length > 0) {
      var child = children.shift();
      document.body.insertBefore(child, last_element);
    }
    this.main_wrapper = document.getElementById('WaterBug_main_wrapper');
    this.spacer = document.getElementById('WaterBug_spacer');
    this.style_wrapper = document.getElementById('WaterBug_style_wrapper');
    this.main_wrapper_height = this.main_wrapper.style.height;
    this.minimize_button = WaterBug.Button(document.getElementById('WaterBug_minimize_button'), function(){WaterBug.Runner.toggle_minimize();});
    this.close_button = WaterBug.Button(document.getElementById('WaterBug_close_button'), function(){WaterBug.Runner.close();});
  },

  load: function() {
    this.insert_body();
    var fake_console = WaterBug.console;
    WaterBug.console = WaterBug.Console(document.getElementById('WaterBug_console_input'), document.getElementById('WaterBug_console_display'));
    fake_console.call(WaterBug.console);
  },

  close: function() {
    WaterBug.console.log('Bye Bye!');
    document.body.removeChild(this.main_wrapper);
    document.body.removeChild(this.spacer);
    document.body.removeChild(this.style_wrapper);
    WaterBug.ExceptionHandler.unload();
    WaterBug = undefined;
  },

  toggle_minimize: function() {
    if (this.minimized) {
      this.main_wrapper.style.height = this.main_wrapper_height;
      this.minimize_button.element.innerHTML = '_';
    } else {
      this.main_wrapper.style.height = '25px';
      this.minimize_button.element.innerHTML = '+';
    }
    this.minimized = !this.minimized;
  }
}

if  (document.readyState && (/loaded|complete/.test(document.readyState))) {
  WaterBug.Runner.load();
} else {
  if (window.addEventListener)
    window.addEventListener('load', function(){WaterBug.Runner.load()}, 0);
  else
    window.attachEvent('load', function(){WaterBug.Runner.load()});
}
