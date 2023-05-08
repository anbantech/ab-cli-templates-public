module.exports = {
  devServer: {
    proxy: {
      '/backstage': {
        target: 'http://127.0.0.1:7002',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
        imports: ['vue'],
        dts: true,
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ]
  }
}
