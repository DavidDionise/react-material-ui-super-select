export default theme => ({
  app_container: {
    '& h4': { ...theme.typography.title },

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  divider: {
    margin: '10px 0 10px 0',
  },
});
