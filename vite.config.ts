import { splitVendorChunkPlugin, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import legacy from '@vitejs/plugin-legacy'
// import Components from 'unplugin-vue-components/vite'
// import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      host: true,
      port: 8081,
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: false,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      }),
      splitVendorChunkPlugin(),
      legacy({
        targets: ['defaults', 'not ie < 9'],
      }),
      // Components({
      //   resolvers: [ElementUiResolver()],
      // }),
    ],
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'element-ui': ['element-ui'],
          },
        },
      },
    },
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: path.resolve('src') + '/',
        },
      ],
    },
  }
}
