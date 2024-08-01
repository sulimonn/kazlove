import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Menu, Box, Typography, IconButton } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import { setSortOption } from 'store/reducers/catalog';

const SortMenu = ({ anchorEl, open, handleClose }) => {
  const { sort } = useSelector((state) => state.catalog);
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
          <Box>
            <IconButton
              onClick={() => {
                dispatch(setSortOption({ id: item.id, option: 'asc' }));
              }}
              sx={{
                border: item.option === 'asc' && '1px solid',
                borderColor: item.option === 'asc' ? 'primary.main' : '',
              }}
            >
              <SortIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(setSortOption({ id: item.id, option: 'desc' }));
              }}
              sx={{
                transform: 'rotateX(180deg)',
                border: item.option === 'desc' && '1px solid',
                borderColor: item.option === 'desc' ? 'primary.main' : '',
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
