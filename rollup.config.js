const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

const typescript = require('rollup-plugin-typescript2')

const trackingPackage = require('./package.json')

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: trackingPackage.main,
            format: 'cjs',
            exports: 'auto',
            sourcemap: true,
            interop: 'auto'
        },
        {
            file: trackingPackage.module,
            format: 'es',
            exports: 'auto',
            sourcemap: true,
            interop: 'auto'
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            clean: true,
            rollupCommonJSResolveHack: false
        }),
        babel()
    ]
}