import produce from 'immer';
import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 20
};

const messageReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.GET_MESSAGES_REQUEST:
    case ACTION_TYPES.CREATE_MESSAGE_REQUEST: {
      // return {...state, error: null, isFetching: true};
      return produce(state, draftState => {
        draftState.error = null;
        draftState.isFetching = true;
      })
    }
    case ACTION_TYPES.GET_MESSAGES_SUCCESS: {
      // const { messages } = payload;
      // const newMassages = [...payload];
      return {...state, messages: [...payload], isFetching: false};
    }
    case ACTION_TYPES.CREATE_MESSAGE_SUCCESS: {
      const {newMessage } = payload;
      const {messages, limit} = state;
      const newMassages = [...messages, newMessage];

      if(newMassages.length > limit) {
        newMassages.shift();
      }
      return {...state, messages: newMassages, isFetching: false}
    }
    case ACTION_TYPES.GET_MESSAGES_ERROR:
    case ACTION_TYPES.CREATE_MESSAGE_ERROR: {
      // const { payload } = action;
      // return {...state, error: payload, isFetching: false}
      return produce(state, draftState => {
        draftState.error = payload;
        draftState.isFetching = false;
      })
    }
    default:
      return state;
  }
};

export default messageReducer;
