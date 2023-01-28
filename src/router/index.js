import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import SignIn from './SignIn/SignIn'
import Index from './Index/Index'
import Johnson from './Jhonson/Johnson-1-type'
import Model from './Jhonson/Johnson-2-model'
import Accesory from './Jhonson/Johnson-3-accesory'

export const router = createBrowserRouter([{
    path: "/",
    element: <SignIn />
  },{
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/index",
        element: <Index />
      },{
        path: "/johnson",
        element: <Johnson />
      },{
        path: "/johnson/type/:type",
        element: <Model />
      },{
        path: "/johnson/acce/:code",
        element: <Accesory />
      }
      
    ]
  }
])