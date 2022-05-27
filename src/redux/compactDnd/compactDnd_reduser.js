import { SET_CLASS } from "./actions";

const inzialState = {
    class: [],
}
const compactDnDReduser = (state = inzialState, action) => {
    switch(action.type) {        
        case SET_CLASS: return { ...state, class: action.playload };     
        default: return state;
    }
}

export default compactDnDReduser;