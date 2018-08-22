import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import SelectContainer from './SelectContainer';
import SelectMenu from './SelectMenu';

import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles';

const Select = props => (
  <SelectContainer
    {..._.pick(
      props, [
        'options',
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
      handleBlur,
      toggleEnteringText,
      toggleMenuOpen,
      setFocusedOption,
      // from state
      menuOpen,
      inputValue,
      focusedOption,
      enteringText,
    }) => {
      const _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;

      return (
        <React.Fragment>
          <div className={props.classes.rmss_input_container}>
            <div className={props.classes.rmss_selected_value_container}>
              {enteringText && inputValue ? null : (
                props.selectedValue ? (
                  <p>{props.selectedValue.label}</p>
                ) : null
              )}
            </div>
            <div className={props.classes.rmss_input_and_label_container}>
              {!props.hideLabel ? (
                <InputLabel
                  shrink
                  focused={enteringText || _menuOpen}
                >
                  {props.label}
                </InputLabel>
              ) : null}
              <TextField
                fullWidth
                disabled={props.disabled}
                onChange={handleInputChange}
                onClick={() => props.disabled ? null : toggleMenuOpen(true)}
                value={props.selectedValue && !enteringText ? '' : inputValue}
                onKeyDown={handleKeyDown}
                onBlur={() => (
                  props.disabled ?
                    null :
                    toggleEnteringText(false)
                )}
                onFocus={() => (
                  props.disabled ?
                    null :
                    inputValue.length > 0 ?
                      toggleEnteringText(true) :
                      null
                )}
                placeholder={props.selectedValue ? '' : props.placeholder}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position='end'
                      classes={{ root: props.classes.rmss_global_input_adornment_container }}
                    >
                      {props.loading ? (
                        <CircularProgress size={20} />
                      ) : props.selectedValue ? (
                        <IconButton onClick={handleClearValue}>
                          <CloseIcon classes={{ root: props.classes.rmss_global_close_button_container }} />
                        </IconButton>
                      ) : <div />}
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>

          <SelectMenu
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
)

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  containerClassName: PropTypes.string,
  handleSelectOption: PropTypes.func.isRequired,
  textFieldRenderer: PropTypes.func,
  menuItemRenderer: PropTypes.func,
  stayOpenAfterSelection: PropTypes.bool,
  selectedValue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  handleClearValue: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  handleInputChange: PropTypes.func,
  manual: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

Select.defaultProps = {
  containerClassName: '',
  handleInputChange: () => {},
  handleClearValue: () => {},
  textFieldRenderer: null,
  menuItemRenderer: null,
  stayOpenAfterSelection: false,
  selectedValue: null,
  label: '',
  loading: false,
  disabled: false,
  manual: false,
  hideLabel: false,
};

export default withStyles(Styles)(Select);
