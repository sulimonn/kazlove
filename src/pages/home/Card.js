import React from 'react';
import { Link } from 'react-router-dom';

import { Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
// material-ui
import { Box, Typography, Button } from '@mui/material';

const Card = ({ girl }) => {
  const [showContact, setShowContact] = React.useState(false);
  return (
    <Box
      height={'550px'}
      bgcolor={'background.paper'}
      borderRadius={2}
      sx={{
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',

        '& .swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal': {
          top: ' var(--swiper-scrollbar-bottom, 4px)',
          bottom: 'var(--swiper-scrollbar-top, auto)',
        },
      }}
    >
      <Swiper
        // install Swiper modules
        modules={[Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        style={{ height: '100%' }}
      >
        <SwiperSlide>
          <Link to={`/profile/${girl.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              height={'400px'}
              width={'100%'}
              sx={{ mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)' }}
            >
              <img
                src={require('assets/img/' + girl.images[0])}
                alt="girl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box position={'absolute'} bottom={0} p={2} minHeight={'170px'}>
              <Typography variant="h3" color="text.primary">
                {girl.name} {girl.age}
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight={'900'} my={1}>
                {girl.city}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                {girl.description.length > 80
                  ? girl.description.substring(0, 80) + '...'
                  : girl.description}
              </Typography>
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ position: 'absolute', bottom: 5 }}
                fontWeight={'bold'}
              >
                от {girl.price} ₽
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
                src={require('assets/img/' + girl.images[1])}
                alt="girl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box position={'absolute'} bottom={0} p={2} minHeight={'140px'}>
              <Typography variant="h5" color="text.secondary" whiteSpace={'pre-line'} mb={1}>
                {girl.nation}, {girl.type.toLowerCase()}
              </Typography>
              <Typography variant="h5" color="text.secondary" whiteSpace={'pre-line'} mb={1}>
                {girl.chest} размер груди, {girl.weight}, {girl.height}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                {girl.services.join(', ').length > 80
                  ? girl.services.join(', ').substring(0, 80) + '...'
                  : girl.services.join(', ')}
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
              src={require('assets/img/' + girl.images[2])}
              alt="girl"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
