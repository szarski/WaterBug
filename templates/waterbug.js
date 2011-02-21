<%= render :template => 'note.js' %>
<%= render :template => 'class.js' %>
<%= render :template => 'console.js' %>
<%= render :template => 'exception_handler.js' %>

WaterBug = {
  html_string: ("<%= escape_javascript(render :template => 'main_wrapper.html') %>"),
  console: null,
  load: function() {
    document.body.innerHTML += this.html_string;
    this.console = Console(document.getElementById('console_input'), document.getElementById('console_display'));
  }
}

WaterBug.load();
