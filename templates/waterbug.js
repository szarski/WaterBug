<%= render :template => 'note.js' %>
<%= render :template => 'class.js' %>
<%= render :template => 'console.js' %>
<%= render :template => 'exception_handler.js' %>
<%= render :template => 'fake_console.js' %>


WaterBug = {
  html_string: ("<%= escape_javascript(render :template => 'main_wrapper.html') %>"),
  console: FakeConsole(),
  load: function() {
    var fake_console = this.console;
    document.body.innerHTML += this.html_string;
    this.console = Console(document.getElementById('console_input'), document.getElementById('console_display'));
    fake_console.call(this.console);
  }
}

setTimeout('WaterBug.load();', 1000); // this is a mockup od document.ready :)
