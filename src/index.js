import React from 'react';
import Select from './Select';
import MultiSelect from './MultiSelect';
const Creatable = props => <MultiSelect {...props} creatable />

export {
  Select,
  MultiSelect,
  Creatable
};
