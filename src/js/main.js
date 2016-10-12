import {D3TextList} from './lib/D3TextEs6';

let param_obj = {};
param_obj.el_container_id = 'el_message_list';

let text_list_obj = new D3TextList();

// default
text_list_obj.append_item();

//
param_obj.el_item_class = 'ok-value';
param_obj.el_item_text = 'd3 es6 is ok.';
text_list_obj.append_item(param_obj);

//
param_obj.el_item_class = 'w3-red';
param_obj.el_item_text = 'd3 es6 is not so good.';
text_list_obj.append_item(param_obj);

