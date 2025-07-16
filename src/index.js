import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
let persistor = persistStore(store)
root.render(

  <ChakraProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ChakraProvider>

);

