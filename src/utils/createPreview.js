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

// Filter and shuffle per promotion level
