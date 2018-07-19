import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedOption: null,
      inputValue: '',
      menuOpen: false,
      enteringText: false,
      // multi select
      inputStyle: { flex: '1' },
    };

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClearValue = this.handleClearValue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateInputContainer = this.generateInputContainer.bind(this);
  }

  componentWillMount() {
    this.setState({ focusedOption: this.props.options[0] });
  }
  getFilteredOptions(inputValue) {
    if (!this.props.manual && inputValue) {
      return this.props.options.filter(opt => (
        new RegExp(inputValue, 'i').test(opt.id) ||
        new RegExp(inputValue, 'i').test(opt.label)
      ));
    } else {
      return this.props.options;
    }
  }
  handleInputChange(event) {
    const options = this.getFilteredOptions(event.target.value);
    const inputValue = event.target.value || '';
    if (event.target.value) {
      this.setState({
        inputValue: inputValue,
        focusedOption: options[0],
        enteringText: true,
        menuOpen: true,
      });
    } else {
      this.setState({
        inputValue: inputValue,
        focusedOption: options[0],
        enteringText: false,
      });
    }

    this.props.handleInputChange(inputValue);
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (this.state.focusedOption) {
          this.handleSelectOption(this.state.focusedOption);
        }
        break;
      }
      // Escape
      case 27: {
        this.setState({
          menuOpen: false,
          focusedOption: null,
        });
        break;
      }
      // Arrow Down
      case 40: {
        const filtered_options = this.getFilteredOptions(this.state.inputValue);
        const next_focusedOption = this.state.focusedOption ?
          filtered_options.reduce((acc, opt, idx, options) => {
            if (opt.id == this.state.focusedOption.id) {
              acc = options[idx + 1] || options[0];
            }
            return acc;
          }, null) :
          filtered_options[0];

        this.focusOption(next_focusedOption, event.keyCode);
        break;
      }
      // Arrow Up
      case 38: {
        const filtered_options = this.getFilteredOptions(this.state.inputValue);
        const next_focusedOption = this.state.focusedOption ?
          filtered_options.reduce((acc, opt, idx, options) => {
            if (opt.id == this.state.focusedOption.id) {
              acc = options[idx - 1] || options[options.length - 1];
            }
            return acc;
          }, null) :
          filtered_options[filtered_options.length - 1];

        this.focusOption(next_focusedOption, event.keyCode);
        break;
      }
    }
  }
  handleClearValue(e) {
    e.stopPropagation();
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
    this.props.handleClearValue();
  }
  focusOption = (focusedOption, key_code) => {
    this.setState({ focusedOption });

    const focused_element = $(`#rmss-menu-item-${focusedOption.id}`)[0];
    const menu_container_element = $(`.${this.props.classes.rmss_global_menu_paper_container}`)[0];
    const menu_list_element = $('#rmss-menu-list')[0];
    const {
      clientHeight: menu_container_height,
      scrollTop: menu_container_scroll_top,
    } = menu_container_element;
    const {
      scrollHeight: focused_element_height,
      offsetTop: focused_element_offset,
    } = focused_element;
    const { clientHeight: menu_list_height } = menu_list_element;
    const filtered_options = this.getFilteredOptions(this.state.inputValue);
    const focused_element_idx = filtered_options.findIndex(e => (
      e.id == focusedOption.id
    ));
    let new_scroll_height;
    if (key_code == 38) {           // Arrow up
      if (focused_element_idx == filtered_options.length - 1) {
        new_scroll_height = menu_list_height;
      } else if (focused_element_offset <= menu_container_scroll_top) {
        new_scroll_height = focused_element_offset;
      }
    } else if (key_code == 40) {    // Arrow down
      if (focused_element_idx == 0) {
        new_scroll_height = 0;
      } else if (menu_container_height + menu_container_scroll_top <= focused_element_height + focused_element_offset) {
        new_scroll_height = focused_element_offset - (menu_container_height - focused_element_height);
      }
    } else {
      console.warn(`Calling 'focusOption' with a keyCode that is neither arrow up or arrow down.`);
    }

    if (new_scroll_height !== undefined) {
      // prevents UI flicker
      setTimeout(() => {
        $(menu_container_element).scrollTop(new_scroll_height);
      }, 100);
    }
  }
  handleSelectOption(option) {
    this.setState({
      menuOpen: this.props.stayOpenAfterSelection != false,
      focusedOption: null,
      inputValue: '',
    });

    this.props.handleChange(option);
  }
  handleTextFocus = () => {
    if (this.state.inputValue.length > 0) {
      this.setState({
        enteringText: true,
      });
    }
  }
  generateInputContainer() {
    let label;
    if (
      !this.state.enteringText &&
      !this.props.selectedValue
    ) {
      label = this.props.label;
    } else {
      label = ' ';
    }

    return (
      <div className={this.props.classes.rmss_input_container}>
        <div className={this.props.classes.rmss_selectedValue_container}>
          {this.state.enteringText && this.state.inputValue ? null : (
            this.props.selectedValue ? (
              <p>{this.props.selectedValue.label}</p>
            ) : null
          )}
        </div>
        <TextField
          fullWidth
          disabled={this.props.disabled}
          onChange={this.handleInputChange}
          onClick={this.props.disabled ? () => {} : () => this.setState({ menuOpen: true })}
          value={this.state.enteringText ? this.state.inputValue : ''}
          onKeyDown={this.handleKeyDown}
          onFocus={this.props.disabled ? () => {} : this.handleTextFocus}
          onBlur={() => this.setState({ enteringText: false })}
          placeholder={this.props.selectedValue ? '' : this.props.placeholder}
          label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {this.props.loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton onClick={this.handleClearValue}>
                    <CloseIcon
                      style={{ visibility: this.props.selectedValue ? 'visible' : 'hidden' }}
                      size={15}
                    />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
        />
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    const menuOpen = this.state.menuOpen && this.getFilteredOptions(this.state.inputValue).length != 0;

    return (
      <div className={`${classes.rmss_global_container} ${this.props.containerClassName}`}>
        {this.generateInputContainer()}
        <div className={classes.rmss_global_menu_container}>
          <ClickAwayListener
            onClickAway={
              this.state.menuOpen ?
              () => this.setState({ menuOpen: false }) :
              () => {}
            }
          >
            <Grow
              in={menuOpen}
              mountOnEnter
              unmountOnExit
            >
              <Paper classes={{ root: classes.rmss_global_menu_paper_container }}>
                <MenuList id='rmss-menu-list'>
                  {this.getFilteredOptions(this.state.inputValue).map(opt => {
                    const selected = opt.id == (this.props.selectedValue || {}).id;
                    const focused = opt.id == (this.state.focusedOption || {}).id;

                    return (
                      <MenuItem
                        key={opt.id}
                        id={`rmss-menu-item-${opt.id}`}
                        onClick={() => this.handleSelectOption(opt)}
                        onMouseEnter={() => this.setState({ focusedOption: opt })}
                        className={`${classes.rmss_global_menu_item} ${selected && !focused ? 'selected' : focused ? 'focused' : ''}`}
                      >
                        {this.props.menuItemRenderer ? (
                          this.props.menuItemRenderer(opt)
                        ) : opt.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </div>
      </div>
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
  handleChange: PropTypes.func.isRequired,
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
};

Select.defaultProps = {
  textFieldRenderer: null,
  menuItemRenderer: null,
  stayOpenAfterSelection: false,
  selectedValue: null,
  placeholder: 'Select ...',
  label: '',
  handleClearValue: () => {},
  containerClassName: '',
  loading: false,
  disabled: false,
  handleInputChange: () => {},
  manual: false,
};

export default Select;
