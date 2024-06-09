import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles } from '@redux/slices/RolesSlice';

export const useRoles = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return state;
};
