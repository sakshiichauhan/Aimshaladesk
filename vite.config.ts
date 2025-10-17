import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Global constants for image URLs



export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure proper build target
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Simplified chunking strategy to avoid initialization issues
          if (id.includes('node_modules')) {
            // Keep all vendor libraries in one chunk to avoid dependency issues
            return 'vendor';
          }
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Use esbuild for faster, more reliable minification
    minify: 'esbuild',
    // Remove aggressive terser options that might cause issues
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Ensure consistent module resolution
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'framer-motion',
      'lucide-react',
      'axios',
      'clsx',
      'tailwind-merge',
      'sonner'
    ],
    // Force pre-bundling to avoid runtime issues
    force: true
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://a.aimshala.com/",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path,
  //     },
  //   },
  // },
  
});
