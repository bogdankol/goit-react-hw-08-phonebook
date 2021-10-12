import { useSelector, useDispatch } from "react-redux";
import { contactsOperations } from "../../redux/contacts";
import { contactsSelectors } from "../../redux/contacts";
import TextField from "@material-ui/core/TextField";
import s from './Filter.module.css';

function Filter() {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    dispatch(contactsOperations.filterContacts(e.target.value));
  };

  return (
    <div className={s.div}>
      <TextField
        fullWidth
        id="filter"
        name="filter"
        label="Enter some symbols to filter your contacts-list"
        value={value}
        onChange={onFilterChange}
      />
    </div>
  );
}

export default Filter;
