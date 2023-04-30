import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout.jsx'
import Index from './Index/Index.jsx'
import Jh01formulario from './01cargas/Jhonson/Jh01formulario/Jh01formulario.jsx'
import Jh02agregar01 from './01cargas/Jhonson/Jh02agregar/Jh02agregar01.jsx'
import Jh02agregar02 from './01cargas/Jhonson/Jh02agregar/Jh02agregar02.jsx'

import Ca01Tipo from './01cargas/Ca01Tipo/Ca01Tipo.jsx'
import Ca02Nota from './01cargas/Ca02Nota/Ca02Nota.jsx'

import Us01Rol from './03usuarios/Us01Rol/Us01Rol.jsx'
import Us02Admin from "./03usuarios/Us02Admin/Us02Admin"
import Us03Client from "./03usuarios/Us03Client/Us03Client"

import Co01Tipo from './04consultas/Co01Tipo/Co01Tipo.jsx'
import Co02Nota from './04consultas/Co02Nota/Co02Nota.jsx'
import Co03Detalle from './04consultas/Co03Detalle/Co03Detalle.jsx'
import Co04Stock from "./04consultas/Co04Stock/Co04Stock"

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
        path: "/add-jhonson/:id_code/:id_client",
        element: <Jh02agregar01 />
      },{
        path: "/add-jhonsons/:id_code/:id_client",
        element: <Jh02agregar02 />
      },{
        path: "/users",
        element: <Us01Rol />
      },{
        path: "/admin",
        element: <Us02Admin role='admin' />
      },{
        path: "/client",
        element: <Us03Client role='cliente' />
      },{
        path: "/stocks",
        element: <Co01Tipo />
      },{
        path: "/stocks/:type",
        element: <Co02Nota />
      },{
        path: "/request/:id_code/:id_client",
        element: <Co03Detalle />
      },{
        path: "/all/:product",
        element: <Co04Stock />
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