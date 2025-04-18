import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { Container, Grid, Stack, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// third-party
import TuneIcon from '@mui/icons-material/Tune';
import { Sort } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';

// project import
import Card from './Card';
import SortMenu from './SortMenu';
import FilterMenu from './FilterMenu';
import { useFetchCitiesQuery, useFetchProfilesQuery } from 'store/reducers/api';
import { openModal } from 'store/reducers/menu';
import Loader from 'components/Loader';
import { shufflePerPromotionLevel, transliterate } from 'utils/createPreview';
import Category from './Category';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const Profiles = ({ count = 0 }) => {
  const { citySlug } = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { data = [], isFetching } = useFetchProfilesQuery();
  const { data: cities = [], isFetching: isFetchingCities } = useFetchCitiesQuery();

  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);
  const [filterAnchorEl, setfilterAnchorEl] = React.useState(null);
  const [categAnchEl, setCategAnchEl] = React.useState(null);
  const [girls, setGirls] = React.useState(data);
  const sortOpen = Boolean(sortAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);
  const categOpen = Boolean(categAnchEl);
  const { city, gender, weight, height, age, price, breast_size, services, sortOption } =
    useSelector((state) => state.action);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setSortAnchorEl(null);
  };
  React.useEffect(() => {
    if (data.length > 0) {
      setGirls(data);
    }
  }, [data]);

  const handleOpen = () => {
    dispatch(openModal({ modalOpen: true }));
  };
  useEffect(() => {
    if (city === -2) {
      dispatch(openModal({ modalOpen: true }));
    }
  }, [dispatch, city]);

  useEffect(() => {
    if (data.length > 0) {
      // Filter girls with promotion_level S based on conditions
      const filteredGirls = data
        .filter((girl) => girl.approved === 1 && girl.checked === 1 && girl.hidden === 0)
        .map((girl) => ({
          ...girl,
          promotion_level: girl?.tariff?.type?.promotion_level || 0,
        }));
      const promotionTop = shufflePerPromotionLevel(
        filteredGirls.filter((girl) => {
          return (
            (transliterate(girl.city?.id) === citySlug || city <= 0) && girl.promotion_level > 0
          );
        })
      );

      let promotionStn = filteredGirls.filter(
        (girl) => !girl.promotion_level && transliterate(girl.city?.id) === citySlug
      );

      if (gender.length > 0) {
        promotionStn = promotionStn.filter((girl) =>
          gender.map((g) => parseInt(g, 10)).includes(girl.gender?.id)
        );
      }

      if (services.length > 0) {
        const selectedServiceIds = services.map((s) => s.id);

        promotionStn = promotionStn.filter((girl) =>
          girl.services.some((service) => selectedServiceIds.includes(service.id))
        );
      }

      if (weight.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.weight >= weight[0] && girl.weight <= weight[1]
        );
      }

      if (height.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.height >= height[0] && girl.height <= height[1]
        );
      }

      if (age.length > 0) {
        promotionStn = promotionStn.filter((girl) => girl.age >= age[0] && girl.age <= age[1]);
      }

      if (price.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.price >= price[0] && girl.price <= price[1]
        );
      }

      if (breast_size.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.breast_size >= breast_size[0] && girl.breast_size <= breast_size[1]
        );
      }

      // Shuffle filtered S
      promotionStn = !sortOption?.id
        ? shufflePerPromotionLevel(promotionStn)
        : sortOption?.option === 'desc'
          ? [...promotionStn].sort((a, b) => (a[sortOption.id] > b[sortOption.id] ? -1 : 1))
          : [...promotionStn].sort((a, b) => (a[sortOption.id] > b[sortOption.id] ? 1 : -1));

      const remainingStn = !sortOption?.id
        ? shufflePerPromotionLevel(
            filteredGirls.filter(
              (girl) =>
                !promotionStn.includes(girl) &&
                !promotionTop.includes(girl) &&
                girl.city?.id === city
            )
          )
        : sortOption?.option === 'desc'
          ? [
              ...filteredGirls.filter(
                (girl) =>
                  !promotionStn.includes(girl) &&
                  !promotionTop.includes(girl) &&
                  girl.city?.id === city
              ),
            ].sort((a, b) => (a[sortOption.id] > b[sortOption.id] ? -1 : 1))
          : [
              ...filteredGirls.filter(
                (girl) =>
                  !promotionStn.includes(girl) &&
                  !promotionTop.includes(girl) &&
                  girl.city?.id === city
              ),
            ].sort((a, b) => (a[sortOption.id] > b[sortOption.id] ? 1 : -1));

      const remainingTop = shufflePerPromotionLevel(
        filteredGirls.filter(
          (girl) =>
            girl.promotion_level > 0 && transliterate(girl.city?.id) !== citySlug && city >= 0
        )
      );

      let remainingGirls = filteredGirls.filter(
        (girl) =>
          !promotionStn.includes(girl) &&
          !remainingTop.includes(girl) &&
          !promotionTop.includes(girl) &&
          transliterate(girl.city?.id) !== citySlug
      );

      remainingGirls = !sortOption?.id
        ? shufflePerPromotionLevel(remainingGirls)
        : sortOption?.option === 'desc'
          ? [...remainingGirls].sort((a, b) => {
              if (a[sortOption.id] > b[sortOption.id]) {
                return -1;
              }
              if (a[sortOption.id] < b[sortOption.id]) {
                return 1;
              }
              return 0;
            })
          : [...remainingGirls].sort((a, b) => {
              if (a[sortOption.id] > b[sortOption.id]) {
                return 1;
              }
              if (a[sortOption.id] < b[sortOption.id]) {
                return -1;
              }
              return 0;
            });

      // Combine all arrays in the desired order
      const finalGirls = [
        ...promotionTop,
        ...promotionStn,
        ...remainingStn,
        ...remainingTop,
        ...remainingGirls,
      ];

      // Update state
      setGirls(finalGirls);
      setLoading(false);
    } else if (!isFetching && !isFetchingCities) {
      setLoading(false);
    }
  }, [
    data,
    citySlug,
    city,
    gender,
    weight,
    height,
    age,
    price,
    breast_size,
    services,
    sortOption,
    isFetching,
    isFetchingCities,
  ]);

  if (isFetching || isFetchingCities || loading) {
    return <Loader />;
  }

  return (
    <>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          mb={1}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <Button
            color="secondary"
            startIcon={<CategoryIcon />}
            sx={{ px: 2, py: 1 }}
            id="category-button"
            aria-controls={categOpen ? 'category-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={categOpen ? 'true' : undefined}
            onClick={(event) => setCategAnchEl(event.currentTarget)}
          >
            <Typography variant="body1">Пол</Typography>
          </Button>
          <Button
            color="primary"
            startIcon={<LocationOnIcon />}
            onClick={handleOpen}
            sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
          >
            {city !== -2
              ? [...cities, { id: -1, name: 'Все города' }]?.find((item) => item.id === city)?.name
              : 'Выбрать город'}
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            {!matches && (
              <Button
                color="secondary"
                startIcon={<CategoryIcon />}
                sx={{ px: 2, py: 1, display: { xs: 'none', sm: 'flex' } }}
                id="category-button"
                aria-controls={categOpen ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={categOpen ? 'true' : undefined}
                onClick={(event) => setCategAnchEl(event.currentTarget)}
              >
                <Typography variant="body1">Пол</Typography>
              </Button>
            )}
            <Button
              color="secondary"
              startIcon={<TuneIcon />}
              sx={{ px: 2, py: 1 }}
              id="filter-button"
              aria-controls={filterOpen ? 'filter-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={filterOpen ? 'true' : undefined}
              onClick={(event) => setfilterAnchorEl(event.currentTarget)}
            >
              <Typography variant="body1">Предпочтения</Typography>
            </Button>
          </Stack>
          <Button
            color="secondary"
            startIcon={
              <Sort
                sx={{
                  transform: sortOption?.option === 'asc' ? 'rotateX(180deg)' : 'rotate(0deg)',
                }}
              />
            }
            sx={{ px: 2, py: 1 }}
            id="sort-button"
            aria-controls={sortOpen ? 'sort-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={sortOpen ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography variant="body1">
              Сортировать{' '}
              <Typography
                variant="body1"
                component="span"
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                {sortOption?.selected ? ': ' + sortOption.selected : ''}
              </Typography>
            </Typography>
          </Button>
        </Stack>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {girls.slice(0, count === 0 ? girls.length : count).map((girl) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={girl.id}>
              <Card girl={girl} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <SortMenu anchorEl={sortAnchorEl} open={sortOpen} handleClose={handleClose} />
      <Category anchorEl={categAnchEl} open={categOpen} handleClose={() => setCategAnchEl(null)} />
      <FilterMenu
        anchorEl={filterAnchorEl}
        open={filterOpen}
        handleClose={() => setfilterAnchorEl(null)}
      />
    </>
  );
};

export default Profiles;
