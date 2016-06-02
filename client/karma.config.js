var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/**/*.test.ts': ['webpack'],
      'src/**/*.test.tsx': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      externals: {
        /* following explained by: https://github.com/airbnb/enzyme/issues/47 */
        "jsdom": "window", 
        "cheerio": "window",
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}