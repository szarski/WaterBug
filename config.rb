BRANCH = "master"
LATEST_STABLE = "stable_0.03"
JAVASCRIPT_URL_WITHOUT_PROTOCOL = "//github.com/szarski/WaterBug/raw/#{LATEST_STABLE}/generated/waterbug.js"

VERSION_DESCRIPTIONS = {
  "stable_0.03" => "This version provides a working console and error handling. Console has minimum functionality to be usable. Css styles are also very basic.\n\nThested with:\n\n  * IE6\n  * IE7\n  * IE8\n  * OSX Chrome\n  * OSX Firefox\n\nIn IE6 the main container styles will be broken because it doesn't support `position:fixed`. The functionality is usable however."
}

LATEST_STABLE_DESCRIPTION = VERSION_DESCRIPTIONS[LATEST_STABLE]
