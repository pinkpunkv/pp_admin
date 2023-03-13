import React from 'react';
import './App.css';
import { ErrorSnackbar } from './common/error_snack_bar/ErrorSnackBar';
import { AdminPanel } from './components/admin_panel/AdminPanel';
import { useAppSelector } from './hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from './common/paths/Paths';

function App() {
  const initialized = useAppSelector(store => store.app.initialized)
  const navigate = useNavigate()

  console.log(initialized)
  if (initialized === true) {
    navigate(Paths.login)

  }
  return (
    <>
      <ErrorSnackbar />
      <AdminPanel />
    </>
  );
}

export default App;
