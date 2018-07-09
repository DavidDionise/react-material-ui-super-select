var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Select from './Select.jsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import $ from 'jquery';
import _ from 'lodash';

var MultiSelect = function (_Select) {
  _inherits(MultiSelect, _Select);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.handleDeleteItem = function (item) {
      if (_this.props.selected_value.length == 1) {
        _this.props.handleChange(null);
      } else {
        _this.props.handleChange(_this.props.selected_value.filter(function (v) {
          return v.id != item.id;
        }));
      }
    };

    _this.generateInputContainer = function () {
      return React.createElement(
        'div',
        { className: _this.props.classes.rmss_multi_input_container },
        (_this.props.selected_value || []).filter(function (item) {
          return _this.props.options.find(function (opt) {
            return opt.id == item.id;
          });
        }).map(function (item) {
          return React.createElement(Chip, {
            key: item.id,
            label: item.label,
            onDelete: function onDelete() {
              return _this.handleDeleteItem(item);
            },
            className: _this.props.classes.rmss_chip
          });
        }),
        React.createElement(TextField, {
          fullWidth: true,
          disabled: _this.props.loading,
          onChange: _this.handleInputChange,
          onClick: function onClick() {
            return _this.setState({ menu_open: true });
          },
          value: _this.state.entering_text ? _this.state.input_value : '',
          onKeyDown: _this.handleKeyDown,
          onFocus: _this.handleTextFocus,
          onBlur: function onBlur() {
            return _this.setState({ entering_text: false });
          },
          placeholder: _this.props.selected_value ? '' : _this.props.placeholder,
          inputProps: { style: { paddingRight: '30px' } }
        })
      );
    };

    _this.getFilteredOptions = _this.getFilteredOptions.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleSelectOption = _this.handleSelectOption.bind(_this);

    _this.text_field_area;
    _this.select_area;
    _this.input_area_tracker;
    return _this;
  }

  _createClass(MultiSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var classes = this.props.classes;

      this.select_area = $('.' + classes.rmss_multi_selected_value_container)[0];
      this.text_field_area = $('.' + classes.rmss_multi_text_field_root)[0];
      this.input_area_tracker = $('.' + classes.rmss_multi_input_width_tracker)[0];
      this.container_width = ($('.' + classes.rmss_multi_input_container)[0] || {}).clientWidth;
    }
  }, {
    key: 'getFilteredOptions',
    value: function getFilteredOptions(input_value) {
      return _.differenceWith(Select.prototype.getFilteredOptions.call(this, input_value), this.props.selected_value || [], function (item1, item2) {
        return item1.id == item2.id;
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      switch (event.keyCode) {
        // Enter
        case 13:
          {
            if (this.state.focused_option) {
              event.preventDefault();
              this.handleSelectOption(this.state.focused_option);
            }
            break;
          }
        // Back Space
        // Delete
        case 8:
        case 46:
          {
            if (this.state.input_value.length == 0 && this.props.selected_value && this.props.selected_value.length > 0) {
              this.handleDeleteItem(this.props.selected_value[this.props.selected_value.length - 1]);
            }
            break;
          }
        default:
          {
            Select.prototype.handleKeyDown.call(this, event);
          }
      }
    }
  }, {
    key: 'handleSelectOption',
    value: function handleSelectOption(option) {
      Select.prototype.handleSelectOption.call(this, [].concat(_toConsumableArray(this.props.selected_value || []), [option]));
    }
  }, {
    key: 'render',
    value: function render() {
      return Select.prototype.render.call(this);
    }
  }]);

  return MultiSelect;
}(Select);

MultiSelect.propTypes = _extends({}, Select.propTypes, {
  selected_value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }))
});

MultiSelect.defaultProps = _extends({}, Select.defaultProps, {
  selected_value: null
});

export default MultiSelect;