import React from 'react';
import Select from './Select.jsx';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import _ from 'lodash';
import $ from 'jquery'

class MultiSelect extends Select {
  constructor(props) {
    super(props);

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
  }

  handleInputChange = event => {
    this.calculateTextFieldWidth();
    Select.prototype.handleInputChange.call(this, event);
  }
  handleClearValue = () => {
    this.calculateTextFieldWidth();
    Select.prototype.handleClearValue.call(this);
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
    this.calculateTextFieldWidth();
  }
  handleDeleteItem = (item) => {
    if (this.props.selected_value.length == 1) {
      this.props.handleChange(null);
    } else {
      this.props.handleChange(this.props.selected_value.filter(v => v.id != item.id));
    }
    this.calculateTextFieldWidth();
  }
  lastChipRowWidth = () => {
    const chip_elements = $(`.${this.props.classes.rmss_chip}`);
    if (chip_elements.length == 0) {
      return 0;
    }

    const last_row_height = Array.from(chip_elements)
      .reduce((acc, chip) => {
        const { offsetTop: chip_offset } = chip;
        if (chip_offset >= acc) {
          acc = chip_offset;
        }
        return acc;
      }, 0);

    const last_row_width = Array.from(chip_elements)
      .filter(chip => chip.offsetTop == last_row_height)
      .reduce((acc, chip) => {
        const { marginRight, marginLeft } = window.getComputedStyle(chip);
        const { width: chip_width } = chip.getBoundingClientRect();
        acc += Math.ceil(chip_width) + parseFloat(marginRight) + parseFloat(marginLeft);
        return acc;
      }, 0);

    return last_row_width;
  }
  calculateTextFieldWidth = () => {
    setTimeout(() => {
      const input_container = $(`.${this.props.classes.rmss_multi_input_container}`)[0];
      const input_value_container = $(`.${this.props.classes.rmss_multi_text_field_width_tracker}`)[0];
      if (!input_container || !input_value_container) {
        console.log('returning 100%');
        this.setState({ input_width: '100%' });
      }

      const { width: input_container_width } = input_container.getBoundingClientRect();
      const { width: input_value_width } = input_value_container.getBoundingClientRect();
      const last_row_width = this.lastChipRowWidth();

      console.log('input_container_width : ', input_container_width);
      console.log('last_row_width : ', last_row_width);

      if (last_row_width > input_container_width - 50) {
        console.log('returning : ', `${input_container_width}px`);
        this.setState({ input_width: `${input_container_width}px` });
      } else {
        const new_width = Math.min(
          input_container_width,
          Math.max(input_value_width, (input_container_width - last_row_width))
        );
        console.log('returning : ', `${new_width}px`);
        this.setState({ input_width: `${new_width}px` });
      }
    }, 0);
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
          <div style={{ width: this.state.input_width }}>
          {/* <div> */}
            <TextField
              fullWidth
              onChange={this.handleInputChange}
              onClick={() => this.setState({ menu_open: true })}
              value={this.state.entering_text ? this.state.input_value : ''}
              onKeyDown={this.handleKeyDown}
              onFocus={this.handleTextFocus}
              // onBlur={() => this.setState({ entering_text: false })}
              placeholder={this.props.selected_value ? '' : this.props.placeholder}
            />
          </div>
          <div className={classes.rmss_multi_text_field_width_tracker}>{this.state.input_value}</div>
          {/* <button onClick={() => console.log('** width : ', this.lastChipRowWidth())}>YEAH</button> */}
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
