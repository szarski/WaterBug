# WaterBug

WaterBug is an attempt to build a javascript-based debugging tool for all browsers.

## Inspiration

WaterBug was inspired by FireBug, the best ever debug tool. FireBug's developed as an addon to Firefox which makes it unaccessible for other browsers. WaterBug's idea is to make a tool that is browser-independent.

## History

First attempt can be found here: https://github.com/szarski/WaterBugOLD

Its three problems were:

  * dependency on Prototype javascript framework
  * low efficiency
  * unclear code

The new tool shoud fix all the problems.

## Current state

Currently WaterBug only has a javascript console, new modules will be added. I'd appreciate if anyone wants to contribute by building new modules.

## Development

Simply run `ruby generate.rb`. The script generates files into the `generated/` directory.

## License

Copyright (c) 2010 Jacek Szarski

jacek@applicake.com

Released under the GPL license.
