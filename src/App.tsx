import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './store/store';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Home/>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App