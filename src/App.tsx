import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './store/store';
import { AppRouter } from './router/AppRouter';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App