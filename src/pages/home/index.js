import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Poster from 'assets/img/image.png';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useFetchCitiesQuery, useFetchProfilesQuery } from 'store/reducers/api';
import LoveIcon from 'assets/img/love.svg';
import LoveIcon2 from 'assets/img/love2.svg';
import Heart from 'assets/img/heart.svg';
import Fly from 'assets/img/fly.svg';
import Logo from 'components/Logo/Logo';
import Profiles from 'pages/profiles/index';

const splitTextInTwoLines = (text) => {
  const middle = Math.floor(text.length / 2);
  const before = text.lastIndexOf(' ', middle); // найдем ближайший пробел до середины
  const index = before !== -1 ? before : middle;
  return text.slice(0, index) + '\n' + text.slice(index + 1);
};

const Home = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { data = [] } = useFetchProfilesQuery();
  const { data: citiesData = [] } = useFetchCitiesQuery();
  const [cities, setCities] = React.useState(citiesData);
  const [profiles, setProfiles] = React.useState(data);
  React.useEffect(() => {
    if (data.length > 0) {
      setProfiles(data);
    }
    if (citiesData.length > 0) {
      setCities(citiesData);
    }
  }, [data, citiesData]);
  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
        position="relative"
      >
        <Box
          component="img"
          src={Poster}
          alt="poster"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: { xs: 'static', md: 'absolute' },
            zIndex: -2,
            inset: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent)',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
        <Box
          width={{ xs: '100%', md: '690px' }}
          height="100%"
          ml={{ xs: 0, md: 15 }}
          py={{ xs: 5, md: 19, lg: 25 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Typography variant="h1" color="secondary" fontSize={60} fontWeight={600}>
            Проститутки Алматы – Кыздар{' '}
            <Typography
              variant="h1"
              component="span"
              color="primary"
              fontSize="inherit"
              fontWeight="inherit"
              sx={{ textShadow: '0 0 10px #FF42DC99, 0 0 20px #FF42DC99, 0 0 30px #FF42DC99' }}
            >
              <i>KazLove</i>
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            color="#fff"
            my={3}
            fontSize={{ xs: 14, md: 23 }}
            sx={{ width: '75%' }}
          >
            Индивидуалки Алматы, только лучшие девушки на KazLove
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderWidth: 2 }}
            endIcon={<ArrowRightOutlined />}
            component={Link}
            to="/profiles"
          >
            Все девушки
          </Button>
        </Box>
      </Box>
      <Box my={5}>
        <Profiles count={matchDownSM ? 4 : 8} />
        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderWidth: 2 }}
            endIcon={<ArrowRightOutlined />}
            component={Link}
            to="/profiles"
          >
            Все девушки
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={5}
        maxWidth="1100px"
        gap={3}
        mx="auto"
        textAlign="center"
      >
        <Typography
          variant="h1"
          color="#fff"
          fontWeight={600}
          fontSize={{ xs: 26, md: 38 }}
          sx={{ maxWidth: '750px', textAlign: 'center' }}
        >
          На нашем сайте вы найдете самых лучших и проверенных проституток города
        </Typography>
        <Typography
          variant="body1"
          color="#ccc"
          fontSize={{ xs: 14, md: 18 }}
          sx={{ maxWidth: '809px', textAlign: 'center' }}
        >
          КазЛов гарантирует, что ты найдешь то что ищешь!{' '}
          {profiles.filter((girl) => girl?.hidden === 0 && girl?.approved === 1).length} реальных
          анкет проституток на Кыздар КазЛов, есть из чего выбрать девочку на вечер! Если ты устал
          от серых будней и хочешь расслабиться в компании красивых девушек, наш Кыздар КазЛов
          поможет тебе выбрать идеальную проститутку Алматы. Здесь представлены анкеты самых
          обворожительных индивидуалок Алматы, готовых подарить тебе незабываемые моменты страсти,
          удовольствия и расслабления.
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {[
            'Воплощение всех сокровенных фантазий',
            'Профессиональный сервис',
            'Самый полный список',
            'Большой выбор девушек на любой вкус',
            'Полная конфиденциальность клиентов',
          ].map((item) => (
            <Box
              backgroundColor="#fff"
              px={1.5}
              py={1}
              borderRadius={10}
              key={item}
              display="flex"
              gap={1}
              alignItems="center"
              flexDirection="row"
            >
              <img src={LoveIcon} alt="check" width={45} />
              <Typography variant="body1" color="#000" fontSize={{ xs: 14, md: 18 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ maxWidth: '809px', textAlign: 'center' }}
        >
          В нашей подборке все ночные бабочки Алматы, девушеки с разными внешними данными,
          темпераментами и стилями секса. Каждая из них – настоящая богиня любви, знающая, как
          доставить мужчине удовольствие.{' '}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={5}
        maxWidth="1100px"
        gap={4}
        mx="auto"
        my={2}
        textAlign="center"
      >
        <Typography
          variant="h1"
          color="#fff"
          fontWeight={600}
          fontSize={{ xs: 26, md: 34 }}
          sx={{ maxWidth: '970px', textAlign: 'center', lineHeight: 1.1 }}
        >
          У нас даже самый привередливый клиент найдет индивидуалку по вкусу! Если проститутка
          работает в{' '}
          <Typography
            component="span"
            color="secondary"
            fontSize="inherit"
            fontWeight="inherit"
            lineHeight="inherit"
          >
            {' '}
            Алматы
          </Typography>
          , значит она есть на{' '}
          <Typography
            component="span"
            color="primary"
            fontSize="inherit"
            fontWeight="inherit"
            lineHeight="inherit"
          >
            {' '}
            КазЛов!{' '}
          </Typography>{' '}
          Здесь ты найдешь:
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {[
            'Массажисток и эскортниц – для романтических встреч, страстного времяпрепровождения и расслабляющего массажа;',
            'Элитных проституток – роскошных девушек премиум-класса для тех, кто ценит изысканность;',
            'Доступных индивидуалок – красавиц, готовых предложить незабываемые интимные услуги по приятным ценам;',
            'Путан с бурной фантазией – игривых девочки по вызову, для которых не существует табу в постели которые дарят незабываемый секс!',
          ].map((item) => (
            <Box
              backgroundColor="secondary.main"
              p={3}
              borderRadius={5}
              key={item}
              display="flex"
              gap={2}
              flexDirection="column"
              maxWidth="350px"
              textAlign="left"
            >
              <img src={LoveIcon2} alt="check" width={35} />
              <Typography variant="body1" color="#fff" lineHeight={1.3} fontWeight={600}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        display={{ xs: 'none', md: 'flex' }}
        flexDirection="row"
        gap={14}
        py={5}
        my={2}
        maxWidth="1200px"
        mx="auto"
      >
        <Box
          sx={{
            borderTop: '2px solid #fff',
            py: 4,
          }}
        >
          <Typography
            variant="h1"
            component="span"
            color="primary"
            fontSize={{ xs: 26, md: 38 }}
            fontWeight={600}
            sx={{
              textShadow: '0 0 10px #FF42DC99, 0 0 20px #FF42DC99, 0 0 30px #FF42DC99',
              textWrap: 'nowrap',
            }}
          >
            <i>Кыздар КазЛов </i>
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: '2px solid #fff',
            py: 4,
          }}
        >
          <Typography variant="body1" component="span" color="#ccc">
            Все проститутки Алматы проходят строгий отбор – их анкеты содержат реальные фото,
            описание предпочтений, параметров тела и перечень оказываемых услуг. Ты можешь легко
            выбрать девушку, которая воплотит все твои тайные желания в реальность.
          </Typography>
        </Box>
        <Box sx={{ borderTop: '2px solid #fff', py: 4 }}>
          <Typography variant="body1" component="span" color="#ccc" sx={{ textWrap: 'nowrap' }}>
            {cities?.length} городов
          </Typography>
        </Box>
        <Box sx={{ borderTop: '2px solid #fff', py: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ borderWidth: 2, textWrap: 'nowrap' }}
            endIcon={<ArrowRightOutlined />}
          >
            Все девушки
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={{ xs: 5, md: 14 }}
        py={5}
        my={2}
        maxWidth="1200px"
        mx="auto"
        position="relative"
      >
        <Typography
          variant="h1"
          component="span"
          color="#fff"
          fontSize={{ xs: 26, md: 38 }}
          fontWeight={600}
          textAlign="center"
        >
          На сайте представлены индивидуалки{' '}
          <Typography fontSize="inherit" fontWeight="inherit" component="span" color="primary">
            Алматы
          </Typography>
          , предлагающие разнообразные интимные услуги. Среди популярных вариантов:
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {[
            'Классический секс – с презервативом или без, страстные ласки, полный контакт и удовольствие без границ',
            'Эротический массаж – полное расслабление в руках профессиональной массажистки',
            'Анальный секс – запретный плод, доступный на Киздар КазЛов',
            'Глубокий минет и кунилингус – чувственные и нежные прикосновения, от которых перехватывает дыхание',
            'Ролевые игры – воплощение любых фантазий, от строгой учительницы до страстной медсестры',
            'Групповые утехи – возможность насладиться несколькими партнершами одновременно',
            'Анал и другие виды секса – для тех, кто любит экспериментировать и получать новые эмоции',
          ].map((item, i) => (
            <Box
              key={item}
              bgcolor={i === 0 ? 'primary.main' : 'secondary.main'}
              sx={{
                p: 2,
                borderRadius: 5,
                borderBottomRightRadius: 4,
                display: 'flex',
                gap: 2,
              }}
            >
              <img src={Heart} alt="check" width={30} />
              <Typography
                variant="body1"
                color="#fff"
                lineHeight={1.2}
                sx={{
                  whiteSpace: 'pre-line',
                }}
              >
                {splitTextInTwoLines(item)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          component="img"
          src={Fly}
          alt="check"
          width={150}
          position="absolute"
          bottom={0}
          right={0}
          zIndex={-1}
          display={{ xs: 'none', md: 'block' }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={7}
        py={5}
        my={2}
        maxWidth="1200px"
        mx="auto"
        position="relative"
      >
        <Typography
          variant="h1"
          component="span"
          color="secondary.main"
          fontSize={{ xs: 26, md: 38 }}
          fontWeight={600}
          textAlign="center"
        >
          Как снять проститутку в Алматы?
          <br /> – легко на{' '}
          <Typography
            variant="h1"
            component="span"
            color="primary"
            fontSize="inherit"
            fontWeight="inherit"
            sx={{
              textShadow: '0 0 10px #FF42DC99, 0 0 20px #FF42DC99, 0 0 30px #FF42DC99',
              textWrap: 'nowrap',
            }}
          >
            <i>Кыздар КазЛов </i>
          </Typography>
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
          {[
            'Открой каталог и выбери анкету понравившейся проститутки Алматы',
            'Введи параметры тела девушки и найди самую понравившуюся',
            'Свяжись с девушкой по указанному в анкете номеру',
            'Договорись о встрече и насладись приятным времяпрепровождением',
          ].map((item, i) => (
            <Box key={item} alt="check" width="100%" display="flex" alignItems="center" gap={2}>
              <Typography
                variant="h1"
                component="span"
                color="primary"
                fontSize={60}
                fontWeight={600}
                sx={{
                  textShadow: '0 0 10px #FF42DC99, 0 0 20px #FF42DC99, 0 0 30px #FF42DC99',
                  textWrap: 'nowrap',
                }}
              >
                <i>{i + 1}</i>
              </Typography>
              <Typography variant="body1" color="#fff" lineHeight={1.2} fontSize={20}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body1" component="span" color="secondary.main" textAlign="center">
          Не откладывай удовольствие на потом! Проститутки Алматы готовы подарить тебе бурю эмоций и
          яркие впечатления прямо сейчас
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'left', md: 'center' }}
        mb={5}
        gap={2}
      >
        <Logo />
        <Typography variant="body1" sx={{ display: { xs: 'block', md: 'none' } }}>
          Администрация сайта предоставляет исключительно платформу для размещения рекламы и не
          несет ответственности за её содержание. В то же время все пользователи ресурса, а также
          лица, имеющие отношение к данной деятельности, подтверждают, что им исполнилось 18 лет.
        </Typography>
        <Button
          sx={{ borderRadius: 5 }}
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to="/profile/add"
        >
          Добавить анкету
        </Button>
      </Box>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        gap={25}
        py={5}
        my={2}
        sx={{ borderTop: '1px solid #777' }}
      >
        <Typography variant="body1">
          Администрация сайта предоставляет исключительно платформу для размещения рекламы и не
          несет ответственности за её содержание. В то же время все пользователи ресурса, а также
          лица, имеющие отношение к данной деятельности, подтверждают, что им исполнилось 18 лет.
        </Typography>
        <Typography variant="body1" textAlign="center" whiteSpace="nowrap">
          © 2025 KAZLOVE
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
