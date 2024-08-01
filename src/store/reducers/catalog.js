import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
  name: 'catalog',
  initialState: {
    filter: [
      {
        id: 'gender',
        name: 'Пол',
        title: 'По полу',
        value: ['Мужской', 'Женский'],
        options: [
          {
            id: 'gender-female',
            name: 'Женский',
          },
          {
            id: 'gender-male',
            name: 'Мужской',
          },
        ],
      },
      {
        id: 'chest',
        name: 'Размер груди',
        title: 'По размеру груди',
        value: ['1', '1.5', '2', '2.5', '3', '3+'],

        options: [
          {
            id: 'chest-1',
            name: '1',
          },
          {
            id: 'chest-1.5',
            name: '1.5',
          },
          {
            id: 'chest-2',
            name: '2',
          },
          {
            id: 'chest-2.5',
            name: '2.5',
          },
          {
            id: 'chest-3',
            name: '3',
          },
          {
            id: 'chest-3+',
            name: '3+',
          },
        ],
      },
      {
        id: 'age',
        name: 'Возраст',
        title: 'По возрасту',
        value: ['18', '18-25', '25-40', '40-60', '60+'],
        options: [
          {
            id: 'age-18',
            name: '18',
          },
          {
            id: 'age-18-25',
            name: '18-25',
          },
          {
            id: 'age-25-40',
            name: '25-40',
          },
          {
            id: 'age-40-60',
            name: '40-60',
          },
          {
            id: 'age-60+',
            name: '60+',
          },
        ],
      },
      {
        id: 'height',
        name: 'Рост',
        title: 'По росту',
        value: ['150-160', '160-170', '170-180', '180-190', '190+'],
        options: [
          {
            id: 'height-150-160',
            name: '150-160',
          },
          {
            id: 'height-160-170',
            name: '160-170',
          },
          {
            id: 'height-170-180',
            name: '170-180',
          },
          {
            id: 'height-180-190',
            name: '180-190',
          },
          {
            id: 'height-190+',
            name: '190+',
          },
        ],
      },
      {
        id: 'weight',
        name: 'Вес',
        title: 'По весу',
        value: ['40-50', '50-60', '60-70', '70-80', '80+'],
        options: [
          {
            id: 'weight-40-50',
            name: '40-50',
          },
          {
            id: 'weight-50-60',
            name: '50-60',
          },
          {
            id: 'weight-60-70',
            name: '60-70',
          },
          {
            id: 'weight-70-80',
            name: '70-80',
          },
          {
            id: 'weight-80+',
            name: '80+',
          },
        ],
      },
      {
        id: 'price',
        name: 'Цена',
        title: 'По цене',
        value: ['1000-3000', '3000-6000', '6000+'],
        options: [
          {
            id: 'price-1000-3000',
            name: '1000-3000',
          },
          {
            id: 'price-3000-6000',
            name: '3000-6000',
          },
          {
            id: 'price-6000+',
            name: '6000+',
          },
        ],
      },
      {
        id: 'name',
        name: 'Имя',
        title: 'По имени',
        value: ['Имя', 'Фамилия'],
        options: [
          {
            id: 'name',
            name: 'Имя',
          },
          {
            id: 'surname',
            name: 'Фамилия',
          },
        ],
      },
      {
        id: 'nation',
        name: 'Нация',
        title: 'По нации',
        value: ['Русский', 'Марсианка'],
        options: [
          {
            id: 'nation-russian',
            name: 'Русский',
          },
          {
            id: 'nation-marsian',
            name: 'Марсианка',
          },
        ],
      },
      {
        id: 'services',
        name: 'Услуги',
        title: 'По услугам',
        value: ['Массаж', 'Что то', 'Ещё что то'],
        options: [
          {
            id: 'services-massage',
            name: 'Массаж',
          },
          {
            id: 'services-what',
            name: 'Что то',
          },
          {
            id: 'services-else',
            name: 'Ещё что то',
          },
        ],
      },
    ],
    cities: [
      'Москва',
      'Санкт-Петербург',
      'Новосибирск',
      'Екатеринбург',
      'Нижний Новгород',
      'Челябинск',
      'Ростов-на-Дону',
      'Самара',
      'Казань',
      'Омск',
      'Уфа',
      'Пермь',
      'Красноярск',
      'Воронеж',
      'Тюмень',
      'Волгоград',
      'Краснодар',
    ],
    sort: [
      {
        id: 'age',
        name: 'Возраст',
        option: '',
      },
      {
        id: 'price',
        name: 'Цена',
        option: '',
      },
      {
        id: 'height',
        name: 'Рост',
        option: '',
      },
      {
        id: 'weight',
        name: 'Вес',
        option: '',
      },
      {
        id: 'chest',
        name: 'Грудь',
        option: '',
      },
    ],
  },
  reducers: {
    setActions: (state, action) => {
      state.actions = action.payload;
    },
    setSortOption: (state, action) => {
      const { id, option } = action.payload;

      state.sort = state.sort.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            option,
          };
        }
        return item;
      });
    },
  },
});

export const { setActions, setSortOption } = actionsSlice.actions;
export default actionsSlice.reducer;
