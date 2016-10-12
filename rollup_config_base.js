import node_globals from 'rollup-plugin-node-globals'
import node_resolve from 'rollup-plugin-node-resolve';
import rollup_babel from 'rollup-plugin-babel';
import rollup_eslint from 'rollup-plugin-eslint';
import rollup_commonjs from 'rollup-plugin-commonjs';
import rollup_json from 'rollup-plugin-json';
import rollup_replace from 'rollup-plugin-replace';
import rollup_uglify from 'rollup-plugin-uglify';

export var build_path = 'build';
export var hello_src = 'src';
export var js_src = [hello_src, 'js'].join('/');
export var js_build = 'build/js';

export var style_src = [hello_src, 'styles', '**'].join('/');

export function get_plugin_array() {
    let plugin_array = [];

    plugin_array.push(node_resolve({
        jsnext: true,
        main: true,
        browser: true
    }));

    plugin_array.push(rollup_commonjs({include: ['node_modules/**']}));

    plugin_array.push(node_globals());

    plugin_array.push(rollup_eslint({exclude: [style_src]}));

    plugin_array.push(rollup_json());

    plugin_array.push(rollup_babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup']
    }));

    return plugin_array;
}