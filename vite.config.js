import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: 'VueCommonComponents',
            formats: ['es'],
            fileName: (format) => `vue-common-components.js`
        },
        outDir: "./dist/",
        emptyOutDir: true,
    },
});
