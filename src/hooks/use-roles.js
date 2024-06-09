import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles } from '@redux/slices/RolesSlice';

export const useRoles = () => {
  const dispatch = useDispatch(); // Dispara un action (slice) pasada por parámetro
  // Obtiene los datos del state
  const state = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return state;
};
