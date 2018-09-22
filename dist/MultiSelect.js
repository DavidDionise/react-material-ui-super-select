'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var MultiSelect = function MultiSelect(props) {
  /**
   * @description - Helper in 'calculateTextFieldStyle'
   */
  var lastChipRowWidth = function lastChipRowWidth() {
    var chipElements = (0, _jquery2.default)('.' + props.classes.rmss_chip);
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
  };
  /**
   * @description - In the MultiSelect components, the text field width
   *  must change depending on the width of selected chips; this function
   *  helps determine the appropriate styling for the text input width
   */
  var calculateTextFieldStyle = function calculateTextFieldStyle() {
    var inputContainer = (0, _jquery2.default)('.' + props.classes.rmss_multi_input_container)[0];
    var inputValueContainer = (0, _jquery2.default)('.' + props.classes.rmss_multi_text_field_width_tracker)[0];
    if (!inputContainer || !inputValueContainer) {
      return { flex: '1' };
    }

    var _inputContainer$getBo = inputContainer.getBoundingClientRect(),
        inputContainerWidth = _inputContainer$getBo.width;

    var _inputValueContainer$ = inputValueContainer.getBoundingClientRect(),
        inputValueWidth = _inputValueContainer$.width;

    var lastRowWidth = lastChipRowWidth();
    if (inputValueWidth > inputContainerWidth - lastRowWidth - 60) {
      return { width: inputContainerWidth + 'px' };
    } else {
      return { flex: 1 };
    }
  };

  return _react2.default.createElement(
    _SelectContainer2.default,
    _extends({
      multi: true,
      creatable: props.creatable,
      calculateTextFieldStyle: calculateTextFieldStyle
    }, _lodash2.default.pick(props, ['options', 'containerClassName', 'handleChange', 'handleCreate', 'stayOpenAfterSelection', 'selectedValue', 'handleClearValue', 'loading', 'handleInputChange', 'manual'])),
    function (_ref) {
      var getFilteredOptions = _ref.getFilteredOptions,
          handleInputChange = _ref.handleInputChange,
          handleClearValue = _ref.handleClearValue,
          handleKeyDown = _ref.handleKeyDown,
          handleChange = _ref.handleChange,
          handleClickTextInput = _ref.handleClickTextInput,
          onClickAway = _ref.onClickAway,
          handleDeleteItem = _ref.handleDeleteItem,
          setFocusedOption = _ref.setFocusedOption,
          menuOpen = _ref.menuOpen,
          inputValue = _ref.inputValue,
          focusedOption = _ref.focusedOption,
          enteringText = _ref.enteringText,
          inputStyle = _ref.inputStyle;

      var _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;
      var _placeholder = !props.selectedValue ? props.placeholder : '';
      var showMUILabel = !props.hideLabel && (!props.selectedValue || props.selectedValue.length === 0) && props.label;
      var showManualLabel = !props.hideLabel && props.selectedValue && props.selectedValue.length > 0 && props.label;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        showManualLabel ? _react2.default.createElement(
          _InputLabel2.default,
          {
            shrink: true,
            focused: enteringText || _menuOpen
          },
          props.label
        ) : null,
        _react2.default.createElement(
          'div',
          { className: props.classes.rmss_multi_input_container },
          (props.selectedValue || []).filter(function (item) {
            return props.options.find(function (opt) {
              return opt.id == item.id;
            });
          }).map(function (item) {
            return _react2.default.createElement(_Chip2.default, {
              id: item.id,
              key: item.id,
              label: item.label,
              onDelete: props.disabled ? undefined : function () {
                return handleDeleteItem(item);
              },
              className: props.classes.rmss_chip
            });
          }),
          _react2.default.createElement(
            'div',
            {
              className: props.classes.rmss_input_and_label_container,
              style: inputStyle
            },
            _react2.default.createElement(_TextField2.default, {
              fullWidth: true,
              disabled: props.disabled,
              onChange: handleInputChange,
              onClick: handleClickTextInput,
              label: showMUILabel ? props.label : undefined,
              value: props.selectedValue && !enteringText ? '' : inputValue,
              onKeyDown: handleKeyDown,
              placeholder: _placeholder,
              InputProps: {
                endAdornment: _react2.default.createElement(
                  _InputAdornment2.default,
                  {
                    position: 'end',
                    classes: { root: props.classes.rmss_global_input_adornment_container }
                  },
                  props.loading ? _react2.default.createElement(_CircularProgress2.default, { size: 20 }) : props.selectedValue && props.selectedValue.length > 0 ? _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: handleClearValue },
                    _react2.default.createElement(_Close2.default, null)
                  ) : _react2.default.createElement('div', null)
                )
              }
            }),
            _react2.default.createElement(
              'div',
              { className: props.classes.rmss_multi_text_field_width_tracker },
              inputValue
            )
          )
        ),
        _react2.default.createElement(_SelectMenu2.default, {
          multi: true,
          open: _menuOpen,
          options: getFilteredOptions(inputValue),
          onClickAway: onClickAway,
          handleChange: handleChange,
          handleMouseEnterOption: setFocusedOption,
          selectedValue: props.selectedValue,
          focusedOption: focusedOption
        })
      );
    }
  );
};

MultiSelect.propTypes = _extends({}, _Select2.default.propTypes, {
  creatable: _propTypes2.default.bool,
  handleCreate: _propTypes2.default.func,
  selectedValue: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }))
});

MultiSelect.defaultProps = {
  handleCreate: function handleCreate() {},
  creatable: false
};

exports.default = (0, _withStyles2.default)(_Styles2.default)(MultiSelect);