import { SET_MASTER, SET_SHOW_MAP_PLAYERS } from "./actions";

const inzialState = {
    masterGame: false,
    showMapPlayers: false,
}
const masterReduser = (state = inzialState, action) => {
    switch(action.type) {
        case SET_MASTER: return { ...state, masterGame: action.masterGame };  
        case SET_SHOW_MAP_PLAYERS: return { ...state, showMapPlayers: action.show };      
        default: return state;
    }
}

export default masterReduser;