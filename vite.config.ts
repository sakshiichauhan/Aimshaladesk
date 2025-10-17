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
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - separate large third-party libraries
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Redux and state management
            if (id.includes('@reduxjs') || id.includes('redux')) {
              return 'redux-vendor';
            }
            // Other utilities
            if (id.includes('axios') || id.includes('framer-motion') || id.includes('lucide-react') || 
                id.includes('react-hook-form') || id.includes('zod') ||
                id.includes('clsx') || id.includes('tailwind-merge') || id.includes('sonner')) {
              return 'utils-vendor';
            }
            // Default vendor chunk for other node_modules
            return 'vendor';
          }
          
          // Feature-based chunks - group related components by path
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
          
          // Store and state management
          if (id.includes('/src/store/')) {
            return 'store';
          }
          
          // Common components and utilities
          if (id.includes('/src/components/') || id.includes('/src/layout/') || 
              id.includes('/src/auth/') || id.includes('/src/commons/')) {
            return 'common';
          }
          
          // Routes and dynamic imports
          if (id.includes('/src/routes/')) {
            return 'routes';
          }
        }
      }
    },
    // Increase chunk size warning limit to 1000kb since we're now using code splitting
    chunkSizeWarningLimit: 1000
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
