import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Box, Typography, Button } from '@mui/material';

import { Scrollbar, A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

const Profile = () => {
  const { id } = useParams();
  const [showContact, setShowContact] = React.useState(false);
  const girl = useSelector((state) => state.girls).girls.find((girl) => girl.id === parseInt(id));
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box
          height={{ xs: 350, sm: 550 }}
          width={{ xs: '100%', sm: 400 }}
          bgcolor={'background.paper'}
          borderRadius={2}
          sx={{
            '--swiper-theme-color': '#6e5ae2',
          }}
        >
          <Swiper
            // install Swiper modules
            modules={[Scrollbar, A11y, Navigation]}
            navigation
            slidesPerView={1}
            spaceBetween={0}
            scrollbar={{ draggable: true }}
            style={{ height: '100%' }}
          >
            {girl.images.map((image) => (
              <SwiperSlide>
                <Box height="100%">
                  <img
                    src={require('assets/img/' + image)}
                    alt="girl"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box flex={1}>
          <Typography variant="h3" color="text.primary">
            {girl.name} {girl.age}
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight={'900'} my={1}>
            {girl.address}
          </Typography>
          <Box display={'flex'} gap={1} width={'100%'}>
            {showContact ? (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowContact(false);
                }}
              >
                {girl.phone}
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setShowContact(true);
                }}
                sx={{ width: '100%' }}
              >
                Показать контакты
              </Button>
            )}
          </Box>
          <Box display={'flex'} mt={2} gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              whiteSpace={'pre-line'}
              mb={2}
              sx={{ flex: 1, whiteSpace: 'pre-line' }}
            >
              {girl.description}
            </Typography>
            <Box bgcolor={'primary.lighter'} sx={{ flex: 1, borderRadius: 2, p: 2 }}>
              <Typography variant="body1" fontWeight={'bold'}>
                {girl.nation}, {girl.type}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'}>
                {girl.weight}кг, {girl.height}см
              </Typography>
              <Typography variant="body1" fontWeight={'bold'}>
                {girl.chest} размер груди,
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
