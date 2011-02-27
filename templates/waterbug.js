<%= render :template => 'note.js' %>

try {
  WaterBug = {};

  <%= render_eval_and_rescue :template => 'class.js' %>
  <%= render_eval_and_rescue :template => 'fake_console.js' %>

  WaterBug.console = WaterBug.FakeConsole();

  <%= render_eval_and_rescue :template => 'runner.js' %>
  <%= render_eval_and_rescue :template => 'console.js' %>
  <%= render_eval_and_rescue :template => 'exception_handler.js' %>

  try {
    // These are dependencies that aren't necesarry for WB to load.
    <%= render :template => 'button.js' %>
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
