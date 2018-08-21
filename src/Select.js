import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectContainer from './SelectContainer';
import SelectMenu from './SelectMenu';

class Select extends React.Component {
  render() {
    return (
      <SelectContainer
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
        }) => {
          const menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;
          const value = enteringText ? inputValue : selectedValue ? ' ' : '';

          return (
            <React.Fragment>
              <div className={classes.rmss_input_container}>
                <div className={classes.rmss_selected_value_container}>
                  {enteringText && inputValue ? null : (
                    this.props.selectedValue ? (
                      <p>{this.props.selectedValue.label}</p>
                    ) : null
                  )}
                </div>
                <TextField
                  fullWidth
                  disabled={this.props.disabled}
                  onChange={this.handleInputChange}
                  onClick={() => this.props.disabled ? null : toggleMenuOpen(true)}
                  value={value}
                  onKeyDown={handleKeyDown}
                  onFocus={() => (
                    this.props.disabled ?
                    null :
                      inputValue.length > 0 ?
                        toggleEnteringText(true) :
                        null
                  )}
                  onBlur={() => toggleEnteringText(false)}
                  placeholder={this.props.selectedValue ? '' : this.props.placeholder}
                  label={this.props.hideLabel ? undefined : this.props.label}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        classes={{ root: classes.rmss_global_input_adornment_container }}
                      >
                        {this.props.loading ? (
                          <CircularProgress size={20} />
                        ) : this.props.selectedValue ? (
                          <IconButton onClick={handleClearValue}>
                            <CloseIcon classes={{ root: classes.rmss_global_close_button_container }} />
                          </IconButton>
                        ) : <div />}
                      </InputAdornment>
                    )
                  }}
                />
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
  placeholder: 'Select ...',
  label: '',
  loading: false,
  disabled: false,
  manual: false,
  hideLabel: false,
};

export default Select;
