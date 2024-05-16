import path from 'path';

import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [swc.vite()],
    test: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        globals: true,
        include: ['**/*.e2e-spec.ts'],
        root: './',
        setupFiles: ['./src/common/utils/test/setup-e2e.ts'],
    },
});
