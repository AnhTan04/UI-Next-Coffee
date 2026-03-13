import { create } from 'zustand';

const useSessionStore = create((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export default useSessionStore;