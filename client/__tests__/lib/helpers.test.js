/* eslint-disable no-undef */
import {
  slugify, getFirstArrayItem, getLastArrayItem, searchArray, reduceObjectArray, searchObjectArray,
  filterArrayByAttr, findByAttr, filterArrayByAttrs, findByAttrs, sortBy,
} from '../../src/lib/helpers';

describe('helpers ', () => {
  it('slugify', () => {
    const text = 'This is a test';
    const result = slugify(text);
    expect(result)
      .toEqual('this-is-a-test');
  });
  it('getFirstArrayItem', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = getFirstArrayItem(array);
    expect(result)
      .toEqual(array[0]);
  });
  it('getLastArrayItem', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = getLastArrayItem(array);
    expect(result)
      .toEqual(array[5]);
  });
  it('searchArray', () => {
    const array = ['abc', 'abcd', 'fgh', 'xyz'];
    const query = 'ab';
    const result = searchArray(array, query);
    expect(result)
      .toEqual(['abc', 'abcd']);
  });
  it('reduceObjectArray', () => {
    const result = reduceObjectArray(_store.inventories, 'store');
    expect(result)
      .toEqual(['Centre Eaton', 'Destiny USA Mall', 'Pheasant Lane Mall']);
  });
  it('searchObjectArray', () => {
    const result = searchObjectArray(_store.inventories, 'store', 'Eaton');
    expect(result)
      .toEqual(['Centre Eaton']);
  });
  it('searchObjectArray with empty query', () => {
    const result = searchObjectArray(_store.inventories, 'store', '');
    expect(result)
      .toEqual(['Centre Eaton', 'Destiny USA Mall', 'Pheasant Lane Mall']);
  });
  it('filterArrayByAttr', () => {
    const result = filterArrayByAttr(_store.inventories, 'store', _store.inventories[0].store);
    expect(result)
      .toEqual([_store.inventories[0], _store.inventories[1], _store.inventories[2]]);
  });
  it('findByAttr', () => {
    const result = findByAttr(_store.inventories, 'id', _store.inventories[0].id);
    expect(result)
      .toEqual(_store.inventories[0]);
  });
  it('filterArrayByAttrs like + not', () => {
    const result = filterArrayByAttrs(_store.inventories,
      { attr: 'store', op: 'like', value: _store.inventories[0].store },
      { attr: 'product', op: 'not', value: _store.inventories[0].product });
    expect(result)
      .toEqual([_store.inventories[1], _store.inventories[2]]);
  });
  it('filterArrayByAttrs like + like', () => {
    const result = filterArrayByAttrs(_store.inventories,
      { attr: 'store', op: 'like', value: _store.inventories[0].store },
      { attr: 'product', op: 'like', value: _store.inventories[0].product });
    expect(result)
      .toEqual([_store.inventories[0]]);
  });
  it('filterArrayByAttrs not + like', () => {
    const result = filterArrayByAttrs(_store.inventories,
      { attr: 'store', op: 'not', value: _store.inventories[0].store },
      { attr: 'product', op: 'like', value: _store.inventories[0].product });
    expect(result)
      .toEqual([_store.inventories[3], _store.inventories[6]]);
  });
  it('filterArrayByAttrs not + not', () => {
    const result = filterArrayByAttrs(_store.inventories,
      { attr: 'store', op: 'not', value: _store.inventories[0].store },
      { attr: 'product', op: 'not', value: _store.inventories[0].product });
    expect(result)
      .toEqual([_store.inventories[4], _store.inventories[5],
        _store.inventories[7], _store.inventories[8]]);
  });
  it('findByAttrs', () => {
    const result = findByAttrs(_store.inventories,
      { attr: 'store', op: 'like', value: _store.inventories[0].store },
      { attr: 'product', op: 'like', value: _store.inventories[0].product });
    expect(result)
      .toEqual(_store.inventories[0]);
  });
  it('sortBy number stock', () => {
    const array = [..._store.inventories];
    const result = array.sort(sortBy('number', 'stock'));
    expect(result[0].id)
      .toEqual(_store.inventories[3].id);
  });
  it('sortBy number stock', () => {
    const array = [..._store.inventories];
    const result = array.sort(sortBy('date', 'timestamp'));
    expect(result[0].id)
      .toEqual(_store.inventories[0].id);
  });
});
