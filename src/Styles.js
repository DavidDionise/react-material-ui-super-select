export default theme => ({
  rmss_container: {
    display: 'flex',
    flexDirection: 'column',
  },
  rmss_input_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_selected_value_container: {
    position: 'absolute',
    '& p': {
      ...theme.typography.body2,
      position: 'relative',
      bottom: '10px',
    },
  },
  rmss_menu_container: {
    position: 'relative',
  },
  rmss_menu_item: {
    '&:hover': {
      backgroundColor: 'white',
    },
    '&.selected': {
      backgroundColor: `${theme.palette.grey[100]} !important`,
    },
    '&.focused': {
      backgroundColor: `${theme.palette.grey[200]} !important`,
    },
  },

  // Multi
  rmss_multi_input_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_multi_selected_value_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_chip: {
    marginRight: theme.spacing.unit,
  }
});
