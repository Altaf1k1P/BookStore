import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store, { persistor } from './store/Store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './Page/Home.jsx';
import BookDetail from './Page/BookDetail.jsx';
import Login from './Page/Login';
import Signup from './Page/Signup';
import AllBooks from './Page/AllBooks.jsx';
import NotFound from './Page/NotFound.jsx'
import UserSettings from './Page/UserSettings.jsx';
import AuthRoute from './Components/AuthRoute.jsx';
import AddBook from './Page/AddBook.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/book-detail/:id', element: <BookDetail /> },
      { path: '/all-books', element: <AllBooks /> },
      { path: '*', element: <NotFound /> },
     {
        path: '/settings',
        element: (
          <AuthRoute allowedRoles={['user', 'admin']}>
            <UserSettings />
          </AuthRoute>
        ),
      },
      {
        path: '/admin/add-book',
        element: (
          <AuthRoute allowedRoles={["admin"]}>
            <AddBook />
          </AuthRoute>
        ),
      },
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <PersistGate loading={false} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </StrictMode>
  </Provider>
)
