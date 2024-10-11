import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
export default (function (_a) {
    var mode = _a.mode;
    var generateScopedName = mode === 'production' ? '[hash:base64:4]' : '[local]_[hash:base64:4]';
    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
        envDir: './env/',
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName: generateScopedName,
            },
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: "@use \"@/styles/abstracts\" as *;",
                },
            },
        },
    });
});
