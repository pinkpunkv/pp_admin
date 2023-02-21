import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { LoginPage } from './components/login/Login';
import { AddNewProduct } from './components/add_new_product/AddNewProduct';
import { Paths } from './common/paths/Paths';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path={Paths.main} element={<App />} />
        <Route path={Paths.login} element={<LoginPage />} />
        <Route path={Paths.add_product} element={<AddNewProduct />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
