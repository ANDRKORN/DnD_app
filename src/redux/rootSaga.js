import { fork } from 'redux-saga/effects'
import { SagaDnD } from './compactDnd/watchSaga'

export default function* rootSaga() {
    yield fork (SagaDnD)
}