import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from './pages/LandingPage.jsx'
import './index.css'
import RegistrationForm from './pages/Registration.jsx'
import OtpVerificationPage from './pages/OtpVerificationPage.jsx'
import Login from './pages/Login.jsx'
import ErrorPage from './pages/Error.jsx'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([

{
  path:'/',
  element: <LandingPage/>,
  errorElement: <ErrorPage/>,
},
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
  element: <Login />,
  errorElement: <ErrorPage/>,
},
{
  path:'/home',
  element: <Home/>,
  errorElement: <ErrorPage/>,
}

])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}/>

)
