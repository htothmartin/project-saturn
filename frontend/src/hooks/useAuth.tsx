import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { currentUser } = useContext(AuthContext);
  useDebugValue(currentUser, (currentUser) =>
    currentUser?.email ? 'Logged In' : 'Logged Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
