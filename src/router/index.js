import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import Index from './Index/Index'
import Jh01formulario from './01cargas/Jhonson/Jh01formulario/Jh01formulario'
import Jh02agregar01 from './01cargas/Jhonson/Jh02agregar/Jh02agregar01'
import Jh02agregar02 from './01cargas/Jhonson/Jh02agregar/Jh02agregar02'

import Ca01Tipo from './01cargas/Ca01Tipo/Ca01Tipo'
import Ca02Nota from './01cargas/Ca02Nota/Ca02Nota'

import Co01Tipo from './04consultas/Co01Tipo/Co01Tipo'
import Co02Nota from './04consultas/Co02Nota/Co02Nota'
import Co03Detalle from './04consultas/Co03Detalle/Co03Detalle'

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        path: "/index",
        element: <Index />
      },{
        path: "/new",
        element: <Ca01Tipo />
      },{
        path: "/new/:type",
        element: <Ca02Nota />
      },{
        path: "/new/jhonson/note",
        element: <Jh01formulario />
      },{
        path: "/add-jhonson/:id_code",
        element: <Jh02agregar01 />
      },{
        path: "/add-jhonsons/:id_code",
        element: <Jh02agregar02 />
      },{
        path: "/stocks",
        element: <Co01Tipo />
      },{
        path: "/stocks/:type",
        element: <Co02Nota />
      },{
        path: "/request/:id_code",
        element: <Co03Detalle />
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