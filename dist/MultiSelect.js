'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select2 = require('./Select');

var _Select3 = _interopRequireDefault(_Select2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = function (_Select) {
  _inherits(MultiSelect, _Select);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.handleInputChange = function (event) {
      _Select3.default.prototype.handleInputChange.call(_this, event);
    };

    _this.handleClearValue = function () {
      _Select3.default.prototype.handleClearValue.call(_this);
    };

    _this.handleDeleteItem = function (item) {
      if (_this.props.selectedValue.length == 1) {
        _this.props.handleChange(null);
      } else {
        _this.props.handleChange(_this.props.selectedValue.filter(function (v) {
          return v.id != item.id;
        }));
      }
    };

    _this.lastChipRowWidth = function () {
      var chip_elements = (0, _jquery2.default)('.' + _this.props.classes.rmss_chip);
      if (chip_elements.length == 0) {
        return 0;
      }

      var last_row_height = Array.from(chip_elements).reduce(function (acc, chip) {
        var chip_offset = chip.offsetTop;

        if (chip_offset >= acc) {
          acc = chip_offset;
        }
        return acc;
      }, 0);

      var last_row_width = Array.from(chip_elements).filter(function (chip) {
        return chip.offsetTop == last_row_height;
      }).reduce(function (acc, chip) {
        var _window$getComputedSt = window.getComputedStyle(chip),
            marginRight = _window$getComputedSt.marginRight,
            marginLeft = _window$getComputedSt.marginLeft;

        var _chip$getBoundingClie = chip.getBoundingClientRect(),
            chip_width = _chip$getBoundingClie.width;

        acc += Math.ceil(chip_width) + parseFloat(marginRight) + parseFloat(marginLeft);
        return acc;
      }, 0);

      return last_row_width;
    };

    _this.calculateTextFieldStyle = function () {
      var input_container = (0, _jquery2.default)('.' + _this.props.classes.rmss_multi_input_container)[0];
      var inputValue_container = (0, _jquery2.default)('.' + _this.props.classes.rmss_multi_text_field_width_tracker)[0];
      if (!input_container || !inputValue_container) {
        return { flex: '1' };
      }

      var _input_container$getB = input_container.getBoundingClientRect(),
          input_container_width = _input_container$getB.width;

      var _inputValue_container = inputValue_container.getBoundingClientRect(),
          inputValue_width = _inputValue_container.width;

      var last_row_width = _this.lastChipRowWidth();

      if (inputValue_width > input_container_width - last_row_width - 60) {
        return { width: input_container_width + 'px' };
      } else {
        return { flex: 1 };
      }
    };

    _this.getFilteredOptions = _this.getFilteredOptions.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleSelectOption = _this.handleSelectOption.bind(_this);
    _this.generateInputContainer = _this.generateInputContainer.bind(_this);
    return _this;
  }

  _createClass(MultiSelect, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var updated_style = this.calculateTextFieldStyle();
      if (!_lodash2.default.isEqual(updated_style, this.state.inputStyle)) {
        this.setState({ inputStyle: updated_style });
      }
    }
  }, {
    key: 'getFilteredOptions',
    value: function getFilteredOptions(inputValue) {
      return _lodash2.default.differenceWith(_Select3.default.prototype.getFilteredOptions.call(this, inputValue), this.props.selectedValue || [], function (item1, item2) {
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
            if (this.state.focusedOption) {
              event.preventDefault();
              this.handleSelectOption(this.state.focusedOption);
            }
            break;
          }
        // Back Space
        // Delete
        case 8:
        case 46:
          {
            if (this.state.inputValue.length == 0 && this.props.selectedValue && this.props.selectedValue.length > 0) {
              this.handleDeleteItem(this.props.selectedValue[this.props.selectedValue.length - 1]);
            }
            break;
          }
        default:
          {
            _Select3.default.prototype.handleKeyDown.call(this, event);
          }
      }
    }
  }, {
    key: 'handleSelectOption',
    value: function handleSelectOption(option) {
      _Select3.default.prototype.handleSelectOption.call(this, [].concat(_toConsumableArray(this.props.selectedValue || []), [option]));
    }
  }, {
    key: 'generateInputContainer',
    value: function generateInputContainer() {
      var _this2 = this;

      var classes = this.props.classes;

      var label = void 0;
      if (!this.state.enteringText && (this.props.selectedValue || []).length == 0) {
        label = this.props.label;
      } else {
        label = ' ';
      }

      return _react2.default.createElement(
        'div',
        { className: classes.rmss_multi_input_container },
        (this.props.selectedValue || []).filter(function (item) {
          return _this2.props.options.find(function (opt) {
            return opt.id == item.id;
          });
        }).map(function (item) {
          return _react2.default.createElement(_Chip2.default, {
            key: item.id,
            label: item.label,
            onDelete: _this2.props.disabled ? undefined : function () {
              return _this2.handleDeleteItem(item);
            },
            className: classes.rmss_chip
          });
        }),
        _react2.default.createElement(
          'div',
          { style: this.state.inputStyle },
          _react2.default.createElement(_TextField2.default, {
            fullWidth: true,
            disabled: this.props.disabled,
            onChange: this.handleInputChange,
            onClick: this.props.disabled ? function () {} : function () {
              return _this2.setState({ menuOpen: true });
            },
            value: this.state.enteringText ? this.state.inputValue : '',
            onKeyDown: this.handleKeyDown,
            onFocus: this.props.disabled ? function () {} : this.handleTextFocus,
            onBlur: function onBlur() {
              return _this2.setState({ enteringText: false });
            },
            placeholder: this.props.selectedValue ? '' : this.props.placeholder,
            label: label,
            InputProps: {
              endAdornment: _react2.default.createElement(
                _InputAdornment2.default,
                { position: 'end' },
                this.props.loading ? _react2.default.createElement(_CircularProgress2.default, { size: 20 }) : _react2.default.createElement(
                  _IconButton2.default,
                  { onClick: this.handleClearValue },
                  _react2.default.createElement(_Close2.default, {
                    style: { visibility: this.props.selectedValue ? 'visible' : 'hidden' },
                    size: 15
                  })
                )
              )
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: classes.rmss_multi_text_field_width_tracker },
          this.state.inputValue
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _Select3.default.prototype.render.call(this);
    }
  }]);

  return MultiSelect;
}(_Select3.default);

MultiSelect.propTypes = _extends({}, _Select3.default.propTypes, {
  selectedValue: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }))
});

MultiSelect.defaultProps = _extends({}, _Select3.default.defaultProps, {
  selectedValue: null
});

exports.default = MultiSelect;