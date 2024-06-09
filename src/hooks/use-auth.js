import { useDispatch, useSelector } from 'react-redux';
import { resetUserData, setUserData } from '@redux/slices/AuthSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);

  const resetUser = () => {
    dispatch(resetUserData());
  };

  const setUser = (userData) => {
    dispatch(setUserData(userData));
  };

  return {
    resetUser,
    setUser,
    user,
  };
};
