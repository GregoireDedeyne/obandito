import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(), react()],
  optimizeDeps: {
    exclude: ['buffer'],
  },
});
