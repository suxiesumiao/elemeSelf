// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 2017年4月16日17:03:34
let express = require('express')
let proxy = require('http-proxy-middleware')
let app = express()
// 转换https://mainsite-restapi.ele.me/
let getJson = proxy({
    target: 'https://mainsite-restapi.ele.me/',
    changeOrigin: true
});
// 转换https://fuss10.elemecdn.com/
let getJson2 = proxy({
    target: 'https://fuss10.elemecdn.com/',
    changeOrigin: true
})

app.use('/member/v1/discover', getJson)
app.use('/hotfood/v1/guess/likes', getJson)
app.use('/shopping/v1/discount/food', getJson)
app.use('/marketing/v1/nearby_orders', getJson)
app.use('/member/gifts/suggest', getJson)
    // 随机热搜
app.use('/shopping/v3/hot_search_words', getJson)
    // 主题推荐
app.use('/v2', getJson)
    // 主题推荐图片
app.use('//', getJson2)
    // 对于某一个店面获取数据,可能包含其他链接
app.use('/shopping', getJson)

app.use('/', express.static('../'))
app.listen(30000);
// 2017年4月16日17:03:34

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
