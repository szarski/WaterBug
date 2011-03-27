WaterBug.Runner = {
  minimized: 0,

  html_string: ("<%= escape_javascript(render :template => 'main_wrapper.html') %>"),

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
    this.main_wrapper = document.getElementById('<%= html_element_id(:main_wrapper) %>');
    this.spacer = document.getElementById('<%= html_element_id(:spacer) %>');
    this.style_wrapper = document.getElementById('<%= html_element_id(:style_wrapper) %>');
    this.main_wrapper_height = this.main_wrapper.style.height;
    this.minimize_button = WaterBug.Button(document.getElementById('<%= html_element_id(:minimize_button) %>'), function(){WaterBug.Runner.toggle_minimize();});
    this.close_button = WaterBug.Button(document.getElementById('<%= html_element_id(:close_button) %>'), function(){WaterBug.Runner.close();});
    this.input_switch_button = WaterBug.Button(document.getElementById('<%= html_element_id(:input_switch_button) %>'), function(){
      if (WaterBug.console.singleline_mode)
        WaterBug.console.set_multiline_mode();
      else
        WaterBug.console.set_singleline_mode();
    });
    this.input_switch_button = WaterBug.Button(document.getElementById('<%= html_element_id(:run_button) %>'), function(){WaterBug.console.run();});
  },

  load: function() {
    this.insert_body();
    var fake_console = WaterBug.console;
    WaterBug.console = WaterBug.Console(document.getElementById('<%= html_element_id(:console_input) %>'), document.getElementById('<%= html_element_id(:console_textarea) %>'), document.getElementById('<%= html_element_id(:console_display) %>'));
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
