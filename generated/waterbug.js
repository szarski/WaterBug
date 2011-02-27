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


try {
  WaterBug = {};

  try {
eval("WaterBug.Class = function(instance_methods, class_methods){\n  var klass = function(){\n    var prototype = {};\n    for (key in klass.prototype) {\n      prototype[key] = klass.prototype[key];\n    }\n    prototype.initialize.apply(prototype, arguments);\n    klass.all.push(prototype);\n    var id = klass.all.length;\n    prototype.id = id;\n    prototype.class = klass;\n    return prototype;\n  };\n\n  klass.prototype = instance_methods;\n  for (key in class_methods) {\n    klass[key] = class_methods[key];\n  };\n\n  klass.all = [];\n  return klass;\n}\n");
} catch(e) {alert('WaterBug caught an internal exception in its own body:\n"'+e.message+'"\ntemplate file class.js')};
  try {
eval("WaterBug.FakeConsole=WaterBug.Class({\n\n  initialize: function() {\n    this.calls = [];\n  },\n    \n  log: function() {\n    this.calls.push(arguments);\n  },\n\n  call: function(object) {\n    for (var index in this.calls) {\n      args = this.calls[index];\n      object.log.apply(object, args);\n    }\n  }\n\n},{});\n");
} catch(e) {alert('WaterBug caught an internal exception in its own body:\n"'+e.message+'"\ntemplate file fake_console.js')};

  WaterBug.console = WaterBug.FakeConsole();

  try {
eval("WaterBug.Runner = {\n  minimized: 0,\n\n  html_string: (\"<div id=\\\"WaterBug_style_wrapper\\\">\\n  <br />\\n  <!-- both this DIV and this BR are necesary here for IE7 to dynamicaly load css style element. -->\\n  <style type=\\\"text/css\\\">\\n    #WaterBug_spacer {\\n  margin: 0px;\\n  padding: 0px;\\n  height: 250px;\\n  width: 100%;\\n  border-top: 3px dotted #F00;\\n}\\n\\ndiv.WaterBug_main_wrapper {\\n  position: fixed;\\n  width: 100%;\\n  background-color: #DEDEDE;\\n  border-top: 1px solid #000;\\n  padding: 0px;\\n  margin: 0px;\\n  bottom: 0px;\\n  left: 0px;\\n  z-index: 50000;\\n}\\n\\n#WaterBug_console_display {\\n  width: 600px;\\n  border: 1px solid #000;\\n  height: 200px;\\n  margin: 3px;\\n  overflow: scroll;\\n  font-size: 14px;\\n  background-color: #FFF;\\n}\\n\\n#WaterBug_console_input {\\n  width: 600px;\\n  border: 1px solid #000;\\n  margin: 0px 3px 3px;\\n  height: 20px;\\n}\\n\\n\\n#WaterBug_console_display span.WaterBug_exception {\\n  color: #F00;\\n}\\n\\n#WaterBug_console_display span.WaterBug_object_type {\\n  background-color: #000000;\\n  color: #FFFFFF;\\n  font-size: 12px;\\n  margin-right: 5px;\\n  padding: 2px 5px 1px;\\n}\\n\\n#WaterBug_console_display span.WaterBug_too_deep {\\n  font-style: italic;\\n  font-size: 12px;\\n}\\n\\n#WaterBug_console_display div {\\n  margin: 0px;\\n  padding: 0px;\\n}\\n\\n#WaterBug_console_display .WaterBug_line {\\n  min-height: 18px;\\n  border-bottom: 1px dotted #DDDDDD;\\n}\\n\\n#WaterBug_console_display .WaterBug_line_number {\\n  border: 0px;\\n  background-color: #AAAAAA;\\n  float: left;\\n  height: 16px;\\n  padding: 3px 5px 0 0;\\n  text-align: right;\\n  width: 50px;\\n  color: #444;\\n}\\n\\n#WaterBug_console_display .WaterBug_content {\\n  border: 0px;\\n  float: left;\\n  min-height: 17px;\\n  overflow: hidden;\\n  width: 522px;\\n  padding: 2px 0 0 5px;\\n}\\n\\n#WaterBug_console_display .WaterBug_command {\\n  color: #07F;\\n  margin-bottom: 5px;\\n}\\n\\ndiv.WaterBug_top_nav {\\n  position: absolute;\\n  top: 5px;\\n  right: 5px;\\n}\\n\\ndiv.WaterBug_top_nav .WaterBug_button {\\n  background-color: #EEEEEE;\\n  color: #555555;\\n  cursor: pointer;\\n  float: left;\\n  font-size: 11px;\\n  height: 12px;\\n  margin: 0px 0px 0px 3px;\\n  padding-top: 2px;\\n  text-align: center;\\n  width: 14px;\\n}\\n\\n  <\\/style>\\n<\\/div>\\n<div class=\\\"WaterBug_main_wrapper\\\" id=\\\"WaterBug_main_wrapper\\\">\\n  <div id=\\\"WaterBug_console_display\\\"><\\/div>\\n  <textarea id=\\\"WaterBug_console_input\\\"><\\/textarea>\\n  <div class=\\\"WaterBug_top_nav\\\">\\n    <div class=\\\"WaterBug_button\\\" id=\\\"WaterBug_minimize_button\\\">_<\\/div>\\n    <div class=\\\"WaterBug_button\\\" id=\\\"WaterBug_close_button\\\">X<\\/div>\\n    <div style=\\\"clear:both;\\\"><\\/div>\\n  <\\/div>\\n<\\/div>\\n<div id=\\\"WaterBug_spacer\\\"><!-- zZz --><\\/div>\\n\"),\n\n  insert_body: function() {\n    var container = document.createElement(\'div\');\n    container.innerHTML = this.html_string;\n    var last_element = document.body.children[document.body.children.length - 1];\n    var children=[];\n    var element_count = container.children.length;\n    for (var index=0; index < element_count; index+=1)\n      children.push(container.children[index]);\n    while (children.length > 0) {\n      var child = children.shift();\n      document.body.insertBefore(child, last_element);\n    }\n    this.main_wrapper = document.getElementById(\'WaterBug_main_wrapper\');\n    this.spacer = document.getElementById(\'WaterBug_spacer\');\n    this.style_wrapper = document.getElementById(\'WaterBug_style_wrapper\');\n    this.main_wrapper_height = this.main_wrapper.style.height;\n    this.minimize_button = WaterBug.Button(document.getElementById(\'WaterBug_minimize_button\'), function(){WaterBug.Runner.toggle_minimize();});\n    this.close_button = WaterBug.Button(document.getElementById(\'WaterBug_close_button\'), function(){WaterBug.Runner.close();});\n  },\n\n  load: function() {\n    this.insert_body();\n    var fake_console = WaterBug.console;\n    WaterBug.console = WaterBug.Console(document.getElementById(\'WaterBug_console_input\'), document.getElementById(\'WaterBug_console_display\'));\n    fake_console.call(WaterBug.console);\n  },\n\n  close: function() {\n    WaterBug.console.log(\'Bye Bye!\');\n    document.body.removeChild(this.main_wrapper);\n    document.body.removeChild(this.spacer);\n    document.body.removeChild(this.style_wrapper);\n    WaterBug.ExceptionHandler.unload();\n    WaterBug = undefined;\n  },\n\n  toggle_minimize: function() {\n    if (this.minimized) {\n      this.main_wrapper.style.height = this.main_wrapper_height;\n      this.minimize_button.element.innerHTML = \'_\';\n    } else {\n      this.main_wrapper.style.height = \'25px\';\n      this.minimize_button.element.innerHTML = \'+\';\n    }\n    this.minimized = !this.minimized;\n  }\n}\n");
} catch(e) {alert('WaterBug caught an internal exception in its own body:\n"'+e.message+'"\ntemplate file runner.js')};
  try {
eval("WaterBug.Console = WaterBug.Class({\n\n  initialize: function(input_element, output_element) {\n    this.command_history = [];\n    this.command_history_index = 0;\n    this.input_element = input_element;\n    this.output_element = output_element;\n    var that = this;\n    this.input_element.onkeyup = function(e){\n      var key;\n      if(window.event) // IE\n        key = ({38: \'up\', 40: \'down\', 13: \'enter\'})[event.keyCode];\n      else // FF and ?\n        key = ({38: \'up\', 40: \'down\', 13: \'enter\'})[e.keyCode];\n      return that.keypress(key);\n    };\n  },\n\n  run: function(command) {\n    var result;\n    var exception = 0;\n    this.command_history.push(command);\n    this.reset_command_history_index();\n    try {\n      result = eval(command);\n    } catch(e) {\n      result = WaterBug.Exception(e.message);\n    }\n    this.log(result, command);\n    this.input_element.value = \'\';\n  },\n\n  log: function(object, command) {\n    var command_output = command ? \'<div class=\"WaterBug_command\">\'+WaterBug.Console.escapeHTML(\'\' + command)+\'<\/div>\' : \'\';\n\n    var output = \'\\n<div class=\"WaterBug_line\"><div class=\"WaterBug_line_number\">\' + this.command_history.length + \'<\/div><div class=\"WaterBug_content\">\' + command_output + this.inspect(object) + \'<\/div><div style=\"clear:both;\"><\/div><\/div>\';\n\n    this.output_element.innerHTML += output;\n    this.output_element.scrollTop = this.output_element.scrollHeight;\n  },\n\n  inspect: function(obj, level) {\n    if (!level)\n      level = 0;\n    var representation;\n    var type;\n    if (obj && (obj.class) && (obj.class == WaterBug.Exception)) {\n      representation = \"<span class=\\\"WaterBug_exception\\\">\" + obj.short_broken_with(\'<br />\') + \"<\/span>\";\n      type = \"!\";\n    } else {\n      type = typeof(obj);\n      switch (typeof obj) {\n        case \'string\': \n          representation = \'\"\' + WaterBug.Console.escapeHTML(obj).replace(/\\n/,\'<br />\') + \'\"\';\n          break;\n        case \'number\': \n          representation = \'\' + obj;\n          break;\n        case \'boolean\': \n          representation = (obj ? \'true\' : \'false\');\n          break;\n        case \'undefined\':\n          representation = \'undefined\';\n          break;\n        case \'object\':\n          if (level < 3) {\n            var values = [];\n            for (var property in obj)\n              values.push(property+\': \'+this.inspect(obj[property], level+1));\n            representation =  \'{\' + values.join(\", \") + \'}\';\n          } else {\n            representation =  \"<span class=\\\"WaterBug_too_deep\\\">(too deep...)<\/span>\";\n          }\n          break;\n        default:\n          representation = WaterBug.Console.escapeHTML(\'\' + obj);\n          break;\n      }\n    }\n    if (level == 0)\n      return \'<span class=\"WaterBug_object_type\">\'+ type +\'<\/span>\' + representation;\n    else\n      return representation;\n  },\n\n  object_to_string: function(obj) {\n  },\n\n  previous_command: function(){\n    this.load_command_from_history(-1);\n  },\n\n  next_command: function(){\n    this.load_command_from_history(+1);\n  },\n\n  load_command_from_history: function(shift) {\n    this.command_history_index += shift;\n    if (this.command_history_index < 0)\n      this.command_history_index = 0;\n    if (this.command_history_index > this.command_history.length)\n      this.reset_command_history_index();\n    this.input_element.value = this.command_history[this.command_history_index] || \'\';\n  },\n\n  reset_command_history_index: function() {\n    this.command_history_index = this.command_history.length;\n  },\n\n  keypress: function(key) {\n    if (key==\'enter\') {\n      this.run(this.input_element.value);\n      return false\n    } else if (key==\'up\') {\n      this.previous_command();\n      return false\n    } else if (key==\'down\') {\n      this.next_command();\n      return false\n    } else\n      return true;\n  }\n\n},{\n\n  escapeHTML: function(string) {\n    return (\'\'+string).replace(/&/g,\'&amp;\').replace(/>/g,\'&gt;\').replace(/<\/g,\'&lt;\').replace(/\"/g,\'&quot;\');\n  }\n\n});\n");
} catch(e) {alert('WaterBug caught an internal exception in its own body:\n"'+e.message+'"\ntemplate file console.js')};
  try {
eval("WaterBug.Exception = WaterBug.Class({\n  initialize: function(message, url, line) {\n    this.message = message;\n    this.url     = url;\n    this.line    = line;\n  },\n\n  exception: true,\n\n  report: function() {\n    WaterBug.console.log(this);\n  },\n\n  to_json: function() {\n    return ({message: this.message, url: this.url, line: this.line, browser_info: this.debug_info()});\n  },\n\n  serialize: function() {\n    return someserialize(this.to_json(),\'exception\');\n  },\n\n  url_encoded: function() {\n    for(var index in WaterBug.Exception.navigator_fields)\n      var field_name = WaterBug.Exception.navigator_fields[index];\n    return \'exception[message]=\'+escape(this.message)\n  },\n\n  to_s: function() {\n    return \'WaterBug.Exception: \'+this.message+\'\\n\\ncaught in: \'+this.url+\'\\nline: \'+this.line;\n  },\n\n  short_broken_with: function(separator) {\n    var result = this.message;\n    if (this.line)\n      result += separator + this.url + \':\' + this.line;    \n    return result;\n  },\n\n  debug_info: function() {\n    result = {};\n    for(var index in WaterBug.Exception.navigator_fields) {\n      var field_name = WaterBug.Exception.navigator_fields[index];\n      result[field_name] = navigator[field_name];\n    }\n    return result;\n  }\n\n},{\n\n  navigator_fields: \'appCodeName appName appVersion cookieEnabled platform userAgent\'.split(\' \')\n\n});\n\nWaterBug.ExceptionHandler = {\n\n  load: function() {\n    this.old_onerror = window.onerror;\n    window.onerror = this.on_error;\n  },\n\n  unload: function() {\n    window.onerror = this.old_onerror;\n  },\n\n  on_error: function(message, url, line) {\n    var exception = WaterBug.Exception(message, url, line);\n    exception.report();\n    return true;\n  }\n\n};\n\nWaterBug.ExceptionHandler.load();\n");
} catch(e) {alert('WaterBug caught an internal exception in its own body:\n"'+e.message+'"\ntemplate file exception_handler.js')};

  try {
    // These are dependencies that aren't necesarry for WB to load.
    WaterBug.Button = WaterBug.Class({

  initialize: function(element, click_event) {
    this.element = element;
    this.click_event = click_event || function(){};
    var that = this;
    this.element.onclick = function(){ that.click_event.apply(that, arguments); };
  }

},{});

  } catch(e) {alert('WaterBug encountered an exception:\n"'+e.message+'"\n'+e.url + ':'+e.line);}

  if  (document.readyState && (/loaded|complete/.test(document.readyState))) {
    WaterBug.Runner.load();
  } else {
    if (window.addEventListener)
      window.addEventListener('load', function(){WaterBug.Runner.load()}, 0);
    else
      window.attachEvent('load', function(){WaterBug.Runner.load()});
  }

} catch(e) {alert('WaterBug encountered an exception during loading:\n"'+e.message+'"\n'+e.url + ':'+e.line);}
