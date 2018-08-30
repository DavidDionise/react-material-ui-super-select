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
      defaultValue: null,
      multiValue: null,
      creatableValue: null,
      manualValue: null,
      manualLoading: false,
      selectOptions: [
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ],
      multiOptions: [
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
      creatableOptions: [
        { id: '1', label: 'One' },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
      ],
      manualOptions: [],
    };

    this.possibleManualOptions = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
      { id: '3', label: 'Three' },
      { id: '4', label: 'Four' },
      { id: '5', label: 'Five' },
      { id: '6', label: 'Six' },
      { id: '7', label: 'Seven' },
      { id: '8', label: 'Eight' },
      { id: '9', label: 'Nine' },
    ];
    this.manualTimer = null;
  }

  handleManualInputChange = (value) => {
    if (this.manualTimer) {
      clearTimeout(this.manualTimer);
    }

    this.setState({ manualLoading: true });
    let filteredManualOptions;
    setTimeout(() => {
      if (value) {
        filteredManualOptions = this.possibleManualOptions.filter(opt => (
          new RegExp(value, 'i').test(opt.label)
        ));
      } else {
        filteredManualOptions = [];
      }

      this.setState({ manualOptions: filteredManualOptions, manualLoading: false });
      this.manualTimer = null;
    }, 500);
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app_container}>
        <h4>Default Select</h4>
        <Select
          label='Select'
          placeholder='Select an option'
          options={this.state.selectOptions}
          handleChange={value => this.setState({ defaultValue: value })}
          handleClearValue={() => this.setState({ defaultValue: null })}
          selectedValue={this.state.defaultValue}
        />

        <div className={classes.divider} />

        <h4>Multi Select</h4>
        <MultiSelect
          label='MultiSelect'
          options={this.state.multiOptions}
          handleChange={value => this.setState({ multiValue: value })}
          handleClearValue={() => this.setState({ multiValue: null })}
          selectedValue={this.state.multiValue}
          stayOpenAfterSelection
          containerClassName="multi-select-container"
        />

        <div className={classes.divider} />

        <h4>Multi Select : Creatable</h4>
        <Creatable
          label='Creatable'
          options={this.state.creatableOptions}
          handleChange={value => this.setState({ creatableValue: value })}
          handleClearValue={() => this.setState({ creatableValue: null })}
          selectedValue={this.state.creatableValue}
          handleCreate={value => this.setState({ creatableOptions: this.state.creatableOptions.concat(value) })}
        />

        <div className={classes.divider} />

        <h4>Manual (Type one of 'one', 'two', ... 'nine' to view the effect of the 'loading' prop)</h4>
        <Select
          manual
          loading={this.state.manualLoading}
          options={this.state.manualOptions}
          handleInputChange={this.handleManualInputChange}
          handleChange={value => this.setState({ manualValue: value })}
          handleClearValue={() => this.setState({ manualValue: null })}
          selectedValue={this.state.manualValue}
          label='Manual'
        />
      </div>
    );
  }
}

export default withStyles(exampleSyles)(hot(module)(App));
