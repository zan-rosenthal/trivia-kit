import makeStore from './Server/store';
import {startServer} from './Server/server';
import entries from './entries.json'

export const store = makeStore();
startServer();

store.dispatch({
  type: 'SET_ENTRIES',
  entries: entries
});

store.dispatch({type: NEXT});
