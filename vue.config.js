// https://www.jianshu.com/p/cb13f845b204
// cdn预加载使用
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "element-ui": "ELEMENT"
};
const cdn = {
  // 开发环境
  dev: {
    css: ["https://lib.baomitu.com/element-ui/2.13.2/theme-chalk/index.css"],
    js: []
  },
  // 生产环境
  build: {
    css: ["https://lib.baomitu.com/element-ui/2.13.2/theme-chalk/index.css"],
    js: [
      "https://lib.baomitu.com/vue/2.6.11/vue.min.js",
      "https://lib.baomitu.com/vue-router/3.1.3/vue-router.min.js",
      "https://lib.baomitu.com/vuex/3.5.1/vuex.min.js",
      "https://lib.baomitu.com/axios/0.20.0-0/axios.min.js",
      "https://lib.baomitu.com/element-ui/2.13.2/index.js"
    ]
  }
};

// gzip --start
// npm i compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzip = true; // 是否使用gzip
const productionGzipExtensions = ["js", "css"]; // 需要gzip压缩的文件后缀
// gzip --end

module.exports = {
  productionSourceMap: false, // 生产环境的 source map

  configureWebpack: config => {
    // gzip
    if (process.env.NODE_ENV === "production") {
      //  构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        );
    }
    //本地环境 线上环境
    if (process.env.NODE_ENV === "production") {
      config.externals = externals;
    }
    if (process.env.NODE_ENV === "development") {
      config.devServer = {
        disableHostCheck: true
      };
    }
  },

  chainWebpack: config => {
    // 压缩图片
    // npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: "65-90", speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      });
    // 使用cdn
    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },

  devServer: {
    port: 8001,
    host: "0.0.0.0",
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api1": {
        target: "http://101.133.166.140:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api1": "/v1"
        }
      },
      "/api2": {
        target: "http://49.235.74.32:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api2": "/v2"
        }
      }
    }
  }
};
