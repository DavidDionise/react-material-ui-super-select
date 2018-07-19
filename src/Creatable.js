import React from 'react';
import PropTypes from 'prop-types';
import MultiSelect from './MultiSelect';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import $ from 'jquery';
import _ from 'lodash';

const RMSS_CREATABLE_VALUE = '___rmss_creatable_value___';

class Creatable extends MultiSelect {
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13: {
        event.preventDefault();
        if (this.state.focusedOption) {
          // if creation is possible . . .
          if (
            this.state.focusedOption.id == RMSS_CREATABLE_VALUE &&
            !this.props.options.find(opt => opt.value == this.state.inputValue)
          ) {
            const new_option_props = {
              id: this.state.inputValue,
              label: this.state.inputValue
            };
            this.props.onCreate(new_option_props);
            this.handleSelectOption(new_option_props);
          } else {
            this.handleSelectOption(this.state.focusedOption);
          }
        }
        break;
      }
      default: {
        MultiSelect.prototype.handleKeyDown.call(this, event);
      }
    }
  }
  getFilteredOptions = (inputValue) => {
    const filtered_options = MultiSelect.prototype.getFilteredOptions.call(this, inputValue);
    const matched_option = this.props.options.find(opt => (
      new RegExp(`^${inputValue || ''}$`, 'i').test(opt.id) ||
      new RegExp(`^${inputValue || ''}$`, 'i').test(opt.label)
    ));
    // if the input doesn't match one of the options, AND creation
    //  is not already enabled, enable creation
    if (
      inputValue &&
      !matched_option &&
      !((filtered_options[0] || {}).id == RMSS_CREATABLE_VALUE)
    ) {
      return [
        { id: RMSS_CREATABLE_VALUE, label: `Create "${inputValue}"` },
        ...filtered_options
      ];
    } else {
      return filtered_options;
    }
  }
  generateInputContainer = () => {
    return MultiSelect.prototype.generateInputContainer.call(this);
  }

  render() {
    return MultiSelect.prototype.render.call(this);
  }
}

Creatable.propTypes = {
  ...MultiSelect.propTypes,
  onCreate: PropTypes.func.isRequired,
};

Creatable.defaultProps = { ...MultiSelect.defaultProps };

export default Creatable;
