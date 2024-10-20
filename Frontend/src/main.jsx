import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import RegistrationForm from './pages/Registration.jsx'
import OtpVerificationPage from './pages/OtpVerificationPage.jsx'
import Login from './pages/Login.jsx'
import ErrorPage from './pages/Error.jsx'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
{
  path:'/register',
  element: <RegistrationForm/>,
  errorElement: <ErrorPage/>,
},
{
  path:'/otp',
  element: <OtpVerificationPage/>,
  errorElement: <ErrorPage/>,
},
{
  path:'/login',
  element: <Login />
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
