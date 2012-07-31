WaterBug.Debugger = WaterBug.Class({
    
  initialize: function(that){
    this.that = that;
    this.console = WaterBug.console;//WaterBug.Console(document.getElementById('<%= html_element_id(:debugger_input) %>'), document.getElementById('<%= html_element_id(:console_textarea) %>'), document.getElementById('<%= html_element_id(:console_display) %>'));
    this.console.execute = function(code){return (function(x){return eval(x)}).apply(that, [code])}
  },

  run: function(code){
    //with(this.that){
      (function(){eval(code)}).apply(this.that);
    //}
  },

  e:function(x){
    eval(x)
  }

});



d=null;
f = function(){

  var dupa = 5;
  this.pies = 8;

  d = WaterBug.Debugger(this);
//  WaterBug.console.log('This should equal '+dupa+':');
//  d.run('WaterBug.console.log(dupa)');
//
//  WaterBug.console.log('This should equal '+this.pies+':');
//  d.run('WaterBug.console.log(this.pies)');

}

f();
