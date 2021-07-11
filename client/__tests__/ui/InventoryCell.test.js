/* eslint-disable no-undef */
import React from 'react';
import toJSON from 'enzyme-to-json';
import { compose } from 'redux';
import InventoryCell from '../../src/components/ui/InventoryCell';
import { criticalLevel, warningLevel } from '../../src/configs';

const { shallow, render } = Enzyme;

describe('<InventoryCell /> Component', () => {
  const shallowExpect = compose(expect, toJSON, shallow);

  const criticalInventory = criticalLevel - 1;
  const warningInventory = warningLevel - 1;
  const highInventory = 90;

  it('Renders correctly for critical inventory', () => shallowExpect(
    <InventoryCell value={criticalInventory} highlight />,
  ).toMatchSnapshot());

  it('Renders correctly for warning inventory', () => shallowExpect(
    <InventoryCell value={warningInventory} />,
  ).toMatchSnapshot());

  it('Renders correctly for high inventory', () => shallowExpect(
    <InventoryCell value={highInventory} />,
  ).toMatchSnapshot());

  it('Renders correct class for critical inventory', () => expect(
    render(<InventoryCell value={criticalInventory} highlight />)
      .hasClass('critical-inventory'),
  ).toBe(true));

  it('Renders correct class for low inventory', () => expect(
    render(<InventoryCell value={warningInventory} />)
      .hasClass('warning-inventory'),
  ).toBe(true));

  it('Renders correct class for high inventory', () => expect(
    render(<InventoryCell value={highInventory} />)
      .hasClass('high-inventory'),
  ).toBe(true));
});
