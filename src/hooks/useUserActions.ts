import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../context/user/slice";
import { IStateActions, IUserStore } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

type RootState = { user: IStateActions };

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