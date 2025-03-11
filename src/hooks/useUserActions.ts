import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../context/user/slice";
import { IStateActions, IUserStore } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

type RootState = { user: IStateActions };

/**
 * Hook personalizado para manejar acciones relacionadas con el usuario.
 * Proporciona funciones para agregar y eliminar usuarios, así como acceso al estado actual del usuario.
 *
 * @returns {Object} Un objeto que contiene:
 * - `user`: El estado actual del usuario.
 * - `addUser`: Función para agregar un usuario al estado.
 * - `removeUser`: Función para eliminar el usuario del estado y limpiar las consultas relacionadas.
 */

export const useUserActions = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user.user);

  const addUser = useCallback((newUser: IUserStore) => {
    dispatch(setUser(newUser));
  }, [dispatch]);

  const removeUser = useCallback(async () => {
    try {
      queryClient.removeQueries({ queryKey: ['user'] });
      dispatch(logout());
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }, [dispatch, queryClient]);

  return useMemo(() => ({ user, addUser, removeUser }), [user, addUser, removeUser]);
};