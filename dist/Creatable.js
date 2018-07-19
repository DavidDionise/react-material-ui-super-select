'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MultiSelect2 = require('./MultiSelect');

var _MultiSelect3 = _interopRequireDefault(_MultiSelect2);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RMSS_CREATABLE_VALUE = '___rmss_creatable_value___';

var Creatable = function (_MultiSelect) {
  _inherits(Creatable, _MultiSelect);

  function Creatable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Creatable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Creatable.__proto__ || Object.getPrototypeOf(Creatable)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 13:
          {
            event.preventDefault();
            if (_this.state.focusedOption) {
              // if creation is possible . . .
              if (_this.state.focusedOption.id == RMSS_CREATABLE_VALUE && !_this.props.options.find(function (opt) {
                return opt.value == _this.state.inputValue;
              })) {
                var new_option_props = {
                  id: _this.state.inputValue,
                  label: _this.state.inputValue
                };
                _this.props.onCreate(new_option_props);
                _this.handleSelectOption(new_option_props);
              } else {
                _this.handleSelectOption(_this.state.focusedOption);
              }
            }
            break;
          }
        default:
          {
            _MultiSelect3.default.prototype.handleKeyDown.call(_this, event);
          }
      }
    }, _this.getFilteredOptions = function (inputValue) {
      var filtered_options = _MultiSelect3.default.prototype.getFilteredOptions.call(_this, inputValue);
      var matched_option = _this.props.options.find(function (opt) {
        return new RegExp('^' + (inputValue || '') + '$', 'i').test(opt.id) || new RegExp('^' + (inputValue || '') + '$', 'i').test(opt.label);
      });
      // if the input doesn't match one of the options, AND creation
      //  is not already enabled, enable creation
      if (inputValue && !matched_option && !((filtered_options[0] || {}).id == RMSS_CREATABLE_VALUE)) {
        return [{ id: RMSS_CREATABLE_VALUE, label: 'Create "' + inputValue + '"' }].concat(_toConsumableArray(filtered_options));
      } else {
        return filtered_options;
      }
    }, _this.generateInputContainer = function () {
      return _MultiSelect3.default.prototype.generateInputContainer.call(_this);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Creatable, [{
    key: 'render',
    value: function render() {
      return _MultiSelect3.default.prototype.render.call(this);
    }
  }]);

  return Creatable;
}(_MultiSelect3.default);

Creatable.propTypes = _extends({}, _MultiSelect3.default.propTypes, {
  onCreate: _propTypes2.default.func.isRequired
});

Creatable.defaultProps = _extends({}, _MultiSelect3.default.defaultProps);

exports.default = Creatable;