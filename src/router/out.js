import { createBrowserRouter } from "react-router-dom"
import SignIn from './SignIn/SignIn'

export const out = createBrowserRouter([{
    path: "/*",
    element: <SignIn />
  }
])