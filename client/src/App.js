import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import './App.css';
import * as chatActionCreators from './actions/actionCreators';

function App () {
  const {messages, isFetching, error} = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const {getMessagesAction, createMessageAction, } = bindActionCreators(
    chatActionCreators,
    dispatch
  )

  useEffect(() => {
    getMessagesAction();
  }, [getMessagesAction]);
console.log(messages)
  return (
    <>
      <ol>
          {messages.map(message => (
            <li key={message.createdAt}>
              {message.author} {message.body} {message.createdAt}
            </li>
          ))}
      </ol>
      {error && <div>ERROR!!!</div>}
      {isFetching && <div>Loading ...</div>}
      <Formik
        initialValues={{author: '', body: ''}}
        onSubmit={(values, formikBag) => {
          createMessageAction(values);
          formikBag.resetForm();
        }}
      >
        {(formik) => (
          <Form>
            <label htmlFor='author'>Author</label>
            <Field name='author'/>
            <label htmlFor='body'>Body</label>
            <Field name='body'/>
            <button type='submit'>Send</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default App;
