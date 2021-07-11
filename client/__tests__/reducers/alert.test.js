import deepFreeze from 'deep-freeze';
import { updateAlert } from '../../src/actions';
import { alert } from '../../src/store/reducers';

describe('alert reducer', () => {
  it('updates alert correctly', () => {
    const state = { message: '', severity: '' };
    deepFreeze(state);
    const action = updateAlert('testing', 'info');
    deepFreeze(action);
    expect(alert(state, action))
      .toEqual({
        message: 'testing',
        severity: 'info',
      });
  });
});
