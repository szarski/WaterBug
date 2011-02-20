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
    var prototype = klass.prototype;
    prototype.initialize.apply(prototype, arguments);
    return prototype;
  }

  klass.prototype = instance_methods;

  for (key in class_methods) {
    klass[key] = class_methods[key];
  }

  return klass;
}

Console = Class({

  initialize: function(input_element, output_element) {
    this.command_history = [];
    this.command_history_index = 0;
    this.input_element = input_element;
    this.output_element = output_element;
    var that = this;
    this.input_element.onkeypress = function(event){return that.keypress(((event.charCode === undefined)||(event.charCode == 0)) ? event.keyCode : event.charCode);};
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
      return "\n(" + this.command_history.length + ") <span class=\"exception\">" + result + "</span><br />";
    else
      return "\n(" + this.command_history.length + ") " + result + "<br />";
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
    console.log(this.command_history_index);
    this.input_element.value = this.command_history[this.command_history_index] || '';
  },

  reset_command_history_index: function() {
    this.command_history_index = this.command_history.length;
  },

  keypress: function(key) {
    if (key==13) {
      this.run(this.input_element.value);
      return false
    } else if (key==38) {
      this.previous_command();
      return false
    } else if (key==40) {
      this.next_command();
      return false
    } else
      return true;
  }

},{
});


var html = ("<style type=\"text/css\">\n  div.main_wrapper {\n  position: absolute;\n  width: 100%;\n  background-color: #FFF;\n  border-top: 2px solid #000;\n  padding: 0px;\n  margin: 0px;\n  bottom: 0px;\n}\n\nspan.exception {\n  color: #F00;\n}\n\n#console_display {\n  width: 600px;\n  border: 1px solid #000;\n  height: 200px;\n  margin: 5px;\n  overflow: scroll;\n}\n\n#console_input {\n  width: 600px;\n  border: 1px solid #000;\n  margin: 5px;\n}\n\n<\/style>\n<div class=\"main_wrapper\" id=\"main_wrapper\">\n  <div id=\"console_display\"><\/div>\n  <input id=\"console_input\" type=\"text\" />\n<\/div>\n");

document.body.innerHTML += html;


Console(document.getElementById('console_input'), document.getElementById('console_display'));
