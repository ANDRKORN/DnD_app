import { SET_PAYERS } from "./actions";

const inzialState = {
    players: {},
}
const playersReduser = (state = inzialState, action) => {
    switch(action.type) {
        case SET_PAYERS: return { ...state, players: action.players };     
        default: return state;
    }
}

export default playersReduser;