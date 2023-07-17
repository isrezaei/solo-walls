import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "../page/Dashboard.tsx";
import User from "../page/User.tsx";

import {loader} from "./routes/root.tsx";
import Auth from "../page/auth.tsx";
import ProtectGuard from "../utils/protectGuard.tsx";
import { NextUIProvider } from '@nextui-org/react';
import { createTheme } from "@nextui-org/react"




const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader : loader,
    },
    {
        path: "/dashboard",
        element: <ProtectGuard components={<Dashboard/>}/> ,
        children : [{
            path : "/dashboard/user",
            element : <User/>
        }]
    },
    {
        path: "/auth",
        element: <Auth/>
    }
]);


const darkTheme = createTheme({
    type: 'dark',
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
      <NextUIProvider theme={darkTheme}>
          <RouterProvider router={router}/>
      </NextUIProvider>
  </>,
)
