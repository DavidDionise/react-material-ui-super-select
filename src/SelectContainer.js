import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles';

const RMSS_CREATABLE_VALUE = '__RMSS_CREATABLE_VALUE__'

@withStyles(Styles)
class SelectContainer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    // from parent
    selectedValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.object,
      ),
    ]),
    handleChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleCreate: PropTypes.func,
    calculateTextFieldStyle: PropTypes.func,
    handleClearValue: PropTypes.func.isRequired,
    containerClassName: PropTypes.string,
    stayOpenAfterSelection: PropTypes.bool,
    manual: PropTypes.bool,
    multi: PropTypes.bool,
    creatable: PropTypes.bool,
    // from withStyles
    classes: PropTypes.object,
  };
  static defaultProps = {
    selectedValue: null,
    handleClearValue: () => {},
    handleInputChange: () => {},
    handleCreate: () => {},
    calculateTextFieldStyle: () => {},
    containerClassName: '',
    containerClassName: '',
    stayOpenAfterSelection: false,
    manual: false,
    multi: false,
    creatable: false,
    classes: {},
  };

  state = {
    focusedOption: null,
    inputValue: '',
    inputFocused: false,
    menuOpen: false,
    enteringText: false,
    // multi select
    inputStyle: { flex: '1' },
  };
  containerRef = React.createRef();

  componentWillMount() {
    this.setState({ focusedOption: this.props.options[0] });
  }
  componentDidUpdate() {
    if (this.props.multi) {
      const updatedStyle = this.props.calculateTextFieldStyle();
      if (!_.isEqual(updatedStyle, this.state.inputStyle)) {
        this.setState({ inputStyle: updatedStyle });
      }
    }
  }
  getFilteredOptions = (inputValue) => {
    const baseFilteredOptions = !this.props.manual && inputValue ?
      this.props.options.filter(opt => (
        new RegExp(inputValue, 'i').test(opt.id) ||
        new RegExp(inputValue, 'i').test(opt.label)
      )) :
      this.props.options;

    const multiFilteredOptions = _.differenceWith(
      baseFilteredOptions,
      (this.props.selectedValue || []),
      (item1, item2) => item1.id == item2.id
    );

    if (this.props.creatable) {
      const matchedOption = this.props.options.find(opt => (
        new RegExp(`^${inputValue || ''}$`, 'i').test(opt.id) ||
        new RegExp(`^${inputValue || ''}$`, 'i').test(opt.label)
      ));
      // if the input doesn't match one of the options, AND creation
      //  is not already enabled, enable creation
      if (
        inputValue &&
        !matchedOption &&
        !((multiFilteredOptions[0] || {}).id == RMSS_CREATABLE_VALUE)
      ) {
        return [
          { id: RMSS_CREATABLE_VALUE, label: `Create "${inputValue}"` },
          ...multiFilteredOptions
        ];
      } else {
        return multiFilteredOptions;
      }
    } else if (this.props.multi) {
      return multiFilteredOptions;
    }

    return baseFilteredOptions;
  }
  handleInputChange = (event) => {
    const { value } = event && event.target || {};
    const options = this.getFilteredOptions(value);
    let inputValue;
    if (value) {
      inputValue = value.startsWith(' ') ?
        value.substr(1) :
        value;
    } else {
      inputValue = '';
    }

    if (value) {
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
  handleClearValue = (event) => {
    event.stopPropagation();
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    }
    this.props.handleClearValue();
  }
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      // Enter
      case 13: {
        if (this.props.creatable) {
          event.preventDefault();
          if (this.state.focusedOption) {
            // if creation is possible . . .
            if (
              this.state.focusedOption.id == RMSS_CREATABLE_VALUE &&
              !this.props.options.find(opt => opt.value == this.state.inputValue)
            ) {
              const newOptionProps = {
                id: this.state.inputValue,
                label: this.state.inputValue
              };
              this.props.handleCreate(newOptionProps);
              this.handleChange(newOptionProps);
            } else {
              this.handleChange(this.state.focusedOption);
            }
          }
          break;
        }

        if (this.state.focusedOption) {
          this.handleChange(this.state.focusedOption);
        }
        break;
      }
      // Back Space
      // Delete
      case 8:
      case 46: {
        if (
          this.props.multi &&
          this.state.inputValue.length == 0 &&
          this.props.selectedValue &&
          this.props.selectedValue.length > 0
        ) {
          this.handleDeleteItem(this.props.selectedValue[this.props.selectedValue.length - 1]);
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
        const filteredOptions = this.getFilteredOptions(this.state.inputValue);
        if (
          !this.state.menuOpen &&
          filteredOptions.length > 0
        ) {
          this.setState({
            menuOpen: true,
            focusedOption: filteredOptions[0],
          });
        } else if (filteredOptions.length == 0) {
          return;
        } else {
          const nextFocusedOption = this.state.focusedOption ?
            filteredOptions.reduce((acc, opt, idx, options) => {
              if (opt.id == this.state.focusedOption.id) {
                acc = options[idx + 1] || options[0];
              }
              return acc;
            }, null) :
            filteredOptions[0];

          this.handleFocusOption(nextFocusedOption, event.keyCode);
        }
        break;
      }
      // Arrow Up
      case 38: {
        const filteredOptions = this.getFilteredOptions(this.state.inputValue);
        if (filteredOptions.length == 0) {
          return;
        } else {
          const nextFocusedOption = this.state.focusedOption ?
            filteredOptions.reduce((acc, opt, idx, options) => {
              if (opt.id == this.state.focusedOption.id) {
                acc = options[idx - 1] || options[options.length - 1];
              }
              return acc;
            }, null) :
            filteredOptions[filteredOptions.length - 1];

          this.handleFocusOption(nextFocusedOption, event.keyCode);
        }
        break;
      }
    }
  }
  handleFocusOption = (focusedOption, keyCode) => {
    this.setState({ focusedOption });

    const focusedElement = $(
      `#rmss-menu-item-${focusedOption.id}`,
      this.containerRef.current,
    )[0];
    const menuContainerElement = $(
      '#rmss-menu-list-container',
      this.containerRef.current,
    )[0];
    const menuListElement = $(
      `#rmss-menu-list`,
      this.containerRef.current,
    )[0];

    const {
      clientHeight: menuContainerHeight,
      scrollTop: menuContainerScrollTop,
    } = menuContainerElement;
    const {
      scrollHeight: focusedElementHeight,
      offsetTop: focusedElementOffset,
    } = focusedElement;
    const { clientHeight: menuListHeight } = menuListElement;
    const filteredOptions = this.getFilteredOptions(this.state.inputValue);
    const focusedElementIdx = filteredOptions.findIndex(e => (
      e.id == focusedOption.id
    ));
    let newScrollHeight;
    if (keyCode == 38) {           // Arrow up
      if (focusedElementIdx == filteredOptions.length - 1) {
        newScrollHeight = menuListHeight;
      } else if (focusedElementOffset <= menuContainerScrollTop) {
        newScrollHeight = focusedElementOffset;
      }
    } else if (keyCode == 40) {    // Arrow down
      if (focusedElementIdx == 0) {
        newScrollHeight = 0;
      } else if (menuContainerHeight + menuContainerScrollTop <= focusedElementHeight + focusedElementOffset) {
        newScrollHeight = focusedElementOffset - (menuContainerHeight - focusedElementHeight);
      }
    } else {
      console.warn(`Calling 'handleFocusOption' with a keyCode that is neither arrow up or arrow down.`);
    }
    if (newScrollHeight !== undefined) {
      // prevents UI flicker
      setTimeout(() => {
        $(menuContainerElement).scrollTop(newScrollHeight);
      }, 100);
    }
  }
  handleChange = (option) => {
    this.setState({
      menuOpen: this.props.stayOpenAfterSelection != false,
      focusedOption: null,
      inputValue: '',
      enteringText: false,
    });

    if (this.props.multi) {
      this.props.handleChange([ ...(this.props.selectedValue || []), option ]);
    } else {
      this.props.handleChange(option);
    }
  }
  handleDeleteItem = (item) => {
    if (this.props.selectedValue.length == 1) {
      this.props.handleChange(null);
    } else {
      this.props.handleChange(this.props.selectedValue.filter(v => v.id != item.id));
    }
  }

  render() {
    return (
      <div
        className={this.props.classes.rmss_outer_container}
        ref={this.containerRef}
      >
        <div className={`${this.props.classes.rmss_global_container} ${this.props.containerClassName}`}>
          {this.props.children({
            getFilteredOptions: this.getFilteredOptions,
            handleInputChange: this.handleInputChange,
            handleClearValue: this.handleClearValue,
            handleKeyDown: this.handleKeyDown,
            handleChange: this.handleChange,
            toggleMenuOpen: bool => (
              this.state.menuOpen != bool ?
                this.setState({ menuOpen: bool }) :
                null
            ),
            toggleEnteringText: bool => (
              this.state.enteringText != bool ?
                this.setState({
                  enteringText: bool,
                  inputValue: this.state.inputValue == ' ' ? '' : this.state.inputValue,
                }) :
                null
            ),
            setFocusedOption: opt => this.setState({ focusedOption: opt }),
            handleDeleteItem: this.handleDeleteItem,
            ...this.state,
          })}
        </div>
      </div>
    );
  }
}

export default SelectContainer;
