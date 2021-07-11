import deepFreeze from 'deep-freeze';
import { updateQuery } from '../../src/actions';
import { query } from '../../src/store/reducers';

describe('query reducer', () => {
  it('updates query correctly', () => {
    const state = { };
    deepFreeze(state);
    const action = updateQuery('store A', 'product B');
    deepFreeze(action);
    expect(query(state, action))
      .toEqual({
        store: 'store A',
        product: 'product B',
      });
  });
});
