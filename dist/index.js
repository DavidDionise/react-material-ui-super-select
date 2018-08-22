'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Creatable = exports.MultiSelect = exports.Select = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _MultiSelect = require('./MultiSelect');

var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Creatable = function Creatable(props) {
  return _react2.default.createElement(_MultiSelect2.default, _extends({}, props, { creatable: true }));
};

exports.Select = _Select2.default;
exports.MultiSelect = _MultiSelect2.default;
exports.Creatable = Creatable;