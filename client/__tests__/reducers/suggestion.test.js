import deepFreeze from 'deep-freeze';
import { toggleSuggestion } from '../../src/actions';
import { suggestion } from '../../src/store/reducers';

describe('suggestion reducer', () => {
  it('updates suggestion correctly', () => {
    const state = false;
    deepFreeze(state);
    const action = toggleSuggestion(true);
    deepFreeze(action);
    expect(suggestion(state, action))
      .toEqual(true);
  });
});
