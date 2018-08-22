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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Chip = require('@material-ui/core/Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _SelectContainer = require('./SelectContainer');

var _SelectContainer2 = _interopRequireDefault(_SelectContainer);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _SelectMenu = require('./SelectMenu');

var _SelectMenu2 = _interopRequireDefault(_SelectMenu);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = function (_React$Component) {
  _inherits(MultiSelect, _React$Component);

  function MultiSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MultiSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref, [this].concat(args))), _this), _this.chipInLastRow = function (chip) {
      var chipElements = (0, _jquery2.default)('.' + _this.props.classes.rmss_chip);
      if (chipElements.length == 0) {
        return 0;
      }

      var lastRowHeight = Array.from(chipElements).reduce(function (acc, chipElem) {
        var chipOffset = chipElem.offsetTop;

        if (chipOffset >= acc) {
          acc = chipOffset;
        }
        return acc;
      }, 0);

      return chip.offsetTop == lastRowHeight;
    }, _this.lastChipRowWidth = function () {
      var chipElements = (0, _jquery2.default)('.' + _this.props.classes.rmss_chip);
      if (chipElements.length == 0) {
        return 0;
      }

      var lastRowHeight = Array.from(chipElements).reduce(function (acc, chip) {
        var chipOffset = chip.offsetTop;

        if (chipOffset >= acc) {
          acc = chipOffset;
        }
        return acc;
      }, 0);

      var lastRowWidth = Array.from(chipElements).filter(function (chip) {
        return chip.offsetTop == lastRowHeight;
      }).reduce(function (acc, chip) {
        var _window$getComputedSt = window.getComputedStyle(chip),
            marginRight = _window$getComputedSt.marginRight,
            marginLeft = _window$getComputedSt.marginLeft;

        var _chip$getBoundingClie = chip.getBoundingClientRect(),
            chipWidth = _chip$getBoundingClie.width;

        acc += Math.ceil(chipWidth) + parseFloat(marginRight) + parseFloat(marginLeft);
        return acc;
      }, 0);

      return lastRowWidth;
    }, _this.calculateTextFieldStyle = function () {
      var inputContainer = (0, _jquery2.default)('.' + _this.props.classes.rmss_multi_input_container)[0];
      var inputValueContainer = (0, _jquery2.default)('.' + _this.props.classes.rmss_multi_text_field_width_tracker)[0];
      if (!inputContainer || !inputValueContainer) {
        return { flex: '1' };
      }

      var _inputContainer$getBo = inputContainer.getBoundingClientRect(),
          inputContainerWidth = _inputContainer$getBo.width;

      var _inputValueContainer$ = inputValueContainer.getBoundingClientRect(),
          inputValueWidth = _inputValueContainer$.width;

      var lastRowWidth = _this.lastChipRowWidth();
      if (inputValueWidth > inputContainerWidth - lastRowWidth - 60) {
        return { width: inputContainerWidth + 'px' };
      } else {
        return { flex: 1 };
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // componentDidUpdate() {
  //   const chipsList = $(`.${this.props.classes.rmss_chip}`);
  //   for (const chip of chipsList) {
  //     if (!this.chipInLastRow(chip)) {
  //       $(chip).css({ marginBottom: '4px' });
  //     } else {
  //       $(chip).css({ marginBottom: '0px' });
  //     }
  //   }
  // }
  /**
   * @description - Determines whether a chip is in the last row
   *  of selected chips. Needed so a margin can be added if-and-only-if
   *  the chip is not in the last row
   */

  /**
   * @description - Helper in 'calculateTextFieldStyle'
   */

  /**
   * @description - In the MultiSelect components, the text field width
   *  must change depending on the width of selected chips; this function
   *  helps determine the appropriate styling for the text input width
   */


  _createClass(MultiSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _SelectContainer2.default,
        _extends({
          multi: true,
          creatable: this.props.creatable,
          calculateTextFieldStyle: this.calculateTextFieldStyle
        }, _lodash2.default.pick(this.props, ['options', 'containerClassName', 'handleSelectOption', 'handleCreate', 'stayOpenAfterSelection', 'selectedValue', 'handleClearValue', 'loading', 'handleInputChange', 'manual'])),
        function (_ref2) {
          var getFilteredOptions = _ref2.getFilteredOptions,
              handleInputChange = _ref2.handleInputChange,
              handleClearValue = _ref2.handleClearValue,
              handleKeyDown = _ref2.handleKeyDown,
              handleSelectOption = _ref2.handleSelectOption,
              handleDeleteItem = _ref2.handleDeleteItem,
              toggleEnteringText = _ref2.toggleEnteringText,
              toggleMenuOpen = _ref2.toggleMenuOpen,
              setFocusedOption = _ref2.setFocusedOption,
              menuOpen = _ref2.menuOpen,
              inputValue = _ref2.inputValue,
              focusedOption = _ref2.focusedOption,
              enteringText = _ref2.enteringText,
              inputStyle = _ref2.inputStyle;

          var _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;

          return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            !_this2.props.hideLabel ? _react2.default.createElement(
              _InputLabel2.default,
              {
                shrink: true,
                focused: enteringText || _menuOpen
              },
              _this2.props.label
            ) : null,
            _react2.default.createElement(
              'div',
              { className: _this2.props.classes.rmss_multi_input_container },
              (_this2.props.selectedValue || []).filter(function (item) {
                return _this2.props.options.find(function (opt) {
                  return opt.id == item.id;
                });
              }).map(function (item) {
                return _react2.default.createElement(_Chip2.default, {
                  id: item.id,
                  key: item.id,
                  label: item.label,
                  onDelete: _this2.props.disabled ? undefined : function () {
                    return handleDeleteItem(item);
                  },
                  className: _this2.props.classes.rmss_chip
                });
              }),
              _react2.default.createElement(
                'div',
                {
                  className: _this2.props.classes.rmss_input_and_label_container,
                  style: inputStyle
                },
                _react2.default.createElement(_TextField2.default, {
                  fullWidth: true,
                  disabled: _this2.props.disabled,
                  onChange: handleInputChange,
                  onClick: function onClick() {
                    return _this2.props.disabled ? null : toggleMenuOpen(true);
                  },
                  onFocus: function onFocus() {
                    return _this2.props.disabled ? null : inputValue.length > 0 ? toggleEnteringText(true) : null;
                  },
                  value: _this2.props.selectedValue && !enteringText ? '' : inputValue,
                  onKeyDown: handleKeyDown,
                  onBlur: function onBlur() {
                    return toggleEnteringText(false);
                  },
                  placeholder: _this2.props.selectedValue ? '' : _this2.props.placeholder,
                  InputProps: {
                    endAdornment: _react2.default.createElement(
                      _InputAdornment2.default,
                      { position: 'end' },
                      _this2.props.loading ? _react2.default.createElement(_CircularProgress2.default, { size: 20 }) : _this2.props.selectedValue ? _react2.default.createElement(
                        _IconButton2.default,
                        { onClick: handleClearValue },
                        _react2.default.createElement(_Close2.default, null)
                      ) : _react2.default.createElement('div', null)
                    )
                  }
                }),
                _react2.default.createElement(
                  'div',
                  { className: _this2.props.classes.rmss_multi_text_field_width_tracker },
                  inputValue
                )
              )
            ),
            _react2.default.createElement(_SelectMenu2.default, {
              multi: true,
              open: _menuOpen,
              options: getFilteredOptions(inputValue),
              onClickAway: function onClickAway() {
                return _menuOpen ? toggleMenuOpen(false) : null;
              },
              handleSelectOption: handleSelectOption,
              handleMouseEnterOption: setFocusedOption,
              selectedValue: _this2.props.selectedValue,
              focusedOption: focusedOption
            })
          );
        }
      );
    }
  }]);

  return MultiSelect;
}(_react2.default.Component);

MultiSelect.propTypes = _extends({}, _Select2.default.propTypes, {
  creatable: _propTypes2.default.bool,
  selectedValue: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }))
});

MultiSelect.defaultProps = {
  creatable: false
};

exports.default = (0, _withStyles2.default)(_Styles2.default)(MultiSelect);