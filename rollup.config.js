import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    format: 'umd',
    plugins: [ babel() ],
    dest: 'dist/baze-validate.js'
};