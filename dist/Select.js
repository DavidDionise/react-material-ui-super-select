var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.handleInputChange = function (event) {
      var options = _this.getFilteredOptions(event.target.value);
      if (event.target.value) {
        _this.setState({
          input_value: event.target.value,
          focused_option: options[0],
          entering_text: true,
          menu_open: true
        });
      } else {
        _this.setState({
          input_value: '',
          focused_option: options[0],
          entering_text: false
        });
      }
    };

    _this.focusOption = function (focused_option, key_code) {
      _this.setState({ focused_option: focused_option });

      var focused_element = $('#rmss-menu-item-' + focused_option.id)[0];
      var menu_container_element = $('.' + _this.props.classes.rmss_global_menu_paper_container)[0];
      var menu_list_element = $('#rmss-menu-list')[0];
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
          $(menu_container_element).scrollTop(new_scroll_height);
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
      return React.createElement(
        'div',
        { className: _this.props.classes.rmss_input_container },
        React.createElement(
          'div',
          { className: _this.props.classes.rmss_selected_value_container },
          _this.state.entering_text && _this.state.input_value ? null : _this.props.selected_value ? React.createElement(
            'p',
            null,
            _this.props.selected_value.label
          ) : null
        ),
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

    _this.state = {
      focused_option: null,
      input_value: '',
      menu_open: false,
      entering_text: false
    };

    _this.getFilteredOptions = _this.getFilteredOptions.bind(_this);
    _this.handleSelectOption = _this.handleSelectOption.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
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

      return React.createElement(
        'div',
        { className: classes.rmss_global_container },
        React.createElement(
          'div',
          { className: classes.rmss_global_input_container },
          this.generateInputContainer(),
          React.createElement(
            'div',
            { className: classes.rmss_global_actions_container },
            this.props.loading ? React.createElement(CircularProgress, { size: 20 }) : React.createElement(CloseIcon, {
              className: classes.rmss_global_close_button_container,
              onClick: this.props.handleClearValue
            })
          )
        ),
        React.createElement(
          'div',
          { className: classes.rmss_global_menu_container },
          React.createElement(
            Grow,
            { 'in': menu_open > 0 },
            menu_open > 0 ? // prevents UI flicker
            React.createElement(
              ClickAwayListener,
              {
                onClickAway: this.state.menu_open ? function () {
                  return _this3.setState({ menu_open: false });
                } : function () {},
                className: 'select-click-away-listener'
              },
              React.createElement(
                Paper,
                { classes: { root: classes.rmss_global_menu_paper_container } },
                React.createElement(
                  MenuList,
                  { id: 'rmss-menu-list' },
                  this.getFilteredOptions(this.state.input_value).map(function (opt) {
                    var selected = opt.id == (_this3.props.selected_value || {}).id;
                    var focused = opt.id == (_this3.state.focused_option || {}).id;

                    return _this3.props.menuItemRenderer ? _this3.props.menuItemRenderer(opt) : React.createElement(
                      MenuItem,
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
            ) : React.createElement('div', null)
          )
        )
      );
    }
  }]);

  return Select;
}(React.Component);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  textFieldRenderer: PropTypes.func,
  menuItemRenderer: PropTypes.func,
  stay_open_after_selection: PropTypes.bool,
  selected_value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }),
  placeholder: PropTypes.string,
  handleClearValue: PropTypes.func,
  loading: PropTypes.bool
};

Select.defaultProps = {
  textFieldRenderer: null,
  menuItemRenderer: null,
  stay_open_after_selection: false,
  selected_value: null,
  placeholder: 'Select ...',
  handleClearValue: function handleClearValue() {},
  loading: false
};

export default Select;