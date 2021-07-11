import deepFreeze from 'deep-freeze';
import { addInventory, updateInventory } from '../../src/actions';
import { inventories } from '../../src/store/reducers';

let inventoryId;
const timestamp = Date.now;

describe('inventories reducer', () => {
  it('stores new inventory correctly', () => {
    const data = {
      store: 'Centre Eaton',
      model: 'ADERI',
      inventory: 25,
    };
    const state = [];
    deepFreeze(state);
    const action = addInventory(data.store, data.model, data.inventory, timestamp);
    deepFreeze(action);
    inventoryId = action.id;
    expect(inventories(state, action))
      .toEqual([{
        id: inventoryId,
        store: 'Centre Eaton',
        product: 'ADERI',
        stock: 25,
        timestamp,
      }]);
  });

  it('updates inventory correctly', () => {
    const state = [{
      id: inventoryId,
      store: 'Centre Eaton',
      product: 'ADERI',
      stock: 25,
      timestamp,
    }];
    deepFreeze(state);
    const action = updateInventory(inventoryId, 30, timestamp);
    deepFreeze(action);
    expect(inventories(state, action)).toEqual([{
      id: inventoryId,
      store: 'Centre Eaton',
      product: 'ADERI',
      stock: 30,
      timestamp,
    }]);
  });
});
