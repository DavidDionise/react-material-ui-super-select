## React Material UI Super Select

Select drop down field that uses the beautiful stylings of Material UI, but adds option for multi select and creatable select.

The functionality of this select box was inspired by [react-select](https://github.com/JedWatson/react-select).

#### Installation and use

`npm install -s react-material-ui-super-select`

The package exports `Select`, `MultiSelect`, and `Creatable`.

Example use :

```javascript
import React from 'react';
import { Select } from 'react-material-ui-super-select';

class App extends React.Component {
  state = {
    value: null,
    options: [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
      { id: '3', label: 'Three' },
    ],
  };

  render() {
    return (
      <Select
        label='Select'
        options={this.state.options}
        handleChange={value => this.setState({ value })}
        handleClearValue={() => this.setState({ value: null })}
        selectedValue={this.state.value}
        containerClassName="select-container"
      />
    );
  }
}
```

#### Demo
To run the demo project :
* Navigate to root directory of project
* Enter `npm install`
* Once finished installing, enter `npm start`
* When the server starts, navigate to `http://localhost:8080`

Navigate to `example/src` to modify the demo app

#### Props

Name | Data Type | Default | Description
--- | --- | --- | --- |
`options`| `Array<{ id: String, label: string }>` | | *required* - Used to render the options list. Only `label` will be displayed. `id` MUST be unique among the other elements in the list
`selectedValue` | `{ id: String, label: String }` *or* `Array<{ id: String, label: String}>` | null | For the `Select` component, this must be an object that matches one of the objects in the `options` prop. For the `MultiSelect` and `Creatable` components, this must be an array of objects that each match objects in the `options` prop.
`containerClassName` | `String` | | Concatenated className to the component's outer `<div>`
`handleInputChange` | `Function` | | Called with the user's input when the input is changed
`handleChange` | `Function` | | Function called when an option is selected. In the `Select` component, the
`handleClearValue` | `Function` | | Function called when the clear button is clicked
`MenuItem` | `Node` | | Optional component to render in place of the default menu item. Will receive a prop named `option`, which will be the option that is being rendered
`stayOpenAfterSelection` | `Boolean` | `false` | If set to true, the menu will stay open after a selection has been made
`placeholder` | `String` | | The input field's placeholder
`label` | `String` | | The input field's label
`loading` | `Boolean` | `false` | If true, a progress spinner will appear in place of the clear button, and functionality will be disabled.
`disabled` | `Boolean` | `false` | If true, all functionality will be disabled, and select field will be read-only
`manual` | `Boolean` | `false` | Under the hood, this package filters the visible options based on user input. If `manual` is true, the component won't do any filtering, and all management of options filtering will need to be done manually.
`hideLabel` | `Boolean` | `false` | If set to true, the label will be hidden
`handleCreate` | `Function` | | Only applicalble for the `Creatable` component; called after a user hits 'Enter' to create a new option
