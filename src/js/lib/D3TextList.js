import * as d3 from 'd3';

export class D3TextList {
    constructor(param_obj = {}) {
        this.set_value(param_obj);

        return this;
    }

    append_item(param_obj = {}) {
        let self = this;

        try {
            this.set_value(param_obj);

            let el_item = this.el_list.append('li')
                .attr('class', self.el_item_class)
                .text(self.el_item_text);

            this._set_el_list_event();
        } catch (error) {
            console.error('D3TextList::append_text() ' + error);
        }

        return this;
    }

    set_value(param_obj = {}) {
        this.el_container_id = param_obj.el_container_id ? param_obj.el_container_id : 'el_message_list';
        this.el_list_class = param_obj.el_list_class ? param_obj.el_list_class : 'w3-ul w3-border';
        this.el_item_class = param_obj.el_item_class ? param_obj.el_item_class : 'good-value';
        this.el_mouseover_class = param_obj.el_mouseover_class ? param_obj.el_mouseover_class : 'w3-large';
        this.el_item_text = param_obj.el_item_text ? param_obj.el_item_text : 'd3 es6 is good.';

        this._set_el_list();

        return this;
    }

    _set_el_list_event() {
        let self = this;

        this.el_list.selectAll('li')
            .on('mouseover', function () {
                d3.select(this).classed(self.el_mouseover_class, true);
            }).on('mouseout', function () {
                d3.select(this).classed(self.el_mouseover_class, false);
            });
    }

    _set_el_list() {
        let self = this;

        if (!(this.el_list)) {
            let container_id = '#' + this.el_container_id;
            d3.select(container_id).selectAll('*').remove();

            this.el_list = d3.select(container_id)
                .append('ul')
                .attr('class', self.el_list_class);
        }
    }
}