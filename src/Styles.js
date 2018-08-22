export default theme => ({
  // Global
  rmss_outer_container: {
    position: 'relative',
  },
  rmss_global_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  rmss_global_input_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_global_input_element: {
    paddingRight: '20px',
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
    position: 'relative',
    display: 'inline-block',
    width: '20px',
  },
  rmss_global_close_button_container: {
    color: theme.palette.grey[700],
    fontSize: '16px',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  rmss_global_menu_paper_container: {
    overflowY: 'scroll',
    maxHeight: '200px',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  rmss_global_input_adornment_container: {
    width: '50px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rmss_input_and_label_container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  // Select
  rmss_input_container: {
    flex: '1',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  rmss_selected_value_container: {
    position: 'absolute',
    bottom: '4px',
    '& p': {
      ...theme.typography.subheading,
      margin: '0 0 0 0',
      position: 'relative',
    },
  },

  // MultiSelect
  rmss_multi_input_container: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  rmss_multi_text_field_width_tracker: {
    position: 'absolute',
    'visibility': 'hidden',
    ...theme.typography.subheading,
  },
  rmss_chip: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px 0 0`,
  },

  // Creatable
  rmss_creatable_input_container: {
    flex: '8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rmss_creatable_selectedValue_container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rmss_creatable_input_field_container: {
    flex: '1'
  },

});
