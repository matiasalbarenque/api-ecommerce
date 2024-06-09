import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '@redux/slices/CategoriesSlice';

export const useCategories = () => {
  const dispatch = useDispatch(); // Dispara un action (slice) pasada por parámetro
  // Obtiene los datos del state
  const state = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return state;
};
