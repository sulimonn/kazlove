import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button } from '@mui/material';
import { setFilterOptions } from 'store/reducers/action';
const FilterItem = ({ option }) => {
  const ref = React.useRef();
  const { filterOptions } = useSelector((state) => state.action);
  const dispatch = useDispatch();
  const checked = filterOptions.find((child) => child.id === option.id)?.checked || false;

  return (
    <Button
      key={option.id}
      onClick={() => {
        ref.current.click();
      }}
      variant={checked ? 'contained' : 'outlined'}
    >
      <input
        type="checkbox"
        ref={ref}
        hidden
        checked={checked}
        name={option.id}
        value={option.id}
        onChange={(e) => {
          console.log(e.target.checked, option.id);
          dispatch(setFilterOptions({ id: option.id, checked: e.target.checked }));
        }}
      />
      {option.name}
    </Button>
  );
};

export default FilterItem;
