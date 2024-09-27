import React from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { Button } from '@mui/material';
import { setFilterOptions, setGender } from 'store/reducers/action';
const FilterItem = ({ option, filter, checked }) => {
  const ref = React.useRef();
  const dispatch = useDispatch();

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
          if (filter === 'gender') {
            dispatch(setGender(e.target.value));
          } else {
            dispatch(
              setFilterOptions({
                id: option.id,
                filter,
              })
            );
          }
        }}
      />
      {option.name}
    </Button>
  );
};

export default FilterItem;
