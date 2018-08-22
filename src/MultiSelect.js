import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import $ from 'jquery';

import SelectContainer from './SelectContainer';
import Select from './Select';
import SelectMenu from './SelectMenu';

import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles';

class MultiSelect extends React.Component {
  /**
   * @description - Helper in 'calculateTextFieldStyle'
   */
  lastChipRowWidth = () => {
    const chipElements = $(`.${this.props.classes.rmss_chip}`);
    if (chipElements.length == 0) {
      return 0;
    }

    const lastRowHeight = Array.from(chipElements)
      .reduce((acc, chip) => {
        const { offsetTop: chipOffset } = chip;
        if (chipOffset >= acc) {
          acc = chipOffset;
        }
        return acc;
      }, 0);

    const lastRowWidth = Array.from(chipElements)
      .filter(chip => chip.offsetTop == lastRowHeight)
      .reduce((acc, chip) => {
        const { marginRight, marginLeft } = window.getComputedStyle(chip);
        const { width: chipWidth } = chip.getBoundingClientRect();
        acc += Math.ceil(chipWidth) + parseFloat(marginRight) + parseFloat(marginLeft);
        return acc;
      }, 0);

    return lastRowWidth;
  }
  /**
   * @description - In the MultiSelect components, the text field width
   *  must change depending on the width of selected chips; this function
   *  helps determine the appropriate styling for the text input width
   */
  calculateTextFieldStyle = () => {
    const inputContainer = $(`.${this.props.classes.rmss_multi_input_container}`)[0];
    const inputValueContainer = $(`.${this.props.classes.rmss_multi_text_field_width_tracker}`)[0];
    if (!inputContainer || !inputValueContainer) {
      return { flex: '1' };
    }

    const { width: inputContainerWidth } = inputContainer.getBoundingClientRect();
    const { width: inputValueWidth } = inputValueContainer.getBoundingClientRect();
    const lastRowWidth = this.lastChipRowWidth();
    if (inputValueWidth > inputContainerWidth - lastRowWidth - 60) {
      return { width: `${inputContainerWidth}px` };
    } else {
      return { flex: 1 };
    }
  }

  render() {
    return (
      <SelectContainer
        multi
        creatable={this.props.creatable}
        calculateTextFieldStyle={this.calculateTextFieldStyle}
        {..._.pick(
          this.props, [
            'options',
            'containerClassName',
            'handleChange',
            'handleCreate',
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
          handleChange,
          handleDeleteItem,
          toggleEnteringText,
          toggleMenuOpen,
          setFocusedOption,
          // from state
          menuOpen,
          inputValue,
          focusedOption,
          enteringText,
          inputStyle,
        }) => {
          const _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;

          return (
            <React.Fragment>
              {!this.props.hideLabel ? (
                <InputLabel
                  shrink
                  focused={enteringText || _menuOpen}
                >
                  {this.props.label}
                </InputLabel>
              ) : null}
              <div className={this.props.classes.rmss_multi_input_container}>
                {(this.props.selectedValue || [])
                  .filter(item => this.props.options.find(opt => opt.id == item.id))
                  .map(item => (
                    <Chip
                      id={item.id}
                      key={item.id}
                      label={item.label}
                      onDelete={this.props.disabled ? undefined : () => handleDeleteItem(item)}
                      className={this.props.classes.rmss_chip}
                    />
                  ))}
                  <div
                    className={this.props.classes.rmss_input_and_label_container}
                    style={inputStyle}
                  >
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
                      value={this.props.selectedValue && !enteringText ? '' : inputValue}
                      onKeyDown={handleKeyDown}
                      onBlur={() => toggleEnteringText(false)}
                      placeholder={this.props.selectedValue ? '' : this.props.placeholder}
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
                    <div className={this.props.classes.rmss_multi_text_field_width_tracker}>{inputValue}</div>
                  </div>
              </div>

              <SelectMenu
                multi
                open={_menuOpen}
                options={getFilteredOptions(inputValue)}
                onClickAway={() => (
                  _menuOpen ?
                    toggleMenuOpen(false) :
                    null
                )}
                handleChange={handleChange}
                handleMouseEnterOption={setFocusedOption}
                selectedValue={this.props.selectedValue}
                focusedOption={focusedOption}
              />
            </React.Fragment>
          )
        }}
      </SelectContainer>
    );
  }
}

MultiSelect.propTypes = {
  ...Select.propTypes,
  creatable: PropTypes.bool,
  handleCreate: PropTypes.func,
  selectedValue: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

MultiSelect.defaultProps = {
  handleCreate: () => {},
  creatable: false,
};

export default withStyles(Styles)(MultiSelect);
