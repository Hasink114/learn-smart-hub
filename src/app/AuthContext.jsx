import { createContext, useContext, useEffect, useState } from "react";
import { watchAuth, getUserRole } from "../backend/authService";

const AuthCtx = createContext({ user: null, role: null, info: null, loading: true });

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, role: null, info: null, loading: true });

  useEffect(() => {
    const unsub = watchAuth(async (user) => {
      if (!user) {
        setState({ user: null, role: null, info: null, loading: false });
        return;
      }
      try {
        const { role, info } = await getUserRole(user.uid);
        setState({ user, role, info, loading: false });
      } catch (e) {
        console.error(e);
        setState({ user, role: null, info: null, loading: false });
      }
    });
    return () => unsub();
  }, []);

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}