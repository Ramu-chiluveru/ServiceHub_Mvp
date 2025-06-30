// store/userStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: true }),
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
        sessionStorage.removeItem('user-store'); // if needed
      },
    }),
    {
      name: 'user-store',
      getStorage: () => sessionStorage,
    }
  )
);
