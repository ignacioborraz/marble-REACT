import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import Index from './Index/Index'
import Johnson from './Jhonson/Johnson-1-type'
import Model from './Jhonson/Johnson-2-model'
import Accesory from './Jhonson/Johnson-3-accesory'
import Sink from './Jhonson/Johnson-4-sink'

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
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
      },{
        path: "/j/:jhonson/a/:acc",
        element: <Sink />
      },{
        path: "/",
        element: <Index />
      },{
        path: "/*",
        element: <Index />
      } 
    ]
  }
])