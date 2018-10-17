'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectMenu = function (_React$Component) {
  _inherits(SelectMenu, _React$Component);

  function SelectMenu() {
    _classCallCheck(this, SelectMenu);

    return _possibleConstructorReturn(this, (SelectMenu.__proto__ || Object.getPrototypeOf(SelectMenu)).apply(this, arguments));
  }

  _createClass(SelectMenu, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (_lodash2.default.isEqual(nextProps.options, this.props.options) && _lodash2.default.isEqual(nextProps.focusedOption, this.props.focusedOption) && nextProps.open === this.props.open) {
        return false;
      }

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.classes.rmss_global_menu_container },
        _react2.default.createElement(
          _ClickAwayListener2.default,
          {
            onClickAway: this.props.onClickAway,
            target: 'window'
          },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _Grow2.default,
              {
                'in': this.props.open,
                mountOnEnter: true,
                unmountOnExit: true
              },
              _react2.default.createElement(
                _Paper2.default,
                {
                  classes: { root: this.props.classes.rmss_global_menu_paper_container },
                  id: 'rmss-menu-list-container'
                },
                _react2.default.createElement(
                  _MenuList2.default,
                  { id: 'rmss-menu-list' },
                  this.props.options.map(function (opt) {
                    var selected = _this2.props.multi ? false : opt.id == (_this2.props.selectedValue || {}).id;
                    var focused = opt.id == (_this2.props.focusedOption || {}).id;

                    return _react2.default.createElement(
                      _MenuItem2.default,
                      {
                        key: opt.id,
                        id: 'rmss-menu-item-' + opt.id,
                        onClick: function onClick() {
                          return _this2.props.handleChange(opt);
                        },
                        onMouseEnter: function onMouseEnter() {
                          return _this2.props.handleMouseEnterOption(opt);
                        },
                        className: _this2.props.classes.rmss_global_menu_item + ' ' + (selected && !focused ? 'selected' : focused ? 'focused' : '')
                      },
                      _this2.props.MenuItem ? _react2.default.createElement(_MenuItem2.default, { option: opt }) : opt.label
                    );
                  })
                )
              )
            )
          )
        )
      );
    }
  }]);

  return SelectMenu;
}(_react2.default.Component);

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