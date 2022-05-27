import { call, put } from 'redux-saga/effects'
import { DnD } from '../../API/dndapi';
import { SET_CLASS } from './actions';


export function* fetchClass(action) {
    try {
        const classes = yield DnD.class;
        yield put({type: SET_CLASS, playload: classes.data.results});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
}