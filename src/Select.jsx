import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused_item: null,
      input_value: '',
      menu_open: false,
      entering_text: false,
    };

    this.getFilteredOptions = this.getFilteredOptions.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    this.setState({ focused_item: this.props.options[0] });
  }

  getFilteredOptions(input_value) {
    if (input_value) {
      return this.props.options.filter(opt => (
        new RegExp(input_value, 'i').test(opt.value) ||
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
        focused_item: (options[0] || {}).value || null,
        entering_text: true,
        menu_open: true,
      });
    } else {
      this.setState({
        input_value: '',
        focused_item: (options[0] || {}).value || null,
        entering_text: false,
      });
    }
  }
  handleKeyDown(event) {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (this.state.focused_item) {
          this.handleSelectItem(this.state.focused_item);
        }
        break;
      }
      // Escape
      case 27: {
        this.setState({
          menu_open: false,
          focused_item: null,
        });
        break;
      }
      // Arrow Down
      case 40: {
        const options = this.getFilteredOptions(this.state.input_value);
        let updated_focused_item;
        const focused_item_idx = options.findIndex(opt => (
          opt.value == this.state.focused_item
        ));
        if (focused_item_idx != -1) {
          updated_focused_item = focused_item_idx == options.length - 1 ?
            options[0].value :
            options[focused_item_idx + 1].value;
        } else {
          updated_focused_item = (options[0] || {}).value;
        }
        this.setState({ focused_item: updated_focused_item });
        break;
      }
      // Arrow Up
      case 38: {
        const options = this.getFilteredOptions(this.state.input_value);
        let updated_focused_item;
        const focused_item_idx = options.findIndex(opt => (
          opt.value == this.state.focused_item
        ));
        if (focused_item_idx != -1) {
          updated_focused_item = focused_item_idx == 0 ?
            options[options.length - 1].value :
            options[focused_item_idx - 1].value;
        } else {
          updated_focused_item = (options[0] || {}).value;
        }
        this.setState({ focused_item: updated_focused_item });
        break;
      }
    }
  }
  handleSelectItem(value) {
    this.setState({
      menu_open: this.props.stay_open_after_selection === true,
      focused_item: null,
      input_value: '',
    });

    this.props.handleChange(value);
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
          this.props.value ? (
            <p>{this.getFilteredOptions(this.state.input_value).find(opt => opt.value == this.props.value).label}</p>
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
        placeholder={this.props.value ? '' : this.props.placeholder}
      />
    </div>
  )

  render() {
    const { classes } = this.props;
    const menu_open = this.state.menu_open && this.getFilteredOptions(this.state.input_value).length;

    return (
      <div className={classes.rmss_container}>
        <ClickAwayListener onClickAway={() => setTimeout(() => this.setState({ menu_open: false }), 50)}>
          {this.generateInputContainer()}
          <div className={classes.rmss_menu_container}>
            <Grow in={menu_open > 0}>
              {menu_open > 0 ? (   // prevents UI flicker
                <Paper>
                  <MenuList>
                    {this.getFilteredOptions(this.state.input_value).map(opt => {
                      const selected = opt.value == this.props.value;
                      const focused = opt.value == this.state.focused_item;

                      return this.props.menuItemRenderer ? this.props.menuItemRenderer(opt) : (
                        <MenuItem
                          key={opt.value}
                          onClick={() => this.handleSelectItem(opt.value)}
                          onMouseEnter={() => this.setState({ focused_item: opt.value })}
                          className={`${classes.rmss_menu_item} ${selected && !focused ? 'selected' : focused ? 'focused' : ''}`}
                        >
                          {this.props.menuItemRenderer ? (
                            this.props.menuItemRenderer(opt)
                          ) : opt.label}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Paper>
              ) : <div />}
            </Grow>
          </div>
        </ClickAwayListener>
      </div>
    )
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  textFieldRenderer: PropTypes.func,
  menuItemRenderer: PropTypes.func,
  stay_open_after_selection: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  textFieldRenderer: null,
  menuItemRenderer: null,
  stay_open_after_selection: false,
  value: null,
  placeholder: 'Select ...',
};

export default Select;
