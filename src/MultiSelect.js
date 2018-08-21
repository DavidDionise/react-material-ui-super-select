import React from 'react';
import Select from './Select';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectContainer from './SelectContainer';
import SelectMenu from './SelectMenu';
import $ from 'jquery';
import _ from 'lodash';

class MultiSelect extends Select {
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
  calculateTextFieldStyle = () => {
    const input_container = $(`.${this.props.classes.rmss_multi_input_container}`)[0];
    const inputValue_container = $(`.${this.props.classes.rmss_multi_text_field_width_tracker}`)[0];
    if (!input_container || !inputValue_container) {
      return { flex: '1' };
    }

    const { width: input_container_width } = input_container.getBoundingClientRect();
    const { width: inputValue_width } = inputValue_container.getBoundingClientRect();
    const last_row_width = this.lastChipRowWidth();

    if (inputValue_width > input_container_width - last_row_width - 60) {
      return { width: `${input_container_width}px` };
    } else {
      return { flex: 1 };
    }
  }

  render() {
    return (
      <SelectContainer
        multi
        creatable={this.props.creatable}
        {..._.pick(
          this.props, [
            'containerClassName',
            'handleSelectOption',
            'stayOpenAfterSelection',
            'selectedValue',
            'handleClearValue',
            'loading',
            'handleInputChange',
            'manual',
          ])}
      >
        {({
          getFilteredOptions,
          handleInputChange,
          handleClearValue,
          handleKeyDown,
          handleSelectOption,
          handleDeleteItem,
          toggleEnteringText,
          toggleMenuOpen,
          handleSelectOption,
          setFocusedOption,
          classes,
          // from state
          menuOpen,
          inputValue,
          focusedOption,
          enteringText,
          inputStyle,
        }) => {
          const menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;
          const value = enteringText ? inputValue : selectedValue ? ' ' : '';

          return (
            <React.Fragment>
              <div className={classes.rmss_multi_input_container}>
                {this.props.label && this.props.selectedValue && !this.props.hideLabel ? (
                  <InputLabel
                    focused={menuOpen}
                    shrink
                    disableAnimation
                    style={{ width: '100%' }}
                  >
                    {this.props.label}
                  </InputLabel>
                ) : null}
                {(this.props.selectedValue || [])
                  .filter(item => this.props.options.find(opt => opt.id == item.id))
                  .map(item => (
                    <Chip
                      key={item.id}
                      label={item.label}
                      onDelete={this.props.disabled ? undefined : () => handleDeleteItem(item)}
                      className={classes.rmss_chip}
                    />
                  ))}
                  <div style={inputStyle}>
                    <TextField
                      fullWidth
                      disabled={this.props.disabled}
                      onChange={handleInputChange}
                      onClick={() => (
                        this.props.disabled ?
                        null :
                        toggleMenuOpen(true)
                      )}
                      onFocus={() => (
                        this.props.disabled ?
                        null :
                          inputValue.length > 0 ?
                            toggleEnteringText(true) :
                            null
                      )}
                      value={value}
                      onKeyDown={handleKeyDown}
                      onBlur={() => toggleEnteringText(false)}
                      placeholder={this.props.selectedValue ? '' : this.props.placeholder}
                      label={!this.props.selectedValue && !this.props.hideLabel ? this.props.label : undefined}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            {this.props.loading ? (
                              <CircularProgress size={20} />
                            ) : this.props.selectedValue ? (
                              <IconButton onClick={handleClearValue}>
                                <CloseIcon />
                              </IconButton>
                            ) : <div />}
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                  <div className={classes.rmss_multi_text_field_width_tracker}>{inputValue}</div>
              </div>

              <SelectMenu
                open={menuOpen}
                options={getFilteredOptions(inputValue)}
                classes={classes}
                onClickAway={() => (
                  menuOpen ?
                  null :
                  toggleMenuOpen(false)
                )}
                handleSelectOption={handleSelectOption}
                handleMouseEnterOption={setFocusedOption}
                selectedValue={selectedValue}
                focusedOption={focusedOption}
              />
            </React.Fragment>
          )
        }}
      </SelectContainer>
    )
  }
}

MultiSelect.propTypes = {
  ...Select.propTypes,
  creatable: PropTypes.bool,
  selectedValue: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

MultiSelect.defaultProps = {
  creatable: false,
};

export default MultiSelect;
