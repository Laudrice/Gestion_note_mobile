import React, { useEffect } from 'react';
import { initDatabase } from './utils/db';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    initDatabase();
  }, []);

  return <AppNavigator />;
};

export default App;
