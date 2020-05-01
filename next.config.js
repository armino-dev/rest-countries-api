const withSass = require('@zeit/next-sass')

module.exports = withSass({
  devIndicators: {
    buildActivity: true,
    autoPrerender: false,
  }
})