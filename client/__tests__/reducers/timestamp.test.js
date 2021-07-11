import deepFreeze from 'deep-freeze';
import { updateTimestamp } from '../../src/actions';
import { timestamp } from '../../src/store/reducers';

describe('timestamp reducer', () => {
  it('updates timestamp correctly', () => {
    const value = Date.now();
    const state = '';
    deepFreeze(state);
    const action = updateTimestamp(value);
    deepFreeze(action);
    expect(timestamp(state, action))
      .toEqual(value);
  });
});
