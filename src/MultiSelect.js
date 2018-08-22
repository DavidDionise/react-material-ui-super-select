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

const MultiSelect = props => {
  const lastChipRowWidth = () => {
    const chipElements = $(`.${props.classes.rmss_chip}`);
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
  const calculateTextFieldStyle = () => {
    const inputContainer = $(`.${props.classes.rmss_multi_input_container}`)[0];
    const inputValueContainer = $(`.${props.classes.rmss_multi_text_field_width_tracker}`)[0];
    if (!inputContainer || !inputValueContainer) {
      return { flex: '1' };
    }

    const { width: inputContainerWidth } = inputContainer.getBoundingClientRect();
    const { width: inputValueWidth } = inputValueContainer.getBoundingClientRect();
    const lastRowWidth = lastChipRowWidth();
    if (inputValueWidth > inputContainerWidth - lastRowWidth - 60) {
      return { width: `${inputContainerWidth}px` };
    } else {
      return { flex: 1 };
    }
  }

  return (
    <SelectContainer
      multi
      creatable={props.creatable}
      calculateTextFieldStyle={calculateTextFieldStyle}
      {..._.pick(
        props, [
          'options',
          'containerClassName',
          'handleSelectOption',
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
        handleSelectOption,
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
        let value;
        if (enteringText) {
          value = (inputValue || '').startsWith(' ') ?
            value.substr(1) :
            inputValue;
        } else if (props.selectedValue) {
          value = ' ';
        } else {
          value = '';
        }

        return (
          <React.Fragment>
            {!props.hideLabel ? (
              <InputLabel
                shrink
                focused={enteringText || _menuOpen}
              >
                {props.label}
              </InputLabel>
            ) : null}
            <div className={props.classes.rmss_multi_input_container}>
              {(props.selectedValue || [])
                .filter(item => props.options.find(opt => opt.id == item.id))
                .map(item => (
                  <Chip
                    key={item.id}
                    label={item.label}
                    onDelete={props.disabled ? undefined : () => handleDeleteItem(item)}
                    className={props.classes.rmss_chip}
                  />
                ))}
                <div
                  className={props.classes.rmss_input_and_label_container}
                  style={inputStyle}
                >
                  <TextField
                    fullWidth
                    disabled={props.disabled}
                    onChange={handleInputChange}
                    onClick={() => (
                      props.disabled ?
                      null :
                      toggleMenuOpen(true)
                    )}
                    onFocus={() => (
                      props.disabled ?
                      null :
                        inputValue.length > 0 ?
                          toggleEnteringText(true) :
                          null
                    )}
                    value={value}
                    onKeyDown={handleKeyDown}
                    onBlur={() => toggleEnteringText(false)}
                    placeholder={props.selectedValue ? '' : props.placeholder}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          {props.loading ? (
                            <CircularProgress size={20} />
                          ) : props.selectedValue ? (
                            <IconButton onClick={handleClearValue}>
                              <CloseIcon />
                            </IconButton>
                          ) : <div />}
                        </InputAdornment>
                      )
                    }}
                  />
                  <div className={props.classes.rmss_multi_text_field_width_tracker}>{inputValue}</div>
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
              handleSelectOption={handleSelectOption}
              handleMouseEnterOption={setFocusedOption}
              selectedValue={props.selectedValue}
              focusedOption={focusedOption}
            />
          </React.Fragment>
        )
      }}
    </SelectContainer>
  );
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

export default withStyles(Styles)(MultiSelect);
