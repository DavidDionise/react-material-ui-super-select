import React from 'react';
import Select from './Select.jsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import _ from 'lodash';

class MultiSelect extends Select {
  constructor(props) {
    super(props);

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  getFilteredOptions(input_value) {
    return _.differenceWith(
      Select.prototype.getFilteredOptions.call(this, input_value),
      (this.props.value || []),
      (item1, item2) => item1.value == item2.value
    );
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13: {    // Enter
        if (this.state.focused_item) {
          event.preventDefault();
          this.handleSelectItem(this.state.focused_item);
        }
        break;
      }
      case 8:     // Back Space
      case 46: {  // Delete
        if (
          this.state.input_value.length == 0 &&
          this.props.value &&
          this.props.value.length > 0
        ) {
          this.handleDeleteItem(this.props.value[this.props.value.length - 1]);
        }
        break;
      }
      default: {
        Select.prototype.handleKeyDown.call(this, event);
      }
    }
  }
  handleSelectItem(value) {
    Select.prototype.handleSelectItem.call(this, [ ...(this.props.value || []), value ]);
  }
  handleDeleteItem = (value) => {
    if (this.props.value.length == 1) {
      this.props.handleChange(null);
      this.setState({ filtered_options: this.props.options });
    } else {
      this.props.handleChange(this.props.value.filter(v => v != value));
      this.setState({
        filtered_options: [
          ...this.state.filtered_options,
          this.props.options.find(opt => opt.value == value)
        ]
      });
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
        onClick={() => this.setState({ menu_open: true })}
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

MultiSelect.propTypes = {
  ...Select.propTypes,
  value: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

MultiSelect.defaultProps = {
  ...Select.defaultProps,
  value: null,
};

export default MultiSelect;
