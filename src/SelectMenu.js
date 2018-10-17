import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles';

class SelectMenu extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (
      _.isEqual(nextProps.options, this.props.options) &&
      _.isEqual(nextProps.focusedOption, this.props.focusedOption) &&
      nextProps.open === this.props.open
    ) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className={this.props.classes.rmss_global_menu_container}>
        <ClickAwayListener
          onClickAway={this.props.onClickAway}
          target="window"
        >
          <div>
            <Grow
              in={this.props.open}
              mountOnEnter
              unmountOnExit
            >
              <Paper
                classes={{ root: this.props.classes.rmss_global_menu_paper_container }}
                id="rmss-menu-list-container"
              >
                <MenuList id="rmss-menu-list">
                  {this.props.options.map(opt => {
                    const selected = this.props.multi ? false : opt.id == (this.props.selectedValue || {}).id;
                    const focused = opt.id == (this.props.focusedOption || {}).id;

                    return (
                      <MenuItem
                        key={opt.id}
                        id={`rmss-menu-item-${opt.id}`}
                        onClick={() => this.props.handleChange(opt)}
                        onMouseEnter={() => this.props.handleMouseEnterOption(opt)}
                        className={`${this.props.classes.rmss_global_menu_item} ${selected && !focused ? 'selected' : focused ? 'focused' : ''}`}
                      >
                        {this.props.MenuItem ? <MenuItem option={opt} /> : opt.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Paper>
            </Grow>
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

SelectMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  classes: PropTypes.object.isRequired,
  onClickAway: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleMouseEnterOption: PropTypes.func.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  focusedOption: PropTypes.object,
  MenuItem: PropTypes.func,
};

SelectMenu.defaultProps = {
  selectedValue: null,
  focusedOption: null,
  MenuItem: null,
  chipInLastRow: null,
};

export default withStyles(Styles)(SelectMenu);
