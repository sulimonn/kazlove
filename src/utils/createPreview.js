import _ from 'lodash';

export default function createPreview(file) {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file;
}

export function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const groupByPromotionLevel = (arr) => {
  return arr.reduce((acc, girl) => {
    const level = girl.promotion_level || 0; // Default to 0 if undefined
    acc[level] = acc[level] || [];
    acc[level].push(girl);
    return acc;
  }, {});
};

export const shufflePerPromotionLevel = (girls) => {
  const grouped = groupByPromotionLevel(girls);

  // Shuffle each group separately
  Object.keys(grouped).forEach((level) => {
    grouped[level] = _.shuffle(grouped[level]); // Shuffle each promotion level
  });

  // Merge all shuffled groups back into a single list
  return Object.values(grouped).flat();
};

const cyrillicToLatinMap = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
  қ: 'q',
  ғ: 'gh',
  ң: 'ng',
  ү: 'u',
  ұ: 'u',
  һ: 'h',
  ә: 'a',
  ө: 'o',
};

export function transliterate(text) {
  if (typeof text !== 'string') {
    return text;
  }

  return text
    .toLowerCase()
    .split('')
    .map((char) => cyrillicToLatinMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-') // заменить пробелы и символы на "-"
    .replace(/^-+|-+$/g, ''); // убрать крайние дефисы
}
