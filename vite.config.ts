import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@atoms': resolve(__dirname, './src/components/atoms'),
      '@constants': resolve(__dirname, './src/constants'),
      '@helpers': resolve(__dirname, './src/assets/helpers'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@modules': resolve(__dirname, './src/modules'),
      '@molecules': resolve(__dirname, './src/components/molecules'),
      '@organisms': resolve(__dirname, './src/components/organisms'),
      '@typings': resolve(__dirname, './src/typings'),
    },
  },
});
