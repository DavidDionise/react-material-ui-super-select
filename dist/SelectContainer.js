'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _SelectContainer$defa;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RMSS_CREATABLE_VALUE = '__RMSS_CREATABLE_VALUE__';

var SelectContainer = (_dec = (0, _withStyles2.default)(_Styles2.default), _dec(_class = function (_React$Component) {
  _inherits(SelectContainer, _React$Component);

  function SelectContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectContainer.__proto__ || Object.getPrototypeOf(SelectContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focusedOption: null,
      inputValue: '',
      inputFocused: false,
      menuOpen: false,
      enteringText: false,
      // multi select
      inputStyle: { flex: '1' }
    }, _this.containerRef = _react2.default.createRef(), _this.getFilteredOptions = function (inputValue) {
      var baseFilteredOptions = !_this.props.manual && inputValue ? _this.props.options.filter(function (opt) {
        return new RegExp(inputValue, 'i').test(opt.id) || new RegExp(inputValue, 'i').test(opt.label);
      }) : _this.props.options;

      var multiFilteredOptions = _.differenceWith(baseFilteredOptions, _this.props.selectedValue || [], function (item1, item2) {
        return item1.id == item2.id;
      });

      if (_this.props.creatable) {
        var matchedOption = _this.props.options.find(function (opt) {
          return new RegExp('^' + (inputValue || '') + '$', 'i').test(opt.id) || new RegExp('^' + (inputValue || '') + '$', 'i').test(opt.label);
        });
        // if the input doesn't match one of the options, AND creation
        //  is not already enabled, enable creation
        if (inputValue && !matchedOption && !((multiFilteredOptions[0] || {}).id == RMSS_CREATABLE_VALUE)) {
          return [{ id: RMSS_CREATABLE_VALUE, label: 'Create "' + inputValue + '"' }].concat(_toConsumableArray(multiFilteredOptions));
        } else {
          return multiFilteredOptions;
        }
      } else if (_this.props.multi) {
        return multiFilteredOptions;
      }

      return baseFilteredOptions;
    }, _this.handleInputChange = function (event) {
      var _ref2 = event && event.target || {},
          value = _ref2.value;

      var options = _this.getFilteredOptions(value);
      var inputValue = void 0;
      if (value) {
        inputValue = value.startsWith(' ') ? value.substr(1) : value;
      } else {
        inputValue = '';
      }

      if (value) {
        _this.setState({
          inputValue: inputValue,
          focusedOption: options[0],
          enteringText: true,
          menuOpen: true
        });
      } else {
        _this.setState({
          inputValue: inputValue,
          focusedOption: options[0],
          enteringText: false
        });
      }

      _this.props.handleInputChange(inputValue);
    }, _this.handleClearValue = function (event) {
      event.stopPropagation();
      if (_this.state.menuOpen) {
        _this.setState({ menuOpen: false });
      }
      _this.props.handleClearValue();
    }, _this.handleKeyDown = function (event) {
      switch (event.keyCode) {
        // Enter
        case 13:
          {
            if (_this.props.creatable) {
              event.preventDefault();
              if (_this.state.focusedOption) {
                // if creation is possible . . .
                if (_this.state.focusedOption.id == RMSS_CREATABLE_VALUE && !_this.props.options.find(function (opt) {
                  return opt.value == _this.state.inputValue;
                })) {
                  var newOptionProps = {
                    id: _this.state.inputValue,
                    label: _this.state.inputValue
                  };
                  _this.props.handleCreate(newOptionProps);
                  _this.handleChange(newOptionProps);
                } else {
                  _this.handleChange(_this.state.focusedOption);
                }
              }
              break;
            }

            if (_this.state.focusedOption) {
              _this.handleChange(_this.state.focusedOption);
            }
            break;
          }
        // Back Space
        // Delete
        case 8:
        case 46:
          {
            if (_this.props.multi && _this.state.inputValue.length == 0 && _this.props.selectedValue && _this.props.selectedValue.length > 0) {
              _this.handleDeleteItem(_this.props.selectedValue[_this.props.selectedValue.length - 1]);
            }
            break;
          }
        // Escape
        case 27:
          {
            _this.setState({
              menuOpen: false,
              focusedOption: null
            });
            break;
          }
        // Arrow Down
        case 40:
          {
            var filteredOptions = _this.getFilteredOptions(_this.state.inputValue);
            if (!_this.state.menuOpen && filteredOptions.length > 0) {
              _this.setState({
                menuOpen: true,
                focusedOption: filteredOptions[0]
              });
            } else if (filteredOptions.length == 0) {
              return;
            } else {
              var nextFocusedOption = _this.state.focusedOption ? filteredOptions.reduce(function (acc, opt, idx, options) {
                if (opt.id == _this.state.focusedOption.id) {
                  acc = options[idx + 1] || options[0];
                }
                return acc;
              }, null) : filteredOptions[0];

              _this.handleFocusOption(nextFocusedOption, event.keyCode);
            }
            break;
          }
        // Arrow Up
        case 38:
          {
            var _filteredOptions = _this.getFilteredOptions(_this.state.inputValue);
            if (_filteredOptions.length == 0) {
              return;
            } else {
              var _nextFocusedOption = _this.state.focusedOption ? _filteredOptions.reduce(function (acc, opt, idx, options) {
                if (opt.id == _this.state.focusedOption.id) {
                  acc = options[idx - 1] || options[options.length - 1];
                }
                return acc;
              }, null) : _filteredOptions[_filteredOptions.length - 1];

              _this.handleFocusOption(_nextFocusedOption, event.keyCode);
            }
            break;
          }
      }
    }, _this.handleFocusOption = function (focusedOption, keyCode) {
      _this.setState({ focusedOption: focusedOption });

      var focusedElement = (0, _jquery2.default)('#rmss-menu-item-' + focusedOption.id, _this.containerRef.current)[0];
      var menuContainerElement = (0, _jquery2.default)('#rmss-menu-list-container', _this.containerRef.current)[0];
      var menuListElement = (0, _jquery2.default)('#rmss-menu-list', _this.containerRef.current)[0];

      var menuContainerHeight = menuContainerElement.clientHeight,
          menuContainerScrollTop = menuContainerElement.scrollTop;
      var focusedElementHeight = focusedElement.scrollHeight,
          focusedElementOffset = focusedElement.offsetTop;
      var menuListHeight = menuListElement.clientHeight;

      var filteredOptions = _this.getFilteredOptions(_this.state.inputValue);
      var focusedElementIdx = filteredOptions.findIndex(function (e) {
        return e.id == focusedOption.id;
      });
      var newScrollHeight = void 0;
      if (keyCode == 38) {
        // Arrow up
        if (focusedElementIdx == filteredOptions.length - 1) {
          newScrollHeight = menuListHeight;
        } else if (focusedElementOffset <= menuContainerScrollTop) {
          newScrollHeight = focusedElementOffset;
        }
      } else if (keyCode == 40) {
        // Arrow down
        if (focusedElementIdx == 0) {
          newScrollHeight = 0;
        } else if (menuContainerHeight + menuContainerScrollTop <= focusedElementHeight + focusedElementOffset) {
          newScrollHeight = focusedElementOffset - (menuContainerHeight - focusedElementHeight);
        }
      } else {
        console.warn('Calling \'handleFocusOption\' with a keyCode that is neither arrow up or arrow down.');
      }
      if (newScrollHeight !== undefined) {
        // prevents UI flicker
        setTimeout(function () {
          (0, _jquery2.default)(menuContainerElement).scrollTop(newScrollHeight);
        }, 100);
      }
    }, _this.onClickAway = function () {
      return _this.state.menuOpen ? _this.setState({ menuOpen: false }) : function () {};
    }, _this.handleChange = function (option) {
      _this.setState({
        menuOpen: _this.props.stayOpenAfterSelection != false,
        focusedOption: null,
        inputValue: '',
        enteringText: false
      });

      if (_this.props.multi) {
        _this.props.handleChange([].concat(_toConsumableArray(_this.props.selectedValue || []), [option]));
      } else {
        _this.props.handleChange(option);
      }
    }, _this.handleDeleteItem = function (item) {
      if (_this.props.selectedValue.length == 1) {
        _this.props.handleChange(null);
      } else {
        _this.props.handleChange(_this.props.selectedValue.filter(function (v) {
          return v.id != item.id;
        }));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ focusedOption: this.props.options[0] });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.multi) {
        var updatedStyle = this.props.calculateTextFieldStyle();
        if (!_.isEqual(updatedStyle, this.state.inputStyle)) {
          this.setState({ inputStyle: updatedStyle });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: this.props.classes.rmss_outer_container,
          ref: this.containerRef
        },
        _react2.default.createElement(
          'div',
          { className: this.props.classes.rmss_global_container + ' ' + this.props.containerClassName },
          this.props.children(_extends({
            getFilteredOptions: this.getFilteredOptions,
            handleInputChange: this.handleInputChange,
            handleClearValue: this.handleClearValue,
            handleKeyDown: this.handleKeyDown,
            onClickAway: this.onClickAway,
            handleChange: this.handleChange,
            toggleMenuOpen: function toggleMenuOpen(bool) {
              return _this2.state.menuOpen != bool ? _this2.setState({ menuOpen: bool }) : null;
            },
            toggleEnteringText: function toggleEnteringText(bool) {
              return _this2.state.enteringText != bool ? _this2.setState({
                enteringText: bool,
                inputValue: _this2.state.inputValue == ' ' ? '' : _this2.state.inputValue
              }) : null;
            },
            setFocusedOption: function setFocusedOption(opt) {
              return _this2.setState({ focusedOption: opt });
            },
            handleDeleteItem: this.handleDeleteItem
          }, this.state))
        )
      );
    }
  }]);

  return SelectContainer;
}(_react2.default.Component)) || _class);
SelectContainer.propTypes = {
  children: _propTypes2.default.func.isRequired,
  // from parent
  selectedValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
  handleChange: _propTypes2.default.func.isRequired,
  handleInputChange: _propTypes2.default.func.isRequired,
  handleCreate: _propTypes2.default.func,
  calculateTextFieldStyle: _propTypes2.default.func,
  handleClearValue: _propTypes2.default.func.isRequired,
  containerClassName: _propTypes2.default.string,
  stayOpenAfterSelection: _propTypes2.default.bool,
  manual: _propTypes2.default.bool,
  multi: _propTypes2.default.bool,
  creatable: _propTypes2.default.bool,
  // from withStyles
  classes: _propTypes2.default.object
};
SelectContainer.defaultProps = (_SelectContainer$defa = {
  selectedValue: null,
  handleClearValue: function handleClearValue() {},
  handleInputChange: function handleInputChange() {},
  handleCreate: function handleCreate() {},
  calculateTextFieldStyle: function calculateTextFieldStyle() {},
  containerClassName: ''
}, _defineProperty(_SelectContainer$defa, 'containerClassName', ''), _defineProperty(_SelectContainer$defa, 'stayOpenAfterSelection', false), _defineProperty(_SelectContainer$defa, 'manual', false), _defineProperty(_SelectContainer$defa, 'multi', false), _defineProperty(_SelectContainer$defa, 'creatable', false), _defineProperty(_SelectContainer$defa, 'classes', {}), _SelectContainer$defa);
exports.default = SelectContainer;