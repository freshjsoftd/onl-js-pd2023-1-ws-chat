import { put } from 'redux-saga/effects';
import { 
  createMessageError,
  createMessageRequest,
  getMessagesError, 
  getMessagesRequest, 
  getMessagesSuccess} 
  from '../actions/actionCreators';

import * as API from './../api';

export function* getMessagesSaga(){
  yield put(getMessagesRequest())
  try {
    const {data: {data: messages}} = yield API.getMessages();
    yield put(getMessagesSuccess(messages))
  } catch (error) {
    yield put(getMessagesError(error))
  }
}
export function* createMessageSaga({payload}){
  yield put(createMessageRequest())
  try {
    yield API.createMessage(payload);
  } catch (error) {
    yield put(createMessageError(error))
  }
}
