import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [react()],
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    build: {
        target: "es2022",
        outDir: "../../../public/addons/rewa-pos/assets",
        emptyOutDir: true,
        lib: {
            entry: resolve(import.meta.dirname, "src/main.tsx"),
            formats: ["es"],
            fileName: () => "pos.js",
            cssFileName: "pos",
        },
        rollupOptions: { output: { inlineDynamicImports: true } },
        sourcemap: false,
        minify: true,
        license: true,
    },
});
