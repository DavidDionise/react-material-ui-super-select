import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused_option: null,
      input_value: '',
      menu_open: false,
      entering_text: false,
    };

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleSelectOption = this.handleSelectOption.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
  handleInputChange = (event) => {
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
        const options = this.getFilteredOptions(this.state.input_value);
        let updated_focused_option;
        const focused_option_idx = options.findIndex(opt => (
          opt.id == this.state.focused_option.id
        ));
        if (focused_option_idx != -1) {
          updated_focused_option = focused_option_idx == options.length - 1 ?
            options[0] :
            options[focused_option_idx + 1];
        } else {
          updated_focused_option = options[0];
        }
        this.setState({ focused_option: updated_focused_option });
        break;
      }
      // Arrow Up
      case 38: {
        const options = this.getFilteredOptions(this.state.input_value);
        let updated_focused_option;
        const focused_option_idx = options.findIndex(opt => (
          opt.id == this.state.focused_option.id
        ));
        if (focused_option_idx != -1) {
          updated_focused_option = focused_option_idx == 0 ?
            options[options.length - 1] :
            options[focused_option_idx - 1];
        } else {
          updated_focused_option = options[0];
        }
        this.setState({ focused_option: updated_focused_option });
        break;
      }
    }
  }
  handleSelectOption(option) {
    this.setState({
      menu_open: this.props.stay_open_after_selection !== null,
      focused_option: null,
      input_value: '',
    });

    this.props.handleChange(option);
  }
  handleTextFocus = () => {
    if (this.state.input_value.length > 0) {
      this.setState({
        entering_text: true,
        menu_open: true,
      });
    } else {
      this.setState({ menu_open: true });
    }
  }
  generateInputContainer = () => (
    <div className={this.props.classes.rmss_input_container}>
      <div className={this.props.classes.rmss_selected_value_container}>
        {this.state.entering_text && this.state.input_value ? null : (
          this.props.selected_value ? (
            <p>{this.props.selected_value.label}</p>
          ) : null
        )}
      </div>
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

  render() {
    const { classes } = this.props;
    const menu_open = this.state.menu_open && this.getFilteredOptions(this.state.input_value).length != 0;

    return (
      <div className={classes.rmss_global_container}>
          <div className={classes.rmss_global_input_container}>
            {this.generateInputContainer()}
            <div className={classes.rmss_global_actions_container}>
              <CloseIcon
                className={classes.rmss_global_close_button_container}
                onClick={this.props.handleClearValue}
              />
            </div>
          </div>
          <div className={classes.rmss_global_menu_container}>
            <Grow in={menu_open > 0}>
              {menu_open > 0 ? (   // prevents UI flicker
                <ClickAwayListener
                  onClickAway={
                    this.state.menu_open ?
                    () => this.setState({ menu_open: false }) :
                    () => {}
                  }
                  className='select-click-away-listener'
                >
                  <Paper>
                    <MenuList>
                      {this.getFilteredOptions(this.state.input_value).map(opt => {
                        const selected = opt.id == (this.props.selected_value || {}).id;
                        const focused = opt.id == (this.state.focused_option || {}).id;

                        return this.props.menuItemRenderer ? this.props.menuItemRenderer(opt) : (
                          <MenuItem
                            key={opt.id}
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
                </ClickAwayListener>
              ) : <div />}
            </Grow>
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
  handleChange: PropTypes.func.isRequired,
  textFieldRenderer: PropTypes.func,
  menuItemRenderer: PropTypes.func,
  stay_open_after_selection: PropTypes.bool,
  selected_value: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
  handleClearValue: PropTypes.func,
};

Select.defaultProps = {
  textFieldRenderer: null,
  menuItemRenderer: null,
  stay_open_after_selection: false,
  selected_value: null,
  placeholder: 'Select ...',
  handleClearValue: () => {}
};

export default Select;
