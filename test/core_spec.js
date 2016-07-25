import { List, Map } from 'immutable';
import { expect } from 'chai';

import{ setEntries } from '../src/core';

describe('application logic', () => {

  //Describe function to set current entries on state
  describe('setEntries', ()=>{

    it('adds the entries to the state', ()=>{

      const state = Map();
      const entries = List.of('pepporoni', 'anchovies');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('pepporoni', 'anchovies')
      }));
    });

    it('converts to immutable', ()=>{
      const state = Map();
      const entries = ['pepporoni', 'anchovies']
      const nexState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('pepporoni', 'anchovies')
      }));
    })

  });

  describe('next', ()=>{
    it('takes the next two entries under vote', ()=>{
      const state = Map({
        entries: List.of('pepporoni', 'anchovies', 'pineapple')
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies')
        }),
        entries: List.of('pineapple');
      }));

    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies'),
          tally: Map({
            'pepporoni': 4,
            'anchovies': 2
          })
        }),
        entries: List.of('pineapple', 'olives', 'spinach')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pineapple', 'olives')
        }),
        entries: List.of('spinach', 'pepporoni')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies'),
          tally: Map({
            'pepporoni': 3,
            'anchovies': 3
          })
        }),
        entries: List.of('pineapple', 'olives', 'spinach')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pineapple', 'olives')
        }),
        entries: List.of('spinach', 'pepporoni', 'anchovies')
      }));
    });

    it('marks winner when just one entry left', () => {
     const state = Map({
       vote: Map({
         pair: List.of('pepporoni', 'anchovies'),
         tally: Map({
           'pepporoni': 4,
           'anchovies': 2
         })
       }),
       entries: List()
     });
     const nextState = next(state);
     expect(nextState).to.equal(Map({
       winner: 'pepporoni'
     }));
   });

  });

  describe('vote', () => {
    it('creates a tally for the voted entry', ()=>{
      const state = Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies')
        }),
        entries: List()
      });

      const nextState = vote(state, 'pepporoni');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies'),
          tally: Map({
            'pepporoni': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies'),
          tally: Map({
            'pepporoni': 3,
            'anchovies': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'pepporoni');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('pepporoni', 'anchovies'),
          tally: Map({
            'pepporoni': 4,
            'anchovies': 2
          })
        }),
        entries: List()
      }));
    });
  });
});
