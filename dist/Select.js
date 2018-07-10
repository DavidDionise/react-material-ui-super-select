'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Grow = require('@material-ui/core/Grow');

var _Grow2 = _interopRequireDefault(_Grow);

var _ClickAwayListener = require('@material-ui/core/ClickAwayListener');

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuList = require('@material-ui/core/MenuList');

var _MenuList2 = _interopRequireDefault(_MenuList);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require('@material-ui/icons/Close');

var _Close2 = _interopRequireDefault(_Close);

var _CircularProgress = require('@material-ui/core/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.focusOption = function (focused_option, key_code) {
      _this.setState({ focused_option: focused_option });

      var focused_element = (0, _jquery2.default)('#rmss-menu-item-' + focused_option.id)[0];
      var menu_container_element = (0, _jquery2.default)('.' + _this.props.classes.rmss_global_menu_paper_container)[0];
      var menu_list_element = (0, _jquery2.default)('#rmss-menu-list')[0];
      var menu_container_height = menu_container_element.clientHeight,
          menu_container_scroll_top = menu_container_element.scrollTop;
      var focused_element_height = focused_element.scrollHeight,
          focused_element_offset = focused_element.offsetTop;
      var menu_list_height = menu_list_element.clientHeight;

      var filtered_options = _this.getFilteredOptions(_this.state.input_value);
      var focused_element_idx = filtered_options.findIndex(function (e) {
        return e.id == focused_option.id;
      });
      var new_scroll_height = void 0;
      if (key_code == 38) {
        // Arrow up
        if (focused_element_idx == filtered_options.length - 1) {
          new_scroll_height = menu_list_height;
        } else if (focused_element_offset <= menu_container_scroll_top) {
          new_scroll_height = focused_element_offset;
        }
      } else if (key_code == 40) {
        // Arrow down
        if (focused_element_idx == 0) {
          new_scroll_height = 0;
        } else if (menu_container_height + menu_container_scroll_top <= focused_element_height + focused_element_offset) {
          new_scroll_height = focused_element_offset - (menu_container_height - focused_element_height);
        }
      } else {
        console.warn('Calling \'focusOption\' with a keyCode that is neither arrow up or arrow down.');
      }

      if (new_scroll_height !== undefined) {
        // prevents UI flicker
        setTimeout(function () {
          (0, _jquery2.default)(menu_container_element).scrollTop(new_scroll_height);
        }, 100);
      }
    };

    _this.handleTextFocus = function () {
      if (_this.state.input_value.length > 0) {
        _this.setState({
          entering_text: true,
          menu_open: true
        });
      } else {
        _this.setState({ menu_open: true });
      }
    };

    _this.generateInputContainer = function () {
      return _react2.default.createElement(
        'div',
        { className: _this.props.classes.rmss_input_container },
        _react2.default.createElement(
          'div',
          { className: _this.props.classes.rmss_selected_value_container },
          _this.state.entering_text && _this.state.input_value ? null : _this.props.selected_value ? _react2.default.createElement(
            'p',
            null,
            _this.props.selected_value.label
          ) : null
        ),
        _react2.default.createElement(_TextField2.default, {
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
          InputProps: {
            endAdornment: _react2.default.createElement(
              _InputAdornment2.default,
              { position: 'end' },
              _react2.default.createElement(
                _IconButton2.default,
                { onClick: _this.handleClearValue },
                _this.props.loading ? _react2.default.createElement(_CircularProgress2.default, { size: 20 }) : _react2.default.createElement(_Close2.default, null)
              )
            )
          }
        })
      );
    };

    _this.state = {
      focused_option: null,
      input_value: '',
      menu_open: false,
      entering_text: false,
      // multi select
      input_style: { flex: '1' }
    };

    _this.getFilteredOptions = _this.getFilteredOptions.bind(_this);
    _this.handleSelectOption = _this.handleSelectOption.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.handleClearValue = _this.handleClearValue.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ focused_option: this.props.options[0] });
    }
  }, {
    key: 'getFilteredOptions',
    value: function getFilteredOptions(input_value) {
      if (input_value) {
        return this.props.options.filter(function (opt) {
          return new RegExp(input_value, 'i').test(opt.id) || new RegExp(input_value, 'i').test(opt.label);
        });
      } else {
        return this.props.options;
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var options = this.getFilteredOptions(event.target.value);
      if (event.target.value) {
        this.setState({
          input_value: event.target.value,
          focused_option: options[0],
          entering_text: true,
          menu_open: true
        });
      } else {
        this.setState({
          input_value: '',
          focused_option: options[0],
          entering_text: false
        });
      }
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      var _this2 = this;

      switch (event.keyCode) {
        // Enter
        case 13:
          {
            if (this.state.focused_option) {
              this.handleSelectOption(this.state.focused_option);
            }
            break;
          }
        // Escape
        case 27:
          {
            this.setState({
              menu_open: false,
              focused_option: null
            });
            break;
          }
        // Arrow Down
        case 40:
          {
            var filtered_options = this.getFilteredOptions(this.state.input_value);
            var next_focused_option = this.state.focused_option ? filtered_options.reduce(function (acc, opt, idx, options) {
              if (opt.id == _this2.state.focused_option.id) {
                acc = options[idx + 1] || options[0];
              }
              return acc;
            }, null) : filtered_options[0];

            this.focusOption(next_focused_option, event.keyCode);
            break;
          }
        // Arrow Up
        case 38:
          {
            var _filtered_options = this.getFilteredOptions(this.state.input_value);
            var _next_focused_option = this.state.focused_option ? _filtered_options.reduce(function (acc, opt, idx, options) {
              if (opt.id == _this2.state.focused_option.id) {
                acc = options[idx - 1] || options[options.length - 1];
              }
              return acc;
            }, null) : _filtered_options[_filtered_options.length - 1];

            this.focusOption(_next_focused_option, event.keyCode);
            break;
          }
      }
    }
  }, {
    key: 'handleClearValue',
    value: function handleClearValue() {
      this.props.handleClearValue();
    }
  }, {
    key: 'handleSelectOption',
    value: function handleSelectOption(option) {
      this.setState({
        menu_open: this.props.stay_open_after_selection !== null,
        focused_option: null,
        input_value: ''
      });

      this.props.handleChange(option);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var classes = this.props.classes;

      var menu_open = this.state.menu_open && this.getFilteredOptions(this.state.input_value).length != 0;

      return _react2.default.createElement(
        'div',
        { className: classes.classes.rmss_global_container + ' ' + this.props.container_class_name },
        this.generateInputContainer(),
        _react2.default.createElement(
          'div',
          { className: classes.rmss_global_menu_container },
          _react2.default.createElement(
            _Grow2.default,
            { 'in': menu_open > 0 },
            menu_open > 0 ? // prevents UI flicker
            _react2.default.createElement(
              _ClickAwayListener2.default,
              {
                onClickAway: this.state.menu_open ? function () {
                  return _this3.setState({ menu_open: false });
                } : function () {},
                className: 'select-click-away-listener'
              },
              _react2.default.createElement(
                _Paper2.default,
                { classes: { root: classes.rmss_global_menu_paper_container } },
                _react2.default.createElement(
                  _MenuList2.default,
                  { id: 'rmss-menu-list' },
                  this.getFilteredOptions(this.state.input_value).map(function (opt) {
                    var selected = opt.id == (_this3.props.selected_value || {}).id;
                    var focused = opt.id == (_this3.state.focused_option || {}).id;

                    return _this3.props.menuItemRenderer ? _this3.props.menuItemRenderer(opt) : _react2.default.createElement(
                      _MenuItem2.default,
                      {
                        key: opt.id,
                        id: 'rmss-menu-item-' + opt.id,
                        onClick: function onClick() {
                          return _this3.handleSelectOption(opt);
                        },
                        onMouseEnter: function onMouseEnter() {
                          return _this3.setState({ focused_option: opt });
                        },
                        className: classes.rmss_global_menu_item + ' ' + (selected && !focused ? 'selected' : focused ? 'focused' : '')
                      },
                      _this3.props.menuItemRenderer ? _this3.props.menuItemRenderer(opt) : opt.label
                    );
                  })
                )
              )
            ) : _react2.default.createElement('div', null)
          )
        )
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

Select.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  })).isRequired,
  container_class_name: _propTypes2.default.string,
  handleChange: _propTypes2.default.func.isRequired,
  textFieldRenderer: _propTypes2.default.func,
  menuItemRenderer: _propTypes2.default.func,
  stay_open_after_selection: _propTypes2.default.bool,
  selected_value: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  }),
  placeholder: _propTypes2.default.string,
  handleClearValue: _propTypes2.default.func,
  loading: _propTypes2.default.bool
};

Select.defaultProps = {
  textFieldRenderer: null,
  menuItemRenderer: null,
  stay_open_after_selection: false,
  selected_value: null,
  placeholder: 'Select ...',
  handleClearValue: function handleClearValue() {},
  loading: false,
  container_class_name: ''
};

exports.default = Select;