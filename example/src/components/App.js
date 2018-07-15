require('react-hot-loader');
import React from 'react';
import { Select, MultiSelect, Creatable } from 'react-material-ui-super-select';
import withStyles from '@material-ui/core/styles/withStyles';
import exampleSyles from './exampleSyles';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default_value: null,
      multi_value: null,
      creatable_value: null,
      select_options: [
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ],
      multi_options: [
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
        { id: '4', label: 'Four' },
        { id: '5', label: 'Five' },
        { id: '6', label: 'Six' },
        { id: '7', label: 'Seven' },
        { id: '8', label: 'Eight' },
        { id: '9', label: 'Nine' },
      ],
      creatable_options: [
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ],
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app_container}>
        <h4>Default Select</h4>
        <Select
          label='Select'
          options={this.state.select_options}
          handleChange={value => this.setState({ default_value: value })}
          handleClearValue={() => this.setState({ default_value: null })}
          selected_value={this.state.default_value}
        />

        <div className={classes.divider} />

        <h4>Multi Select</h4>
        <MultiSelect
          label='MultiSelect'
          options={this.state.multi_options}
          handleChange={value => this.setState({ multi_value: value })}
          handleClearValue={() => this.setState({ multi_value: null })}
          selected_value={this.state.multi_value}
          stay_open_after_selection
        />

        <div className={classes.divider} />

        <h4>Multi Select : Creatable</h4>
        <Creatable
          label='Creatable'
          options={this.state.creatable_options}
          handleChange={value => this.setState({ creatable_value: value })}
          handleClearValue={() => this.setState({ creatable_value: null })}
          selected_value={this.state.creatable_value}
          onCreate={value => this.setState({ creatable_options: this.state.creatable_options.concat(value) })}
        />
      </div>
    );
  }
}

export default withStyles(exampleSyles)(hot(module)(App));
