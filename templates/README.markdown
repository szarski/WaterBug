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

Currently WaterBug only has a javascript console, new modules will be added. I'd appreciate if anyone wanted to contribute by building new modules.

## Development

Simply run `ruby generate.rb`. The script generates files into the `generated/` directory.

## Usage

To use WaterBug you have to either:

  * include it in your website's header:

        <%= render(:template => "include_script.html") %>

  * dynamically ad it by issuing this code:

        <%= render(:template => "loading_script.js").split("\n").join("\n        ") %>

  You can just insert this into the url once the page is loaded:

        <%= render(:template => "loading_script_urllike.js") %>


## License

Copyright (c) 2010 Jacek Szarski

jacek@applicake.com

Released under the GPL license.
