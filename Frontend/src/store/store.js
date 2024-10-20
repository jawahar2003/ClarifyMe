import {create} from 'zustand';

const useStore = create((set) => ({
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  setUserName: (userName) => set({ userName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
}));

export default useStore;