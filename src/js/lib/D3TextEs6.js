import * as d3 from 'd3';

export class D3Text {
    constructor(param_obj = {}) {
        this.tag_id = param_obj.tag_id ? param_obj.tag_id : 'el_good_message';
        this.class_str = param_obj.class_str ? param_obj.class_str : 'good-value';
    }

    show_text(param_obj = {}) {
        let tag_id = param_obj.tag_id ? param_obj.tag_id : this.tag_id;
        let result_text = param_obj.result_text ? param_obj.result_text : 'd3 es6 is good.';
        let class_str = param_obj.class_str ? param_obj.class_str : this.class_str;

        d3.select(`#${tag_id}`).selectAll('*').remove();

        d3.select(`#${tag_id}`)
            .append('span')
            .attr('class', class_str)
            .text(result_text);
    }
}