import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MultiSelect from './MultiSelect.jsx';
import _ from 'lodash';

const RMSS_CREATABLE_VALUE = '___rmss_creatable_value___';

class Creatable extends MultiSelect {
  constructor(props) {
    super(props);
  }

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13: {
        event.preventDefault();
        // if creation is possible . . .
        if ((this.getFilteredOptions()[0] || {}).value == RMSS_CREATABLE_VALUE) {
          this.props.onCreate({
            value: this.state.input_value,
            label: this.state.input_value,
          });
          this.handleSelectItem(this.getFilteredOptions()[0]);
        }
        break;
      }
      default: {
        MultiSelect.prototype.handleKeyDown.call(this, event);
      }
    }
  }
  handleSelectItem(value) {
    const { input_value } = this.state;
    if (value == RMSS_CREATABLE_VALUE) {
      this.props.onCreate({ value: input_value, label: input_value });
    } else {
      MultiSelect.prototype.handleSelectItem.call(this, value);
    }
  }
  getFilteredOptions = () => {
    const { input_value } = this.state;
    const filtered_options = MultiSelect.prototype.getFilteredOptions.call(this, input_value);
    const matched_option = filtered_options.find(opt => (
      new RegExp(`^${input_value || ''}$`, 'i').test(opt.value) ||
      new RegExp(`^${input_value || ''}$`, 'i').test(opt.label)
    ));
    // if the input doesn't match one of the options, AND creation
    //  is not already enabled, enable creation
    if (
      input_value &&
      !matched_option &&
      !((filtered_options[0] || {}).value == RMSS_CREATABLE_VALUE)
    ) {
      return [
        { value: RMSS_CREATABLE_VALUE, label: `Create "${input_value}"` },
        ...filtered_options
      ];
    } else {
      return filtered_options;
    }
  }

  generateInputContainer = () => (
    <div className={this.props.classes.rmss_multi_input_container}>
      <div className={this.props.classes.rmss_multi_selected_value_container}>
        {(this.props.value || [])
          .filter(item => this.props.options.find(opt => opt.value == item))
          .map(item => (
            <Chip
              key={item}
              label={this.props.options.find(opt => opt.value === item).label}
              onDelete={() => this.handleDeleteItem(item)}
              className={this.props.classes.rmss_chip}
            />
          ))}
      </div>
      <TextField
        fullWidth
        multiline
        onChange={this.handleInputChange}
        value={this.state.entering_text ? this.state.input_value : ''}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleTextFocus}
        onBlur={() => this.setState({ entering_text: false })}
        placeholder={this.props.value ? '' : this.props.placeholder}
      />
    </div>
  )
}

Creatable.propTypes = {
  ...MultiSelect.propTypes,
  onCreate: PropTypes.func.isRequired,
};

Creatable.defaultProps = { ...MultiSelect.defaultProps };

export default Creatable;
