(function (d3) {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var D3TextList = function () {
    function D3TextList() {
        var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, D3TextList);

        this.set_value(param_obj);

        return this;
    }

    createClass(D3TextList, [{
        key: 'append_item',
        value: function append_item() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var self = this;

            try {
                this.set_value(param_obj);

                this.el_list.append('li').attr('class', self.el_item_class).text(self.el_item_text);
            } catch (error) {
                console.error('D3TextList::append_text() ' + error);
            }

            return this;
        }
    }, {
        key: 'set_value',
        value: function set_value() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.el_container_id = param_obj.el_container_id ? param_obj.el_container_id : 'el_message_list';
            this.el_list_class = param_obj.el_list_class ? param_obj.el_list_class : 'w3-ul w3-border';
            this.el_item_class = param_obj.el_item_class ? param_obj.el_item_class : 'good-value';
            this.el_item_text = param_obj.el_item_text ? param_obj.el_item_text : 'd3 es6 is good.';

            this._set_el_list();

            return this;
        }
    }, {
        key: '_set_el_list',
        value: function _set_el_list() {
            var self = this;

            if (!this.el_list) {
                var container_id = '#' + this.el_container_id;
                d3.select(container_id).selectAll('*').remove();

                this.el_list = d3.select(container_id).append('ul').attr('class', self.el_list_class);
            }
        }
    }]);
    return D3TextList;
}();

var param_obj = {};
param_obj.el_container_id = 'el_message_list';

var text_list_obj = new D3TextList();

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

}(d3));
