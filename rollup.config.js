import * as config_base from './rollup_config_base.js';

let pkg = require('./package.json');
let npm_dependencies = Object.keys(pkg.dependencies);

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