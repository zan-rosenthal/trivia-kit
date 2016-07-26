import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries){
  const list = List(entries);
  return state.set('entries', List(entries))
              .set('initialEntries', list);
}

function getWinners (vote){
  if(!vote){
    return [];
  }

  const [a,b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if(aVotes > bVotes){
    return [a];
  }else if(aVotes < bVotes){
    return [b]
  }

  return [a,b];
}

export function next(state){
  const entries = state.get('entries').concat(getWinners(state.get('vote')));

  if(entries.size === 1){
    return  state.remove('vote')
                 .remove('entries')
                 .set('winner', entries.first());
  }

  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
};

export function vote (voteState, entry){
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally+1
  );
}
