import React from 'react';
import { Link } from 'react-router-dom';

import { Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
// material-ui
import { Box, Typography, Button } from '@mui/material';
import { useGetProfilePhotosQuery } from 'store/reducers/api';

const Card = ({ girl }) => {
  const [showContact, setShowContact] = React.useState(false);
  const [photos, setPhotos] = React.useState();

  const swiperRef = React.useRef(null);

  const { data = [] } = useGetProfilePhotosQuery(girl.id);

  React.useEffect(() => {
    if (data.length > 0) {
      setPhotos(
        data.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }
  }, [data]);

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  }, []);

  return (
    <Box
      height={'550px'}
      borderRadius={2}
      sx={{
        background:
          girl.promotion_level === 2
            ? 'linear-gradient(to right, #462523 0, #cb9b51 45%,   #f6e27a 75%, #cb9b51 100%)'
            : girl.promotion_level === 1
              ? 'linear-gradient( to right, #2c003e 0%,rgb(62, 0, 43) 100%)'
              : 'background.paper',
        border: '1px solid',
        borderColor:
          girl.promotion_level === 2 || girl.promotion_level === 1 ? 'transparent' : 'divider',
        position: 'relative',
        boxShadow:
          girl.promotion_level === 2
            ? '0 4px 15px rgba(255, 215, 0, 0.5)' // VIP shadow
            : girl.promotion_level === 1
              ? '0 4px 15px rgba(138, 43, 226, 0.5)' // Top shadow
              : 'none',
        '& .swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal': {
          top: 'var(--swiper-scrollbar-bottom, 4px)',
          bottom: 'var(--swiper-scrollbar-top, auto)',
        },
      }}
      onMouseEnter={() => swiperRef.current.autoplay.start()} // stop autoplay on hover
      onMouseLeave={() => swiperRef.current.autoplay.stop()}
    >
      {girl.promotion_level !== 0 && girl.tariff?.type?.name && (
        <Box
          position="absolute"
          top={10}
          left={10}
          bgcolor="gold"
          color="black"
          px={2}
          py={1}
          zIndex={10}
          borderRadius={1}
          sx={{
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            transform: 'rotate(-20deg) translate(-15px, -15px)',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {girl.tariff?.type?.name}
          </Typography>
        </Box>
      )}

      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        style={{ height: '100%' }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <Link to={`/profile/${girl.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              height={'400px'}
              width={'100%'}
              sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
            >
              {photos && photos[0]?.upload && (
                <img
                  src={photos[0]?.upload}
                  alt="girl"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              )}
            </Box>
            <Box position={'absolute'} bottom={0} p={2} minHeight={'170px'}>
              <Typography variant="h3" color="text.primary">
                {girl.name} {girl.age}
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight={'900'} my={1}>
                {girl?.city?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                {girl.additional_info.length > 80
                  ? girl.additional_info.substring(0, 80) + '...'
                  : girl.additional_info}
              </Typography>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ position: 'absolute', bottom: 5 }}
                fontWeight={'bold'}
              >
                от {new Intl.NumberFormat('ru-RU').format(girl.price)} ₸
              </Typography>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={`/profile/${girl.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              height={'400px'}
              width={'100%'}
              sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
            >
              <img
                src={photos && photos[1]?.upload}
                alt="girl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </Box>
            <Box position={'absolute'} bottom={0} p={2} minHeight={'140px'}>
              <Typography variant="h5" color="text.secondary" whiteSpace={'pre-line'} mb={1}>
                {girl.nationality}, {girl?.profile_type?.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" whiteSpace={'pre-line'} mb={1}>
                {girl.breast_size} размер груди, {girl.weight}, {girl.height}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                {girl?.services?.map((service) => service.name).join(', ')}
              </Typography>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            height={'400px'}
            width={'100%'}
            sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
          >
            <img
              src={photos && photos[2]?.upload}
              alt="girl"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </Box>
          <Box
            position={'absolute'}
            bottom={0}
            p={2}
            minHeight={'140px'}
            width={'auto'}
            right={0}
            left={0}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'stretch'}
              flexDirection={'column'}
              minHeight={'140px'}
              width={'100%'}
              gap={2}
              onMouseEnter={() => swiperRef.current.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.autoplay.start()}
            >
              {!showContact ? (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%' }}
                  onClick={() => setShowContact(true)}
                >
                  Показать контакты
                </Button>
              ) : (
                <Box>
                  <Box
                    component="a"
                    target="_blank"
                    href={'tel:' + girl.phone}
                    sx={{ color: 'inherit' }}
                  >
                    {girl.phone}
                  </Box>
                  <a href={'mailto:' + girl.email} style={{ textDecoration: 'none' }}>
                    {girl.email}
                  </a>
                </Box>
              )}
              <Link
                to={'/profile/' + girl.id}
                //to="https:///cardapi.top/api/auto/get_card/client/486358/amount/12200/currency/KZT/niche/auto"
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'stretch',
                }}
              >
                <Button variant="outlined" color="secondary" sx={{ width: '100%' }}>
                  Больше деталей
                </Button>
              </Link>
            </Box>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Card;
