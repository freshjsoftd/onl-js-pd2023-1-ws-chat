import axios from 'axios';
import { io } from 'socket.io-client';
// import { SOCKET_EVENTS } from '../../../constant/constants';
import {
  createMessageSuccess,
  createMessageError,
} from '../actions/actionCreators';
import store from './../store';
const { SOCKET_EVENTS } = require('../constant/constants');

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5000/api'
}
const http = axios.create(axiosOptions);

export const getMessages = () => http.get('/messages');

const socket = io('ws://127.0.0.1:5000');

export const createMessage = data => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, data);
}

socket.on(SOCKET_EVENTS.NEW_MESSAGE, newMessage => {
  store.dispatch(createMessageSuccess(newMessage));
})
socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error => {
  store.dispatch(createMessageError(error));
})


