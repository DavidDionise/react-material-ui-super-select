export default theme => ({
  // Global
  rmss_global_container: {
    display: 'flex',
    flexDirection: 'column',
  },
  rmss_global_input_container: {
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_global_menu_container: {
    position: 'relative',
  },
  rmss_global_menu_item: {
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
  rmss_global_actions_container: {
    flex: '2',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_global_close_button_container: {
    color: theme.palette.grey[700],
    '&:hover': {
      cursor: 'pointer',
    }
  },
  rmss_global_menu_paper_container: {
    overflowY: 'scroll',
    maxHeight: '200px',
  },

  // Select
  rmss_input_container: {
    flex: '8',
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

  // MultiSelect
  rmss_multi_input_container: {
    flex: '8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rmss_multi_selected_value_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_multi_text_field_wrapper: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minWidth: '50px',
  },
  rmss_multi_text_field_width_tracker: {
    position: 'absolute',
    'visibility': 'hidden',
    ...theme.typography.subheading,
  },
  rmss_chip: {
    margin: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
  },

  // Creatable
  rmss_creatable_input_container: {
    flex: '8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rmss_creatable_selected_value_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rmss_creatable_input_field_container: {
    flex: '1'
  },

});
