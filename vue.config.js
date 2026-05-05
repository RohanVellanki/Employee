const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [],
  publicPath: process.env.GITHUB_ACTIONS ? '/Employee/' : '/'
})
