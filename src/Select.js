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
      focused_option: null,
      input_value: '',
      menu_open: false,
      entering_text: false,
      // multi select
      input_style: { flex: '1' },
    };

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClearValue = this.handleClearValue.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.generateInputContainer = this.generateInputContainer.bind(this);
  }

  componentWillMount() {
    this.setState({ focused_option: this.props.options[0] });
  }
  getFilteredOptions(input_value) {
    if (input_value) {
      return this.props.options.filter(opt => (
        new RegExp(input_value, 'i').test(opt.id) ||
        new RegExp(input_value, 'i').test(opt.label)
      ));
    } else {
      return this.props.options;
    }
  }
  handleInputChange(event) {
    const options = this.getFilteredOptions(event.target.value);
    if (event.target.value) {
      this.setState({
        input_value: event.target.value,
        focused_option: options[0],
        entering_text: true,
        menu_open: true,
      });
    } else {
      this.setState({
        input_value: '',
        focused_option: options[0],
        entering_text: false,
      });
    }
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (this.state.focused_option) {
          this.handleSelectOption(this.state.focused_option);
        }
        break;
      }
      // Escape
      case 27: {
        this.setState({
          menu_open: false,
          focused_option: null,
        });
        break;
      }
      // Arrow Down
      case 40: {
        const filtered_options = this.getFilteredOptions(this.state.input_value);
        const next_focused_option = this.state.focused_option ?
          filtered_options.reduce((acc, opt, idx, options) => {
            if (opt.id == this.state.focused_option.id) {
              acc = options[idx + 1] || options[0];
            }
            return acc;
          }, null) :
          filtered_options[0];

        this.focusOption(next_focused_option, event.keyCode);
        break;
      }
      // Arrow Up
      case 38: {
        const filtered_options = this.getFilteredOptions(this.state.input_value);
        const next_focused_option = this.state.focused_option ?
          filtered_options.reduce((acc, opt, idx, options) => {
            if (opt.id == this.state.focused_option.id) {
              acc = options[idx - 1] || options[options.length - 1];
            }
            return acc;
          }, null) :
          filtered_options[filtered_options.length - 1];

        this.focusOption(next_focused_option, event.keyCode);
        break;
      }
    }
  }
  handleClearValue(e) {
    e.stopPropagation();
    if (this.state.menu_open) {
      this.setState({ menu_open: false });
    }
    this.props.handleClearValue();
  }
  focusOption = (focused_option, key_code) => {
    this.setState({ focused_option });

    const focused_element = $(`#rmss-menu-item-${focused_option.id}`)[0];
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
    const filtered_options = this.getFilteredOptions(this.state.input_value);
    const focused_element_idx = filtered_options.findIndex(e => (
      e.id == focused_option.id
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
      menu_open: this.props.stayOpenAfterSelection != false,
      focused_option: null,
      input_value: '',
    });

    this.props.handleChange(option);
  }
  handleTextFocus = () => {
    if (this.state.input_value.length > 0) {
      this.setState({
        entering_text: true,
      });
    }
  }
  generateInputContainer() {
    let label;
    if (
      !this.state.entering_text &&
      !this.props.selectedValue
    ) {
      label = this.props.label;
    } else {
      label = ' ';
    }
    const disabled = this.props.disabled || this.props.loading;

    return (
      <div className={this.props.classes.rmss_input_container}>
        <div className={this.props.classes.rmss_selectedValue_container}>
          {this.state.entering_text && this.state.input_value ? null : (
            this.props.selectedValue ? (
              <p>{this.props.selectedValue.label}</p>
            ) : null
          )}
        </div>
        <TextField
          fullWidth
          disabled={disabled}
          onChange={this.handleInputChange}
          onClick={disabled ? () => {} : () => this.setState({ menu_open: true })}
          value={this.state.entering_text ? this.state.input_value : ''}
          onKeyDown={this.handleKeyDown}
          onFocus={disabled ? () => {} : this.handleTextFocus}
          onBlur={() => this.setState({ entering_text: false })}
          placeholder={this.props.selectedValue ? '' : this.props.placeholder}
          label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={this.handleClearValue}>
                  {this.props.loading ? <CircularProgress size={20} /> : <CloseIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    const menu_open = this.state.menu_open && this.getFilteredOptions(this.state.input_value).length != 0;

    return (
      <div className={`${classes.rmss_global_container} ${this.props.containerClassName}`}>
        {this.generateInputContainer()}
        <div className={classes.rmss_global_menu_container}>
          <ClickAwayListener
            onClickAway={
              this.state.menu_open ?
              () => this.setState({ menu_open: false }) :
              () => {}
            }
          >
            <Grow
              in={menu_open}
              mountOnEnter
              unmountOnExit
            >
              <Paper classes={{ root: classes.rmss_global_menu_paper_container }}>
                <MenuList id='rmss-menu-list'>
                  {this.getFilteredOptions(this.state.input_value).map(opt => {
                    const selected = opt.id == (this.props.selectedValue || {}).id;
                    const focused = opt.id == (this.state.focused_option || {}).id;

                    return (
                      <MenuItem
                        key={opt.id}
                        id={`rmss-menu-item-${opt.id}`}
                        onClick={() => this.handleSelectOption(opt)}
                        onMouseEnter={() => this.setState({ focused_option: opt })}
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
};

export default Select;
