import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Drawer, Box, Typography, Button, Stack, IconButton } from '@mui/material';
import FilterItem from './FilterItem';
import FilterSlider from './FilterSlider';
import { useFetchTypesQuery } from 'store/reducers/api';
import { setSwiperFilter, setServices } from 'store/reducers/action';
import Loader from 'components/Loader';
import ServiceSelect from './ServiceSelect';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';

const FilterMenu = ({ anchorEl, open, handleClose }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { services: selectedServices } = useSelector((state) => state.action);
  const { filter: filters } = useSelector((state) => state.catalog);
  const { data: serviceTypes = [], isFetching: isFetchingServices, refetch } = useFetchTypesQuery();
  const dispatch = useDispatch();
  const [savedFilters, saveFilters] = React.useState([]);
  const [services, saveServices] = React.useState([]);

  const handleServiceChange = (event) => {
    saveServices(event);
  };

  if (isFetchingServices) {
    return <Loader />;
  }

  if (serviceTypes.length === 0) {
    refetch();
  }

  const handleSave = () => {
    dispatch(setServices(services));
    savedFilters.forEach((filter) => {
      dispatch(setSwiperFilter(filter));
    });
    handleClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'sort-button',
      }}
      sx={{
        boxShadow: (theme) => theme.customShadows.z1,
        '& .MuiPaper-root': {
          maxWidth: matchDownSM ? '100%' : { xs: '350px', sm: '400px' },
          backgroundColor: '#121212 !important',
          opacity: 1,
          backgroundImage: 'none',
          overflow: 'hidden',
          inset: matchDownSM ? '0 !important' : ' 0 auto !important',
          position: 'relative',
        },
      }}
    >
      <Stack
        direction="column"
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: '#121212 !important',
          minWidth: matchDownSM ? '100%' : { xs: '350px', sm: '400px' },
          maxHeight: '100%',
          height: '100%',
          paddingTop: 4,
          paddingBottom: '150px',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ff66c4',
            borderRadius: '10px',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 3, pr: 2, pl: 4 }}
        >
          <Typography variant="h4">Предпочтения</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        {filters.map((filter) => (
          <Box
            key={filter.id}
            sx={{
              maxWidth: '400px',
              px: 4,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h5" sx={{ width: 'fit-content' }}>
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
                <FilterSlider
                  filter={filter}
                  saveFilters={saveFilters}
                  savedFilters={savedFilters}
                />
              </Box>
            )}
          </Box>
        ))}

        {serviceTypes.length > 0 && (
          <Box
            sx={{
              maxWidth: '400px',
              px: 4,
              py: 1,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1" sx={{ width: 'fit-content' }}>
              Услуги
            </Typography>
            <Box display="flex" flexWrap="wrap" width="100%" alignItems="stretch">
              <ServiceSelect
                servicesTypes={serviceTypes}
                handleServiceChange={handleServiceChange}
                selectedServices={selectedServices}
              />
            </Box>
          </Box>
        )}
      </Stack>
      <Box sx={{ position: 'absolute', width: '100%', bottom: 0, left: 0 }}>
        <Box
          sx={{
            width: '100%',
            height: '25px',
            background: 'linear-gradient(#121212, rgba(0,0,0,0))',
            pointerEvents: 'none',
            transform: 'rotate(180deg)',
          }}
        />
        <Stack
          direction="column"
          spacing={2}
          justifyContent="space-between"
          sx={{ backgroundColor: '#121212', p: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              savedFilters.forEach((filter) => {
                dispatch(
                  setSwiperFilter({
                    id: filter.id,
                    option: [
                      filters.find((f) => f.id === filter.id).min,
                      filters.find((f) => f.id === filter.id).max,
                    ],
                  })
                );
              });
              dispatch(setServices([]));
              handleClose();
            }}
          >
            сбросить
          </Button>
          <Button variant="contained" onClick={handleSave}>
            применить
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FilterMenu;
