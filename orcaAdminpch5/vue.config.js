const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  configureWebpack: config => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  devServer: {
    open: true,
    https: false,
    hotOnly: false,
    proxy: {
      // '/api/orcaAdmin/':{
      //   target: 'http://localhost:8010',
      //   secure: false,
      //   changeOrigin: true,
      // },
      '/api/orcaOper/':{
        target: 'http://localhost:8013',
        secure: false,
        changeOrigin: true,
      },
      // '/api/umodel/':{
      //   target: 'http://localhost:8112',
      //   secure: false,
      //   changeOrigin: true,
      // },
      // '/api/(ram|uright|mright)/':{
      //   target: 'http://localhost:7030',
      //   secure: false,
      //   changeOrigin: true,
      // },
      // '/api/alert/':{
      //   target: 'http://localhost:7130',
      //   secure: false,
      //   changeOrigin: true,
      // },
      // '/api/media/':{
      //   target: 'http://localhost:8019',
      //   secure: false,
      //   changeOrigin: true,
      // },
      // '/api/test/':{
      //     target: 'http://localhost:9090',
      //     secure: false,
      //     changeOrigin: true,
      // },
      '/res/': {
        target: 'http://res.test.paishankj.com',//deploy配置 DEV_LOCAL
        secure: true,
        changeOrigin: true,
      },
      '/api/': {
        // target: 'http://api.dev.ismartplus.cn',
        target: 'http://api.test.paishankj.com',
        // target: 'http://api.paishankj.com',
        secure: true,
        changeOrigin: true,
      },
    },
    before: app => { }
  },
  chainWebpack: config => {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('@api', resolve('src/api'))
    config.resolve.alias.set('@lib', resolve('src/lib'))
    config.resolve.alias.set('@common', resolve('src/common'))
    config.resolve.alias.set('@models', resolve('src/common/models'))
    config.resolve.alias.set('@views', resolve('src/common/views'))
    config.resolve.alias.set('@components', resolve('src/common/components'))
    config.resolve.alias.set('~', resolve('static'))
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      }),
      new CompressionWebpackPlugin({
          // filename: '[path].gz[query]',
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: new RegExp('\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
      })
  ]
  }
}