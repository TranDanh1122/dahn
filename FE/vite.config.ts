import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['./src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
      ]
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
      '@lang': path.resolve(__dirname, './src/modules/language'),
      '@workspace': path.resolve(__dirname, './src/modules/workspace'),
      '@user': path.resolve(__dirname, './src/modules/user'),
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@auth': path.resolve(__dirname, './src/modules/auth'),
      '@lang': path.resolve(__dirname, './src/modules/language'),
      '@workspace': path.resolve(__dirname, './src/modules/workspace'),
      '@user': path.resolve(__dirname, './src/modules/user'),
    },
  }
})
