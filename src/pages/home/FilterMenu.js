import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Menu, Box, Typography } from '@mui/material';
import FilterItem from './FilterItem';
import FilterSlider from './FilterSlider';
import { useFetchServicesQuery } from 'store/reducers/api';
import Autocomplete from 'pages/authentication/auth-forms/Autocomplete';
import { setServices } from 'store/reducers/action';
import Loader from 'components/Loader';

const FilterMenu = ({ anchorEl, open, handleClose }) => {
  const { services: defaultServices } = useSelector((state) => state.action);
  const { filter: filters } = useSelector((state) => state.catalog);
  const { data: services = [], isFetching: isFetchingServices } = useFetchServicesQuery();
  const dispatch = useDispatch();

  const handleServiceChange = (event) => {
    dispatch(setServices(event));
  };

  if (isFetchingServices) {
    return <Loader />;
  }

  return (
    <Menu
      id="sort-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'sort-button',
      }}
      sx={{
        boxShadow: (theme) => theme.customShadows.z1,
        '& .MuiList-root': { backgroundColor: '#121212', minWidth: { xs: '350px', sm: '400px' } },
      }}
    >
      {filters.map((filter) => (
        <Box
          key={filter.id}
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
            {filter.name}
          </Typography>
          {filter.type === 'button' && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {filter.options.map((option) => (
                <FilterItem
                  key={option.id}
                  option={option}
                  filter={filter.id}
                  checked={option.id === filter.option}
                />
              ))}
            </Box>
          )}
          {filter.type === 'swiper' && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              <FilterSlider filter={filter} />
            </Box>
          )}
        </Box>
      ))}

      {services.length > 0 && (
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
            Услуги
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1} width="100%" alignItems="stretch">
            <Autocomplete
              value={defaultServices}
              values={services || []}
              setValues={handleServiceChange}
            />
          </Box>
        </Box>
      )}
    </Menu>
  );
};

export default FilterMenu;
