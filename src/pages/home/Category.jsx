import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Menu, Box, Typography } from '@mui/material';
import FilterItem from './FilterItem';
import { useFetchGendersQuery } from 'store/reducers/api';
import Loader from 'components/Loader';

const Category = ({ anchorEl, open, handleClose }) => {
  const { data: genders = [], isFetching, refetch } = useFetchGendersQuery();
  const { gender } = useSelector((state) => state.action);
  if (isFetching) {
    return <Loader />;
  }
  if (!isFetching && genders.length === 0) {
    refetch();
  }

  return (
    <Menu
      id="category-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'category-button',
      }}
      sx={{ '& .MuiList-root': { backgroundColor: '#121212' } }}
    >
      <Box
        sx={{
          maxWidth: '400px',
          px: 4,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="body1" sx={{ width: 'fit-content' }}>
          Выберите категорию
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          {genders?.map((option) => (
            <FilterItem
              key={option.id}
              option={option}
              filter={'gender'}
              checked={gender.map((item) => parseInt(item))?.includes(option.id)}
            />
          ))}
        </Box>
      </Box>
    </Menu>
  );
};

export default Category;
