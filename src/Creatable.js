import React from 'react';
import PropTypes from 'prop-types';
import MultiSelect from './MultiSelect.jsx';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MultiSelect from './MultiSelect';
import $ from 'jquery';
import _ from 'lodash';

const RMSS_CREATABLE_VALUE = '___rmss_creatable_value___';

class Creatable extends MultiSelect {
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13: {
        event.preventDefault();
        if (this.state.focused_option) {
          // if creation is possible . . .
          if (
            this.state.focused_option.id == RMSS_CREATABLE_VALUE &&
            !this.props.options.find(opt => opt.value == this.state.input_value)
          ) {
            const new_option_props = {
              id: this.state.input_value,
              label: this.state.input_value
            };
            this.props.onCreate(new_option_props);
            this.handleSelectOption(new_option_props);
          } else {
            this.handleSelectOption(this.state.focused_option);
          }
        }
        break;
      }
      default: {
        MultiSelect.prototype.handleKeyDown.call(this, event);
      }
    }
  }
  getFilteredOptions = (input_value) => {
    const filtered_options = MultiSelect.prototype.getFilteredOptions.call(this, input_value);
    const matched_option = this.props.options.find(opt => (
      new RegExp(`^${input_value || ''}$`, 'i').test(opt.id) ||
      new RegExp(`^${input_value || ''}$`, 'i').test(opt.label)
    ));
    // if the input doesn't match one of the options, AND creation
    //  is not already enabled, enable creation
    if (
      input_value &&
      !matched_option &&
      !((filtered_options[0] || {}).id == RMSS_CREATABLE_VALUE)
    ) {
      return [
        { id: RMSS_CREATABLE_VALUE, label: `Create "${input_value}"` },
        ...filtered_options
      ];
    } else {
      return filtered_options;
    }
  }
  generateInputContainer = () => {
    const { classes } = this.props;
    return (
      <div className={classes.rmss_multi_input_container}>
        {(this.props.selected_value || [])
          .filter(item => this.props.options.find(opt => opt.id == item.id))
          .map(item => (
            <Chip
              key={item.id}
              label={item.label}
              onDelete={() => this.handleDeleteItem(item)}
              className={classes.rmss_chip}
            />
          ))}
          <div style={{ width: this.textFieldWidth() }}>
          {/* <div> */}
            <TextField
              fullWidth
              onChange={this.handleInputChange}
              onClick={() => this.setState({ menu_open: true })}
              value={this.state.entering_text ? this.state.input_value : ''}
              onKeyDown={this.handleKeyDown}
              onFocus={this.handleTextFocus}
              onBlur={() => this.setState({ entering_text: false })}
              placeholder={this.props.selected_value ? '' : this.props.placeholder}
            />
          </div>
          <div className={classes.rmss_multi_text_field_width_tracker}>{this.state.input_value}</div>
          {/* <button onClick={() => console.log('** width : ', this.lastChipRowWidth())}>YEAH</button> */}
      </div>
    )
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
