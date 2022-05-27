import { combineReducers } from 'redux';
import compactDnDReduser from './compactDnd/compactDnd_reduser';
import masterReduser from './game_master/master_reduser';
import mapReduser from './map/map_reduser';
import playersReduser from './players/players_reduser';

const rootReducer = combineReducers({
    map: mapReduser,
    players: playersReduser,  
    compactDnd: compactDnDReduser,
    master: masterReduser,
});
export default rootReducer;