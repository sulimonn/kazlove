import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Menu, Box, Typography, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { setSortOption } from 'store/reducers/action';

const SortMenu = ({ anchorEl, open, handleClose, girls = [], setGirls }) => {
  const { sort } = useSelector((state) => state.catalog);
  const { sortOption } = useSelector((state) => state.action);
  const dispatch = useDispatch();
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
      {sort.map((item) => (
        <Box
          key={item.id}
          sx={{
            px: 4,
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Typography variant="body1" sx={{ width: 'fit-content' }}>
            {item.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => {
                dispatch(setSortOption({ id: item.id, option: 'desc' }));

                // sort
                const sorted = [...girls].sort((a, b) => {
                  if (a[item.id] > b[item.id]) {
                    return -1;
                  }
                  if (a[item.id] < b[item.id]) {
                    return 1;
                  }
                  return 0;
                });
                setGirls(sorted);
              }}
              sx={{
                border: item.id === sortOption.id && sortOption.option === 'desc' && '1px solid',
              }}
            >
              <SortIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(setSortOption({ id: item.id, option: 'asc' }));

                // sort
                const sorted = [...girls].sort((a, b) => {
                  if (a[item.id] > b[item.id]) {
                    return 1;
                  }
                  if (a[item.id] < b[item.id]) {
                    return -1;
                  }
                  return 0;
                });
                setGirls(sorted);
              }}
              sx={{
                transform: 'rotateX(180deg)',
                border: item.id === sortOption.id && sortOption.option === 'asc' && '1px solid',
              }}
            >
              <SortIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Menu>
  );
};

export default SortMenu;
