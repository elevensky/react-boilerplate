const path = require('path');
const webpack = require('webpack');

const assetsPath = path.resolve(__dirname, '../static/dist');

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'classnames',
      'moment',
      'react',
      'react-cookie',
      'react-dom',
      'react-motion',
      'react-redux',
      'react-router',
      'redux',
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]_library'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|zh-cn/),
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(assetsPath, '[name]-manifest.json'),
      /**
       * name
       * dll bundle 输出到那个全局变量上
       * 和 output.library 一样即可。
       */
      name: '[name]_library'
    }),

    // ignore dev config
    // new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
