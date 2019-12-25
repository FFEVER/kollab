const { environment } = require("@rails/webpacker")

// We want to ensure that our javascripts understands the $,
// Jquery and Popper aliases. To do that, we’ll use the Provide plugin
// in webpack to autoload the respective libraries / modules
// and have them mapped to the aliases.
const webpack = require("webpack")
environment.plugins.append(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: ["popper.js", "default"]
  })
)
module.exports = environment
