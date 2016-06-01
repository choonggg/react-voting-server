import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to state', () => {
      const state = Map();
      const entries = List.of('Transporting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Transporting', '28 Days Later')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Transporting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Transporting', '28 Days Later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Transporting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Transporting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));

    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Transporting', '28 Days Later')
        }),
        entries: List()
      });

      const nextState = vote(state, 'Transporting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Transporting', '28 Days Later'),
          tally: Map({
            'Transporting': 1
          })
        }),
        entries: List()
      }));
      
    }); // it creates..

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Transporting', '28 D Later'),
          tally: Map({
            'Transporting': 3,
            '28 D Later': 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, 'Transporting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Transporting', '28 D Later'),
          tally: Map({
            'Transporting': 4,
            '28 D Later': 2
          })
        }),
        entries: List()
      }));

    }); // it adds to exist....

  });

});
