import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Global constants for image URLs



export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
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
      'tailwind-merge'
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Simplified chunking strategy to avoid initialization issues
          if (id.includes('node_modules')) {
            // Keep React ecosystem together
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Keep UI libraries together
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // Keep state management together
            if (id.includes('@reduxjs') || id.includes('redux')) {
              return 'redux-vendor';
            }
            // Keep animation libraries together
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'animation-vendor';
            }
            // Keep form validation together
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'form-vendor';
            }
            // Keep utilities separate and smaller
            if (id.includes('axios')) {
              return 'http-vendor';
            }
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'utils-vendor';
            }
            // Default vendor chunk for other node_modules
            return 'vendor';
          }
          
          // Simplified feature chunks
          if (id.includes('/src/pages/PlatformDesk/')) {
            return 'platform-desk';
          }
          if (id.includes('/src/pages/RelationDesk/')) {
            return 'relation-desk';
          }
          if (id.includes('/src/pages/DigitalDesk/')) {
            return 'digital-desk';
          }
          if (id.includes('/src/pages/FinanceDesk/')) {
            return 'finance-desk';
          }
          if (id.includes('/src/pages/ReviewDesk/')) {
            return 'review-desk';
          }
          if (id.includes('/src/pages/DevopsDesk/')) {
            return 'devops-desk';
          }
          if (id.includes('/src/pages/HRMS/')) {
            return 'hrms-desk';
          }
          
          // Keep store together
          if (id.includes('/src/store/')) {
            return 'store';
          }
          
          // Keep common components together
          if (id.includes('/src/components/') || id.includes('/src/layout/') || 
              id.includes('/src/auth/')) {
            return 'common';
          }
          
          // Keep routes together
          if (id.includes('/src/routes/')) {
            return 'routes';
          }
        }
      }
    },
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Add minification options to prevent variable hoisting issues
    minify: 'terser',
    terserOptions: {
      compress: {
        // Disable some aggressive optimizations that can cause initialization issues
        hoist_funs: false,
        hoist_vars: false,
        keep_fargs: true
      },
      mangle: {
        // Keep function names to help with debugging
        keep_fnames: true
      }
    }
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
