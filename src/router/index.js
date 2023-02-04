import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import Index from './Index/Index'
import Johnson from './Jhonson/Johnson'
import JohnsonAdd from './JhonsonAdd/JhonsonAdd'
import JohnsonAdds from './JhonsonAdd/JhonsonAdds'

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
        path: "/add-jhonson/:id_code",
        element: <JohnsonAdd />
      },{
        path: "/add-jhonsons/:id_code",
        element: <JohnsonAdds />
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