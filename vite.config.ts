import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwind from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwind()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
