import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  assetsInclude: ["**/*.xlsx"],
  plugins: [
    react({
      include: ["**/*.jsx", "**/*.js"],
    }),
    visualizer({
      open: true, // Mở tệp HTML sau khi build để kiểm tra
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("ag-grid")) return "ag-grid";
            if (id.includes("xlsx")) return "xlsx";
            if (id.includes("face-api.js")) return "face-api.js";
            if (id.includes("ag-grid-react")) return "ag-grid-react";
            if (id.includes("ag-grid-community")) return "ag-grid-community";
            if (id.includes("ag-grid-enterprise")) return "ag-grid-enterprise";
            if (id.includes("ag-charts-community")) return "ag-charts-community";
            if (id.includes("@faker-js/faker")) return "faker-js";
            if (id.includes("@fullcalendar")) return "fullcalendar";
            if (id.includes("moment")) return "moment";
            if (id.includes("react-datepicker")) return "react-datepicker";
            if (id.includes("@material-tailwind/react")) return "material-tailwind";
            if (id.includes("crypto-js")) return "crypto-js";
            if (id.includes("jsqr")) return "jsqr";
            if (id.includes("jsuites")) return "jsuites";
            if (id.includes("jspreadsheet")) return "jspreadsheet";
            if (id.includes("jspreadsheet-ce")) return "jspreadsheet-ce";
            if (id.includes("lodash-es")) return "lodash-es";
            if (id.includes("iconsax-react")) return "iconsax-react";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("react-beautiful-dnd")) return "react-beautiful-dnd";
            if (id.includes("react-google-maps")) return "react-google-maps";
            return "vendor";
          }
        },
      },
    },
    // commonjsOptions: {
    //   include: [/node_modules/], // Bao gồm tất cả các module trong node_modules
    // },
  },
  esbuild: {
    include: /\.[jt]sx?$/, // Hỗ trợ JSX/TSX
    loader: "jsx",
    exclude: [],
  },
});
