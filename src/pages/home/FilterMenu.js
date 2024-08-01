import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Menu, Box, Typography } from '@mui/material';
import FilterItem from './FilterItem';

const FilterMenu = ({ anchorEl, open, handleClose }) => {
  const { filter } = useSelector((state) => state.catalog);
  return (
    <Menu
      id="sort-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'sort-button',
      }}
      sx={{ '& .MuiList-root': { backgroundColor: '#121212' } }}
    >
      {filter.map((item) => (
        <Box
          key={item.id}
          sx={{
            maxWidth: '300px',
            px: 4,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="body1" sx={{ width: 'fit-content' }}>
            {item.name}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {item.options.map((option) => (
              <FilterItem key={option.id} option={option} filter={item.id} />
            ))}
          </Box>
        </Box>
      ))}
    </Menu>
  );
};

export default FilterMenu;
