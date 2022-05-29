import { SET_FOG_WAR, SET_MAP, SET_PLAYERS, SET_OPEN_MAP, SET_SHOW_FOG_WAR, SET_CREATE_FOG_WAR, SET_MAP_URL, SET_SELECT_MAPS } from "./actions";

const inzialState = {
    select_maps: [],
    map_img: {
        url: '#',
    },
    fog_war: {
        open: false,
        fog: []
    },
    open: false,
}
const mapReduser = (state = inzialState, action) => {
    switch (action.type) {
        case SET_MAP: return {
            ...state, //map_img: { url: action.map.url },
            select_maps: [
                ...state.select_maps,
                { text: action.map.nameMap, value: action.map.url }],
        };
        case SET_SELECT_MAPS: return {
            ...state,
            select_maps: action.map,
        };
        case SET_MAP_URL: return {
            ...state, map_img: { url: action.url },
        };
        case SET_OPEN_MAP: return { ...state, open: action.open };
        case SET_PLAYERS: return { ...state, players: action.players };
        case SET_FOG_WAR: return { ...state, map_img: action.fog_war };
        case SET_SHOW_FOG_WAR: return { ...state, fog_war: { ...state.fog_war, open: action.open } };
        case SET_CREATE_FOG_WAR: return { ...state, fog_war: { ...state.fog_war, fog_war: action.fog_war } };
        default: return state;
    }
}

export default mapReduser;