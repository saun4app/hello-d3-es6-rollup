import {D3Text} from './lib/D3TextEs6';

// default
let good_obj = new D3Text();
good_obj.show_text();

// passing parameters
let param_obj = {};
param_obj.tag_id = 'el_ok_message';
param_obj.class_str = 'ok-value';
param_obj.result_text = 'd3 es6 is ok.';

let ok_obj = new D3Text();
ok_obj.show_text(param_obj);

