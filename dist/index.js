import withStyles from '@material-ui/core/styles/withStyles';
import selectStyles from './Styles';
import UnStyledSelect from './Select.jsx';
import UnStyledMultiSelect from './MultiSelect.jsx';
import UnStyledCreatable from './Creatable.jsx';

var Select = withStyles(selectStyles)(UnStyledSelect);
var MultiSelect = withStyles(selectStyles)(UnStyledMultiSelect);
var Creatable = withStyles(selectStyles)(UnStyledCreatable);

export default Select;

export { Select, MultiSelect, Creatable };