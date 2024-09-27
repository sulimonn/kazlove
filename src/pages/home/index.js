import React, { useEffect } from 'react';

// material-ui
import { Container, Grid, Stack, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// third-party
import { FilterOutlined } from '@ant-design/icons';
import { Sort } from '@mui/icons-material';

// project import
import Card from './Card';
import SortMenu from './SortMenu';
import FilterMenu from './FilterMenu';
import { useFetchProfilesQuery } from 'store/reducers/api';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Home = () => {
  const { data = [] } = useFetchProfilesQuery();
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);
  const [filterAnchorEl, setfilterAnchorEl] = React.useState(null);
  const [girls, setGirls] = React.useState(data);
  const sortOpen = Boolean(sortAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);
  const { city, gender, weight, height, age, price, breast_size, services } = useSelector(
    (state) => state.action
  );

  const handleClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSortAnchorEl(null);
  };
  React.useEffect(() => {
    if (data.length > 0) {
      setGirls(data);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      let filteredGirls = data;

      if (typeof city === 'number' && city > 0) {
        filteredGirls = filteredGirls.filter((girl) => girl.city?.id === city);
      }

      if (gender.length > 0) {
        filteredGirls = filteredGirls.filter((girl) =>
          gender.map((g) => parseInt(g, 10)).includes(girl.gender?.id)
        );
      }
      if (services.length > 0) {
        console.log(services);
        filteredGirls = filteredGirls.filter((girl) =>
          services
            .map((s) => parseInt(s.id))
            .map((s) => s)
            .includes(girl.profile_type?.id)
        );
      }

      if (weight.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.weight >= weight[0] && girl.weight <= weight[1]
        );
      }

      if (height.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.height >= height[0] && girl.height <= height[1]
        );
      }

      if (age.length > 0) {
        filteredGirls = filteredGirls.filter((girl) => girl.age >= age[0] && girl.age <= age[1]);
      }

      if (price.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.price >= price[0] && girl.price <= price[1]
        );
      }

      if (breast_size.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.breast_size >= breast_size[0] && girl.breast_size <= breast_size[1]
        );
      }

      setGirls(filteredGirls);
    }
  }, [city, gender, data, weight, height, age, price, breast_size, services]);

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={5}>
          <Button
            color="secondary"
            startIcon={<FilterOutlined />}
            sx={{ px: 2, py: 1 }}
            id="filter-button"
            aria-controls={filterOpen ? 'filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={filterOpen ? 'true' : undefined}
            onClick={(event) => setfilterAnchorEl(event.currentTarget)}
          >
            <Typography variant="body1">Предпочтения</Typography>
          </Button>
          <Button
            color="secondary"
            startIcon={<Sort />}
            sx={{ px: 2, py: 1 }}
            id="sort-button"
            aria-controls={sortOpen ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={sortOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography variant="body1">Сортировать</Typography>
          </Button>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {girls.map((girl) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={girl.id}>
              <Card girl={girl} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <SortMenu
        anchorEl={sortAnchorEl}
        open={sortOpen}
        handleClose={handleClose}
        girls={girls}
        setGirls={setGirls}
      />
      <FilterMenu
        anchorEl={filterAnchorEl}
        open={filterOpen}
        handleClose={() => setfilterAnchorEl(null)}
      />
    </>
  );
};

export default Home;
