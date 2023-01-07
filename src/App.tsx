import React from 'react';
import './App.css';
import { ErrorSnackbar } from './common/error_snack_bar/ErrorSnackBar';
import { AdminPanel } from './components/admin_panel/AdminPanel';

function App() {
  return (
    <>
      <ErrorSnackbar />
      <AdminPanel />
    </>
  );
}

export default App;
