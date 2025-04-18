import React from 'react';
import { Link } from 'react-router-dom';

import { Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
// material-ui
import { Box, Typography, Button, Stack } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Card = ({ girl }) => {
  const [showContact, setShowContact] = React.useState(false);
  const [photos, setPhotos] = React.useState();

  const swiperRef = React.useRef(null);

  React.useEffect(() => {
    if (girl?.photos?.length > 0) {
      setPhotos(
        girl.photos.map((photo) => ({
          id: photo[0],
          upload: process.env.REACT_APP_SERVER_URL + photo[1],
        }))
      );
    }
  }, [girl]);

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  }, []);

  return (
    <Box
      height={{ xs: 500, sm: 600 }}
      borderRadius={2}
      sx={{
        background: !girl.promotion_level
          ? 'background.paper'
          : girl.promotion_level === 1
            ? 'linear-gradient( to right, #2c003e 0%,rgb(62, 0, 43) 100%)'
            : 'linear-gradient(to right, #462523 0, #cb9b51 45%,   #f6e27a 75%, #cb9b51 100%)',
        border: '1px solid',
        borderColor: girl.promotion_level > 0 ? 'transparent' : 'divider',
        position: 'relative',
        boxShadow: !girl.promotion_level
          ? 'none' // VIP shadow
          : girl.promotion_level === 1
            ? '0 4px 15px rgba(138, 43, 226, 0.5)' // Top shadow
            : '0 4px 15px rgba(255, 215, 0, 0.5)',
        '& .swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal': {
          top: 'var(--swiper-scrollbar-bottom, 4px)',
          bottom: 'var(--swiper-scrollbar-top, auto)',
        },
      }}
      onMouseEnter={() => swiperRef.current.autoplay.start()} // stop autoplay on hover
      onMouseLeave={() => swiperRef.current.autoplay.stop()}
    >
      {girl.promotion_level > 0 && girl.tariff?.type?.name && (
        <Box
          position="absolute"
          top={10}
          left={10}
          bgcolor={girl.promotion_level === 1 ? '#8a2be2' : 'gold'}
          color="black"
          px={2}
          py={1}
          zIndex={10}
          borderRadius={1}
          sx={{
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            transform: 'rotate(-20deg) translate(-15px, -15px)',
            overflow: 'hidden',
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
          <Link
            to={`/profiles/${girl.id}`}
            style={{ textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}
          >
            <Box
              height={{ xs: 550, sm: 500 }}
              width={'100%'}
              sx={{
                mask: 'linear-gradient(360deg, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 20%)',
              }}
            >
              {photos && photos[0]?.upload && (
                <img
                  src={photos[0]?.upload}
                  alt="girl"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', overflow: 'hidden' }}
                  loading="lazy"
                />
              )}
            </Box>
            <Box position={'absolute'} bottom={0} p={2} minHeight={'170px'}>
              <Typography variant="h3" color="text.primary" fontWeight={900}>
                {girl.name}, {girl.age}
              </Typography>
              <Typography variant="body1" color="text.secondary" fontWeight={'900'} my={1}>
                {girl?.city?.name}, {girl?.address}
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
          <Link to={`/profiles/${girl.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              height={{ xs: 550, sm: 500 }}
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
                🙍‍♀️ {girl.nationality}
              </Typography>
              <Typography variant="h5" color="text.secondary" whiteSpace={'pre-line'} mb={1}>
                💝 {girl.breast_size} размер груди, {girl.weight}, {girl.height}
              </Typography>
              <Typography variant="body1" color="text.secondary" whiteSpace={'pre-line'} mb={2}>
                🌟{' '}
                {girl?.services
                  ?.slice(0, 7)
                  .map((service) => service.name)
                  .join(', ')}
              </Typography>
            </Box>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            height={{ xs: 550, sm: 500 }}
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
            position="absolute"
            bottom={0}
            p={2}
            minHeight={'140px'}
            width={'auto'}
            right={0}
            left={0}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="stretch"
              flexDirection="column"
              minHeight={140}
              width="100%"
              gap={0.5}
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
                <Stack direction="column" spacing={0.5}>
                  {girl.phone && (
                    <Button
                      component="a"
                      href={`tel:${girl.phone}`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<LocalPhoneIcon />}
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.phone}
                      </Typography>
                    </Button>
                  )}
                  {girl?.telegram && (
                    <Button
                      component="a"
                      href={`https://t.me/${girl.telegram}`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<TelegramIcon />}
                      target="_blank"
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.telegram}
                      </Typography>
                    </Button>
                  )}
                  {girl?.whatsapp && (
                    <Button
                      component="a"
                      href={`https://wa.me/${girl.whatsapp}?text=Привет! Я пишу с сайта KazLove`}
                      variant="outlined"
                      sx={{ flex: 1 }}
                      target="_blank"
                      startIcon={<WhatsAppIcon />}
                    >
                      <Typography variant="body1" color="text.primary">
                        {girl.whatsapp}
                      </Typography>
                    </Button>
                  )}
                </Stack>
              )}
              <Link
                to={'/profiles/' + girl.id}
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
