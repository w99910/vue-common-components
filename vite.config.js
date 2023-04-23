import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: 'VueCommonComponents',
            formats: ['es', 'umd'],
            fileName: (format) => `vue-common-components.${format}.js`
        },
        outDir: "./dist/",
        minify: true,
        emptyOutDir: true,
    },
});
