import React from 'react';
import PropTypes from 'prop-types';
import MultiSelect from './MultiSelect';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';

const RMSS_CREATABLE_VALUE = '___rmss_creatable_value___';

class Creatable extends MultiSelect {
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

  render() {
    return MultiSelect.prototype.render.call(this);
  }
}

Creatable.propTypes = {
  ...MultiSelect.propTypes,
  handleCreate: PropTypes.func.isRequired,
};

Creatable.defaultProps = { ...MultiSelect.defaultProps };

export default Creatable;
