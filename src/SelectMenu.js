import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const SelectMenu = props => (
  <div className={props.classes.rmss_global_menu_container}>
    <ClickAwayListener
      onClickAway={props.onClickAway}
    >
      <Grow
        in={props.open}
        mountOnEnter
        unmountOnExit
      >
        <Paper classes={{ root: props.classes.rmss_global_menu_paper_container }}>
          <MenuList id='rmss-menu-list'>
            {props.options.map(opt => {
              const selected = opt.id == (props.selectedValue || {}).id;
              const focused = opt.id == (state.focusedOption || {}).id;

              return (
                <MenuItem
                  key={opt.id}
                  id={`rmss-menu-item-${opt.id}`}
                  onClick={() => props.handleSelectOption(opt)}
                  onMouseEnter={() => props.handleMouseEnterOption({ focusedOption: opt })}
                  className={`${props.classes.rmss_global_menu_item} ${selected && !focused ? 'selected' : focused ? 'focused' : ''}`}
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
);

SelectMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  classes: PropTypes.object.isRequired,
  onClickAway: PropTypes.func.isRequired,
  handleSelectOption: PropTypes.func.isRequired,
  handleMouseEnterOption: PropTypes.func.isRequired,
  selectedValue: PropTypes.object,
  focusedOption: PropTypes.object,
  menuItemRenderer: PropTypes.func,
};

SelectMenu.defaultProps = {
  selectedValue: null,
  focusedOption: null,
  menuItemRenderer: null,
};
