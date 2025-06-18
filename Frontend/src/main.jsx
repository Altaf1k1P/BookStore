import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './Page/Home.jsx';
import BookDetail from './Page/BookDetail.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
          {
          path: '/book-detail',
          element: <BookDetail />,
        }
      ]}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
    <App />
    </RouterProvider>
  </StrictMode>,
)
