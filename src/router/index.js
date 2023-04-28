import { createBrowserRouter } from "react-router-dom"
import Layout from '../components/Layout/Layout'
import Index from './Index/Index'
import Jh01interno from './01cargas/Jhonson/Jh01interno/Jh01interno'
import Jh01formulario from './01cargas/Jhonson/Jh01formulario/Jh01formulario'
import Jh02agregar01 from './01cargas/Jhonson/Jh02agregar/Jh02agregar01'
import Jh02agregar02 from './01cargas/Jhonson/Jh02agregar/Jh02agregar02'

import Ca01Tipo from './01cargas/Ca01Tipo/Ca01Tipo'
import Ca02Nota from './01cargas/Ca02Nota/Ca02Nota'
import Ca02Interna from "./01cargas/Ca02Interna/Ca02Interna"

import Us01Rol from './03usuarios/Us01Rol/Us01Rol'
import Us02Admin from "./03usuarios/Us02Admin/Us02Admin"
import Us03Client from "./03usuarios/Us03Client/Us03Client"

import Co01Tipo from './04consultas/Co01Tipo/Co01Tipo'
import Co02Nota from './04consultas/Co02Nota/Co02Nota'
import Co03Detalle from './04consultas/Co03Detalle/Co03Detalle'
import Co04Stock from "./04consultas/Co04Stock/Co04Stock"
import Co04Stocks from "./04consultas/Co04Stock/Co04Stocks"

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
        path: "/note",
        element: <Ca02Nota />
      },{
        path: "/internal/:code",
        element: <Ca02Interna />
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
        path: "/request/:id_code",
        element: <Co03Detalle />
      },{
        path: "/all/:product",
        element: <Co04Stock />
      },{
        path: "/alls/:product",
        element: <Co04Stocks />
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