import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import Index from './Index/Index'
import Johnson from './Jhonson/Johnson'
import JohnsonAdd from './JhonsonAdd/JhonsonAdd'
import JohnsonAdds from './JhonsonAdd/JhonsonAdds'
import Request from './Request/Request'
import Stocks from './Stocks/Stocks'
<<<<<<< HEAD
import StockTypes from './StockTypes/StockTypes'
=======
>>>>>>> 1ef42e8037f673d50ebf0c12ac530ec898c28d13

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
        path: "/request/:id_code",
        element: <Request />
      },{
        path: "/stocks",
<<<<<<< HEAD
        element: <StockTypes />
      },{
        path: "/stocks/:type",
=======
>>>>>>> 1ef42e8037f673d50ebf0c12ac530ec898c28d13
        element: <Stocks />
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