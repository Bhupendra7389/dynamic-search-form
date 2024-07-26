import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import DynamicSearchForm from './components/DynamicSearchForm';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <AuthControls />
        <DynamicSearchForm />
      </div>
    </AuthProvider>
  );
};

const AuthControls = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div style={{textAlign: 'center'}}>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default App;
