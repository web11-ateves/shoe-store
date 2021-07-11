/* eslint-disable no-undef */

import 'regenerator-runtime/runtime';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { compose } from 'redux';
import { Provider } from 'react-redux';
import InventoryTable from '../../src/components/ui/InventoryTable';
import { storeFactory, sagaMiddleware } from '../../src/store';
import sagas from '../../src/sagas';

const { shallow, mount } = Enzyme;

describe('<InventoryTable /> Component', () => {
  let component;
  const shallowExpect = compose(expect, toJSON, shallow);
  const store = storeFactory(_store);
  sagaMiddleware.run(sagas);

  // eslint-disable-next-line no-return-assign
  beforeAll(() => component = (
    <Provider store={store}>
      <InventoryTable />
    </Provider>
  ));

  it('Renders correctly', () => shallowExpect(component).toMatchSnapshot());

  it('Renders one line for each product', () => {
    expect(mount(component).find('InventoryLine').length)
      .toBe(3);
  });

  it('Renders one column for each store', () => {
    expect(mount(component).find('th').length)
      .toBe(4);
  });
});
