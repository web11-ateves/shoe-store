import React from 'react';
import deepFreeze from 'deep-freeze';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.Enzyme = Enzyme;

window.localStorage = {};
console.groupCollapsed = jest.fn();
console.log = jest.fn();
console.groupEnd = jest.fn();

global._store = deepFreeze({
  inventories: [
    {
      id: '8a1125d9-563c-4f68-8c14-eb5fab31f97e',
      store: 'Centre Eaton',
      product: 'ADERI',
      stock: 54,
      timestamp: 1626001410328,
    }, {
      id: 'dab9d3cc-b8c7-4351-a19d-244f045dd074',
      store: 'Centre Eaton',
      product: 'MIRIRA',
      stock: 39,
      timestamp: 1626001402329,
    }, {
      id: '0374f551-8145-4acd-ba1f-e92dda4fb05f',
      store: 'Centre Eaton',
      product: 'CAELAN',
      stock: 87,
      timestamp: 1626001409353,
    }, {
      id: 'e520b797-e4bc-4983-abe9-17c20c869db0',
      store: 'Destiny USA Mall',
      product: 'ADERI',
      stock: 91,
      timestamp: 1626001409328,
    }, {
      id: 'fb2f10a3-5d27-4ecb-98e6-df55c2033143',
      store: 'Destiny USA Mall',
      product: 'MIRIRA',
      stock: 52,
      timestamp: 1626001407320,
    }, {
      id: '4e321139-7d35-4801-8b7c-daa62b25218a',
      store: 'Destiny USA Mall',
      product: 'CAELAN',
      stock: 79,
      timestamp: 1626001403309,
    }, {
      id: '6308cd46-cffb-4e32-9ac1-7ba6f190eb28',
      store: 'Pheasant Lane Mall',
      product: 'ADERI',
      stock: 45,
      timestamp: 1626001408352,
    }, {
      id: '8ac9d640-b849-4ee8-b1c9-011eca167f44',
      store: 'Pheasant Lane Mall',
      product: 'MIRIRA',
      stock: 12,
      timestamp: 1626001409377,
    }, {
      id: '56524eb8-eb0f-41b8-9023-6557d150589d',
      store: 'Pheasant Lane Mall',
      product: 'CAELAN',
      stock: 21,
      timestamp: 1626001404310,
    }],
  alert: {
    message: '',
    severity: '',
  },
  query: {
    store: '',
    product: '',
  },
  timestamp: 0,
  suggestion: false,
  transfer: {
    fromId: 'ca3e5902-5b55-4483-a733-d2634448ecf6',
    fromStock: 39,
    toId: '58cb5735-f788-4b90-be41-bc6762830b8f',
    toStock: 21,
    message: 'Would you like to transfer [x] units from A to B?',
  },
});
