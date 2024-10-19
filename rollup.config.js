const typescript = require("rollup-plugin-typescript2");
const pkg = require("./package.json");
const terser = require("@rollup/plugin-terser");
const json = require("@rollup/plugin-json");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const sass = require("rollup-plugin-sass");
const copy = require("rollup-plugin-copy");
module.exports = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        },
        {
            file: pkg.browser,
            format: "umd",
            sourcemap: true,
            name: 'ReactCountryStateCity',
            globals: {
                react: 'React', // Ensure React is correctly recognized as a global variable
              },
        }
    ],
    external: ['react'],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        sass({
            output: './dist/react-country-state-city.css',
            // Ensure the CSS output folder exists, or create it as part of your build process
        }),
        copy({
            targets: [
                { src: 'src/styles/fonts', dest: 'dist' }
            ]
        }),
        typescript({
            tsconfig: './tsconfig.json'
          }),
        json(),
        terser()
    ]
};
