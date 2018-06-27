import withStyles from '@material-ui/core/styles/withStyles';
import selectStyles from './Styles';
import UnStyledSelect from './Select.jsx';
import UnStyledMultiSelect from './MultiSelect.jsx';
import UnStyledCreatable from './Creatable.jsx';

const Select = withStyles(selectStyles)(UnStyledSelect);
const MultiSelect = withStyles(selectStyles)(UnStyledMultiSelect);
const Creatable = withStyles(selectStyles)(UnStyledCreatable);

export default Select;

export {
  Select,
  MultiSelect,
  Creatable
};
