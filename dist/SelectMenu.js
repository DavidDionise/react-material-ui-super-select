'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ClickAwayListener = require('@material-ui/core/ClickAwayListener');

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _Grow = require('@material-ui/core/Grow');

var _Grow2 = _interopRequireDefault(_Grow);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuList = require('@material-ui/core/MenuList');

var _MenuList2 = _interopRequireDefault(_MenuList);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _withStyles = require('@material-ui/core/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectMenu = function SelectMenu(props) {
  return _react2.default.createElement(
    'div',
    { className: props.classes.rmss_global_menu_container },
    _react2.default.createElement(
      _ClickAwayListener2.default,
      {
        onClickAway: props.onClickAway,
        target: 'window'
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Grow2.default,
          {
            'in': props.open,
            mountOnEnter: true,
            unmountOnExit: true
          },
          _react2.default.createElement(
            _Paper2.default,
            {
              classes: { root: props.classes.rmss_global_menu_paper_container },
              id: 'rmss-menu-list-container'
            },
            _react2.default.createElement(
              _MenuList2.default,
              { id: 'rmss-menu-list' },
              props.options.map(function (opt) {
                var selected = props.multi ? false : opt.id == (props.selectedValue || {}).id;
                var focused = opt.id == (props.focusedOption || {}).id;

                return _react2.default.createElement(
                  _MenuItem2.default,
                  {
                    key: opt.id,
                    id: 'rmss-menu-item-' + opt.id,
                    onClick: function onClick() {
                      return props.handleChange(opt);
                    },
                    onMouseEnter: function onMouseEnter() {
                      return props.handleMouseEnterOption(opt);
                    },
                    className: props.classes.rmss_global_menu_item + ' ' + (selected && !focused ? 'selected' : focused ? 'focused' : '')
                  },
                  props.MenuItem ? _react2.default.createElement(_MenuItem2.default, { option: opt }) : opt.label
                );
              })
            )
          )
        )
      )
    )
  );
};

SelectMenu.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  classes: _propTypes2.default.object.isRequired,
  onClickAway: _propTypes2.default.func.isRequired,
  handleChange: _propTypes2.default.func.isRequired,
  handleMouseEnterOption: _propTypes2.default.func.isRequired,
  selectedValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
  focusedOption: _propTypes2.default.object,
  MenuItem: _propTypes2.default.func
};

SelectMenu.defaultProps = {
  selectedValue: null,
  focusedOption: null,
  MenuItem: null,
  chipInLastRow: null
};

exports.default = (0, _withStyles2.default)(_Styles2.default)(SelectMenu);