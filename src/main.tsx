import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import ErrorPage from './components/Error/index.tsx';
import { NotLogLayout } from './components/Layouts/NotLogLayout/NotLogLayout.tsx';
import { HomeNotLogPage } from './components/Pages/HomeNotLogPage.tsx';
import { SubscribePage } from './components/Pages/Subscribe.tsx';
import { LoginPage } from './components/Pages/Login.tsx';
import { LogLayout } from './components/Layouts/LogLayout/index.tsx';
import { HomeLogin } from './components/Pages/HomeLogin.tsx';
import { SettingProfile } from './components/Pages/SettingProfile.tsx';
import { SearchProfile } from './components/Pages/SearchProfile.tsx';

// Add ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


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
    path: '/',
    element: <LogLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/home/:id', element: <HomeLogin /> },
      {
        path: '/settings',
        element: <SettingProfile onSubmit={''} />,
      },
      {
        path: '/search',
        element: <SearchProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
