import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Reduc store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Transporting', '28 D Later']
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Transporting', '28 D Later']
    }));
  });
});
