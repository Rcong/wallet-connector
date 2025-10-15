import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/sdk/index.ts'),
      name: 'WalletConnectorSDK',
      fileName: (format) => `wallet-connector-sdk.${format}.js`,
      // 输出格式
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'ethers'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React',
          ethers: 'ethers',
        },
        // 输出目录
        dir: 'dist',
        // 保留模块结构
        preserveModules: false,
        // 代码分割
        manualChunks: undefined
      },
    },
    // 输出目录
    outDir: 'dist',
    // 清空输出目录
    emptyOutDir: true,
    // 生成类型声明文件
    // Note: 需要安装 @types/node 和配置 TypeScript
    target: 'es2015',
    minify: 'terser',
    sourcemap: true
  },
  // TypeScript 配置
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
});
