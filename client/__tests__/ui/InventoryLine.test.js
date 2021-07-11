/* eslint-disable no-undef */
import React from 'react';
import toJSON from 'enzyme-to-json';
import { compose } from 'redux';
import InventoryLine from '../../src/components/ui/InventoryLine';

const { shallow } = Enzyme;

describe('<InventoryLine /> Component', () => {
  const shallowExpect = compose(expect, toJSON, shallow);

  it('Renders correctly', () => shallowExpect(
    <InventoryLine
      product={_store.inventories[0].product}
      inventories={_store.inventories}
      timestamp={_store.inventories[0].timestamp}
    />,
  ).toMatchSnapshot());
});
