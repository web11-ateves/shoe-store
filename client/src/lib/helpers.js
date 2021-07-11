import { compose } from 'redux';

export const slugify = (text) => text.replace(/ /g, '-').toLowerCase();

export const getFirstArrayItem = (array) => array[0];
export const getLastArrayItem = (array) => array[array.length - 1];

export const searchArray = (array, query) => (
  query
    ? array.filter(
      (item) => slugify(item).includes(slugify(query)),
    )
    : array
);
export const reduceObjectArray = (array, attr) => (
  [...new Set(
    array.reduce((result, item) => [...result, item[attr]], []),
  )]
);
export const searchObjectArray = (array, attr, query) => (
  searchArray(reduceObjectArray(array, attr), query)
);

export const filterArrayByAttr = (array, attr, value) => array.filter(
  (item) => item[attr] === value,
);
export const findByAttr = compose(
  getFirstArrayItem,
  filterArrayByAttr,
);

export const filterArrayByAttrs = (array, attr1 = {}, attr2 = {}) => array.filter(
  (item) => (
    (attr1.op === 'like' && attr2.op === 'like'
      && attr1.value.includes(item[attr1.attr]) && attr2.value.includes(item[attr2.attr]))
    || (attr1.op === 'like' && attr2.op === 'not'
      && attr1.value.includes(item[attr1.attr]) && attr2.value !== item[attr2.attr])
    || (attr1.op === 'not' && attr2.op === 'like'
      && attr1.value !== item[attr1.attr] && attr2.value.includes(item[attr2.attr]))
    || (attr1.op === 'not' && attr2.op === 'not'
      && attr1.value !== item[attr1.attr] && attr2.value !== item[attr2.attr])
  ),
);

export const findByAttrs = compose(
  getFirstArrayItem,
  filterArrayByAttrs,
);

export const sortBy = (type, field) => {
  switch (type) {
    case 'date':
      return (a, b) => new Date(b[field]) - new Date(a[field]);
    default:
      return (a, b) => b[field] - a[field];
  }
};
