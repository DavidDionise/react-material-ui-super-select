import React from 'react';
import Select from './Select.jsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import $ from 'jquery';
import _ from 'lodash';

class MultiSelect extends Select {
  constructor(props) {
    super(props);

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);

    this.text_field_area;
    this.select_area;
    this.input_area_tracker;
  }

  componentDidMount() {
    const { classes } = this.props;
    this.select_area = $(`.${classes.rmss_multi_selected_value_container}`)[0];
    this.text_field_area = $(`.${classes.rmss_multi_text_field_root}`)[0];
    this.input_area_tracker = $(`.${classes.rmss_multi_input_width_tracker}`)[0];
    this.container_width = ($(`.${classes.rmss_multi_input_container}`)[0] || {}).clientWidth;
  }
  getFilteredOptions(input_value) {
    return _.differenceWith(
      Select.prototype.getFilteredOptions.call(this, input_value),
      (this.props.selected_value || []),
      (item1, item2) => item1.id == item2.id
    );
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (this.state.focused_option) {
          event.preventDefault();
          this.handleSelectOption(this.state.focused_option);
        }
        break;
      }
      // Back Space
      // Delete
      case 8:
      case 46: {
        if (
          this.state.input_value.length == 0 &&
          this.props.selected_value &&
          this.props.selected_value.length > 0
        ) {
          this.handleDeleteItem(this.props.selected_value[this.props.selected_value.length - 1]);
        }
        break;
      }
      default: {
        Select.prototype.handleKeyDown.call(this, event);
      }
    }
  }
  handleSelectOption(option) {
    Select.prototype.handleSelectOption.call(this, [ ...(this.props.selected_value || []), option ]);
  }
  handleDeleteItem = (item) => {
    if (this.props.selected_value.length == 1) {
      this.props.handleChange(null);
    } else {
      this.props.handleChange(this.props.selected_value.filter(v => v.id != item.id));
    }
  }
  generateInputContainer = () => {
    return (
      <div className={this.props.classes.rmss_multi_input_container}>
        {(this.props.selected_value || [])
          .filter(item => this.props.options.find(opt => opt.id == item.id))
          .map(item => (
            <Chip
              key={item.id}
              label={item.label}
              onDelete={() => this.handleDeleteItem(item)}
              className={this.props.classes.rmss_chip}
            />
          ))}
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
    )
  }
}

MultiSelect.propTypes = {
  ...Select.propTypes,
  selected_value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

MultiSelect.defaultProps = {
  ...Select.defaultProps,
  selected_value: null,
};

export default MultiSelect;
