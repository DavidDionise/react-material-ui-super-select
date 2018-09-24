'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _SelectContainer = require('./SelectContainer');

var _SelectContainer2 = _interopRequireDefault(_SelectContainer);

var _SelectMenu = require('./SelectMenu');

var _SelectMenu2 = _interopRequireDefault(_SelectMenu);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function Select(props) {
  return _react2.default.createElement(
    _SelectContainer2.default,
    _lodash2.default.pick(props, ['options', 'containerClassName', 'handleChange', 'stayOpenAfterSelection', 'selectedValue', 'handleClearValue', 'loading', 'handleInputChange', 'manual', 'disabled']),
    function (_ref) {
      var getFilteredOptions = _ref.getFilteredOptions,
          handleInputChange = _ref.handleInputChange,
          handleClearValue = _ref.handleClearValue,
          handleKeyDown = _ref.handleKeyDown,
          handleChange = _ref.handleChange,
          handleClickTextInput = _ref.handleClickTextInput,
          onClickAway = _ref.onClickAway,
          setFocusedOption = _ref.setFocusedOption,
          menuOpen = _ref.menuOpen,
          inputValue = _ref.inputValue,
          focusedOption = _ref.focusedOption,
          enteringText = _ref.enteringText;

      var _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;
      var _placeholder = !props.selectedValue ? props.placeholder : '';
      var showMUILabel = !props.hideLabel && !props.selectedValue && props.label;
      var showManualLabel = !props.hideLabel && props.selectedValue && props.label;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: props.classes.rmss_input_container },
          _react2.default.createElement(
            'div',
            { className: props.classes.rmss_selected_value_container },
            enteringText && inputValue ? null : props.selectedValue ? _react2.default.createElement(
              'p',
              null,
              props.selectedValue.label
            ) : null
          ),
          _react2.default.createElement(
            'div',
            { className: props.classes.rmss_input_and_label_container },
            showManualLabel ? _react2.default.createElement(
              _InputLabel2.default,
              {
                shrink: true,
                focused: enteringText || _menuOpen
              },
              props.label
            ) : null,
            _react2.default.createElement(_TextField2.default, {
              fullWidth: true,
              disabled: props.disabled,
              onChange: handleInputChange,
              onClick: handleClickTextInput,
              value: props.selectedValue && !enteringText ? '' : inputValue,
              onKeyDown: handleKeyDown,
              label: showMUILabel ? props.label : undefined,
              placeholder: _placeholder,
              InputProps: {
                endAdornment: _react2.default.createElement(
                  _InputAdornment2.default,
                  {
                    position: 'end',
                    classes: { root: props.classes.rmss_global_input_adornment_container }
                  },
                  props.loading ? _react2.default.createElement(_CircularProgress2.default, { size: 20 }) : props.selectedValue ? _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: handleClearValue },
                    _react2.default.createElement(_Close2.default, {
                      classes: { root: props.classes.rmss_global_input_end_adornement_container + ' close-button' }
                    })
                  ) : props.showSearchIcon ? _react2.default.createElement(_Search2.default, {
                    classes: { root: props.classes.rmss_global_input_end_adornement_container }
                  }) : _react2.default.createElement('div', null)
                )
              }
            })
          )
        ),
        _react2.default.createElement(_SelectMenu2.default, {
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

Select.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  })).isRequired,
  selectedValue: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }),
  containerClassName: _propTypes2.default.string,
  handleChange: _propTypes2.default.func.isRequired,
  handleInputChange: _propTypes2.default.func,
  handleClearValue: _propTypes2.default.func,
  MenuItem: _propTypes2.default.node,
  stayOpenAfterSelection: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  label: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  manual: _propTypes2.default.bool,
  hideLabel: _propTypes2.default.bool,
  showSearchIcon: _propTypes2.default.bool
};

Select.defaultProps = {
  containerClassName: '',
  handleInputChange: function handleInputChange() {},
  handleClearValue: function handleClearValue() {},
  MenuItem: null,
  stayOpenAfterSelection: false,
  selectedValue: null,
  label: '',
  loading: false,
  disabled: false,
  manual: false,
  hideLabel: false,
  showSearchIcon: true
};

exports.default = (0, _withStyles2.default)(_Styles2.default)(Select);