import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { bindActionCreators } from 'redux';
import './App.css';
import * as chatActionCreators from './actions/actionCreators';

function App () {
  const {messages, isFetching, error} = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const {createMessageAction, getMessagesAction} = bindActionCreators(
    chatActionCreators,
    dispatch
  )

  useEffect(() => {
    getMessagesAction();
  }, [])

  return (
    <>
      
    </>
  );
}

export default App;
