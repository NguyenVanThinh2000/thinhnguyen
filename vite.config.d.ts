type ViteConfigInput = {
    mode: string;
    command: string;
};
declare const _default: ({ mode }: ViteConfigInput) => import("vite").UserConfig;
export default _default;
