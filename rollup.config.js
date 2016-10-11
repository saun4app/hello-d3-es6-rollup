/*

import rollup_babel from 'rollup-plugin-babel';
import rollup_eslint from 'rollup-plugin-eslint';
import node_resolve from 'rollup-plugin-node-resolve';
import rollup_commonjs from 'rollup-plugin-commonjs';
import node_globals from 'rollup-plugin-node-globals'
import rollup_replace from 'rollup-plugin-replace';
import rollup_uglify from 'rollup-plugin-uglify';
*/

import * as config_base from './rollup_config_base.js';

let pkg = require('./package.json');
let npm_dependencies = Object.keys(pkg.dependencies);
// var js_src = '../hello-src/src/js';
// var js_src = '../hello-src/src/js';
// var js_src = 'src/js';
// var js_build = 'build/js';

let js_src = config_base.js_src;
let js_build = config_base.js_build;

let plugin_array = config_base.get_plugin_array();

const rollup_config_obj = {
    entry:  `${js_src}/main.js`,
    dest: `${js_build}/main.js`,
    format: 'iife',
    external: npm_dependencies,
    plugins: plugin_array
};

//
if (process.env.NODE_ENV === 'development') {
    rollup_config_obj.sourceMap = 'inline';

    rollup_config_obj.plugins.push(rollup_replace({
        'process.env.NODE_ENV': JSON.stringify('development')
    }))
}

if (process.env.NODE_ENV === 'production') {
    rollup_config_obj.sourceMap = false;
    rollup_config_obj.plugins.push(rollup_uglify());

    rollup_config_obj.plugins.push(rollup_replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    }))
}

export default rollup_config_obj;

////
/*
function get_plugin_array() {
    let plugin_array = [];

    plugin_array.push(node_resolve({
        jsnext: true,
        main: true,
        browser: true
    }));

    plugin_array.push(rollup_commonjs({
            include: [
                'node_modules/**'
            ]
        }
    ));

    plugin_array.push(node_globals());

    plugin_array.push(rollup_eslint({
        exclude: [
            'src/styles/**'
        ]
    }));

    plugin_array.push(rollup_json());

    plugin_array.push(rollup_babel({
        exclude: 'node_modules/**',
        presets: ['es2015-rollup']
    }));

    return plugin_array;
}
*/
/*
 rollup_config_obj.plugins.push(rollup_replace({
 exclude: 'node_modules/**',
 ENV: JSON.stringify(process.env.NODE_ENV || 'development')
 }));
 */