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
    };
  }

  render() {
    const select_options = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ];
    const multi_options = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ];
    const creatable_options = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ];

    const { classes } = this.props;

    return (
      <div className={classes.app_container}>
        <h4>Default Select</h4>
        <Select
          options={select_options}
          handleChange={value => this.setState({ default_value: value })}
          value={this.state.default_value}
        />

        <div className={classes.divider} />

        <h4>Multi Select</h4>
        <MultiSelect
          options={multi_options}
          handleChange={value => this.setState({ multi_value: value })}
          value={this.state.multi_value}
        />

        <h4>Multi Select : Creatable</h4>
        <Creatable
          options={creatable_options}
          handleChange={value => this.setState({ creatable_value: value })}
          value={this.state.creatable_value}
          onCreate={new_item => creatable_options.push(new_item)}
        />
      </div>
    );
  }
}

export default hot(module)(withStyles(exampleSyles)(App));
