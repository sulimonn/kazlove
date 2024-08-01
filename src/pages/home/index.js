import React from 'react';

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

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Home = () => {
  const { girls } = useSelector((state) => state.girls);
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);
  const [filterAnchorEl, setfilterAnchorEl] = React.useState(null);
  const sortOpen = Boolean(sortAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);
  const handleClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSortAnchorEl(null);
  };
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
      <SortMenu anchorEl={sortAnchorEl} open={sortOpen} handleClose={handleClose} />
      <FilterMenu
        anchorEl={filterAnchorEl}
        open={filterOpen}
        handleClose={() => setfilterAnchorEl(null)}
      />
    </>
  );
};

export default Home;
