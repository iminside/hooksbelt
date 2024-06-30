import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import autoExternal from 'rollup-plugin-auto-external'
import commonjs from '@rollup/plugin-commonjs'
import clear from 'rollup-plugin-delete'
import pkg from './package.json'

const extensions = ['.ts', '.tsx']

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [
			autoExternal(),
			commonjs(),
			resolve({
				extensions,
			}),
			babel({
				extensions,
				babelHelpers: 'bundled',
			}),
			clear({
				targets: 'dist/*',
				runOnce: true,
			}),
		],
	},
]
