import { takeLatest } from 'redux-saga/effects'
import { CLASS_FETCH_REQUESTED } from './actions';
import { fetchClass } from './saga';

export function* SagaDnD() {
    yield takeLatest(CLASS_FETCH_REQUESTED, fetchClass);
  }