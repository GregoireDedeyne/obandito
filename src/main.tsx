import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import ErrorPage from './components/Error/index.tsx';
import { NotLogLayout } from './components/Layouts/NotLogLayout/NotLogLayout.tsx';
import { HomeNotLogPage } from './components/Pages/HomeNotLogPage.tsx';
import { SubscribePage } from './components/Pages/Subscribe.tsx';
import { LoginPage } from './components/Pages/Login.tsx';
import {
  GET_HOMEDATA,
  GET_HOMEGENREDATA,
  GET_HOMEREGIONDATA,
} from './graphQL/actions/index.tsx';

// Add ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const HomeLoader = async () => {
  const { data } = await client.query({
    query: GET_HOMEDATA,
    variables: {
      limit: 10,
      limitEvents: 5,
    },
  });

  return data;
};

const RegionLoader = async ({ params }) => {
  const { region } = params;
  console.log(region);

  const { data } = await client.query({
    query: GET_HOMEREGIONDATA,
    variables: {
      limit: 10,
      region: region,
    },
  });

  const newData = Object.assign({}, data, { lastEvents: data.eventByRegion });
  delete newData.eventByRegion;

  return newData;
};

const GenreLoader = async ({ params }) => {
  const { genre } = params;

  const { data } = await client.query({
    query: GET_HOMEGENREDATA,
    variables: {
      limitEvents: 5,
      style: genre,
    },
  });
  const newData = Object.assign({}, data, {
    randomArtists: data.artistsByStyle,
  });
  delete newData.artistsByStyle;

  return newData;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <NotLogLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeNotLogPage />,
        loader: HomeLoader,
      },
      {
        path: '/region/:region',
        element: <HomeNotLogPage />,
        loader: RegionLoader,
      },
      {
        path: '/genre/:genre',
        element: <HomeNotLogPage />,
        loader: GenreLoader,
      },
      {
        path: '/subscribe',
        element: <SubscribePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      { path: '/home/:id', element: <HomeNotLogPage />, loader: HomeLoader },
    ],
  },
  // {
  //   path: '/',
  //   element: <LogLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: '/settings',
  //       element: <SettingProfile onSubmit={''} />,
  //     },
  //     {
  //       path: '/search',
  //       element: <SearchProfile />,
  //     },
  //     {
  //       path: '/profile:id',
  //       element: <Profile />,
  //     },
  //   ],
  // },
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
