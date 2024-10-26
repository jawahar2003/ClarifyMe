import {create} from 'zustand';
import zukeeper from'zukeeper';

const useStore = create(zukeeper((set) => ({
  user:{
    token:'',
    username:''
  },
  questions:[],
  setQuestions:(questions) => set({questions}),
  setUser:(user) =>set({ user }),
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  setUserName: (userName) => set({ userName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
})));
window.store = useStore
export default useStore;