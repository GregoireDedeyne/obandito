import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import ErrorPage from './components/Error/index.tsx';
import { NotLogLayout } from './components/Layouts/NotLogLayout/NotLogLayout.tsx';
import { HomeNotLogPage } from './components/Pages/HomeNotLogPage.tsx';
import { SubscribePage } from './components/Pages/Subscribe.tsx';
import { LoginPage } from './components/Pages/Login.tsx';
import { LogLayout } from './components/Layouts/LogLayout/index.tsx';
import { HomeLogin } from './components/Pages/HomeLogin.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NotLogLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeNotLogPage /> },
      {
        path: '/subscribe',
        element: <SubscribePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      // {
      //   // j'appel favoris avec la réponse
      //   path: '/recipe/favorites',
      //   element: <Favoris />,
      //   loader: () => {
      //     const recipe = store.dispatch(favorites());
      //     // console.log(recipe);
      //     return recipe;
      //   },
      // },
    ],
  },
  {
    path: '/home',
    element: <LogLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeLogin /> },
      // {
      //   path: '/band',
      //   element: <HomeLogin />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
