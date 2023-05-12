import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sass from "rollup-plugin-sass";
export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: true
        },
        {
            file: pkg.browser,
            format: "umd",
            sourcemap: true,
            name: 'ReactCountryStateCity'
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        sass({ output: './dist/react-country-state-city.css' }),
        json(),
        terser()
    ]
};