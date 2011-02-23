# WaterBug

WaterBug is an attempt to build a javascript-based debugging tool for all browsers.

## Inspiration

WaterBug was inspired by FireBug, the best ever debug tool. FireBug's developed as an addon to Firefox which makes it unaccessible for other browsers. WaterBug's idea is to make a tool that is browser-independent.

## History

First attempt can be found [here](https://github.com/szarski/WaterBugOLD).

Its three problems were:

  * dependency on Prototype javascript framework
  * low efficiency
  * unclear code

The new tool shoud fix all the problems.

## Current state

Currently WaterBug is in an early development state. New modules will be added periodically as the previous ones become stable and satisfactionary.

I'd appreciate if anyone wanted to contribute by building new modules.

For details please reffer to the latest stable version.

## Latest stable version

Current version is <%= LATEST_STABLE %>.

<% if LATEST_STABLE_DESCRIPTION %>
<%= LATEST_STABLE_DESCRIPTION %>
<% else %>
(no description available for ths version)
<% end %>

## Development

Simply run `ruby generate.rb`. The script generates files into the `generated/` directory.

Please see the coding guidelines [here](http://github.com/szarski/WaterBug/blob/master/coding_guidelines.markdown).

## Usage

The examples below explain how to use version `<%= LATEST_STABLE %>`.

To use other versions just replace `<%= LATEST_STABLE %>` with `<%= BRANCH %>`.

To use WaterBug you have to either:

  * include it in your website's header:

        <%= render(:template => "include_script.html") %>

  * dynamically ad it by issuing this code:

        <%= render(:template => "loading_script.js").split("\n").join("\n        ") %>

  * just insert this into the url once the page is loaded:

        <%= render(:template => "loading_script_urllike.js") %>

Please note that only the first option will allow you to catch exceptions that appear when the page is being loaded.


## License

Copyright (c) 2010 Jacek Szarski

jacek@applicake.com

Released under the GPL license.

## ToDo

<%= render :template => "todo.markdown" %>
