import path from 'path';

import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [swc.vite()],
    test: {
        // https://vitest.dev/config/#alias
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // https://vitest.dev/config/#globals
        globals: true,
        root: './',
    },
});
