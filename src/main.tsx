import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.ts';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import ErrorPage from './components/Error/index.tsx';
import { NotLogLayout } from './components/Layouts/NotLogLayout/NotLogLayout.tsx';
import { HomeNotLogPage } from './components/Pages/Home.tsx';
import { SubscribePage } from './components/Pages/Subscribe.tsx';
import { LoginPage } from './components/Pages/Login.tsx';
import {
  GET_ARTISTE,
  GET_HOMEDATA,
  GET_HOMEGENREDATA,
  GET_HOMEREGIONDATA,
  GET_ONE_EVENT,
  GET_ORGANIZER,
} from './graphQL/actions/index.tsx';
import Profile from './components/Pages/Profile.tsx';
import { EventPage } from './components/Pages/Event.tsx';

// Add ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const HomeLoader = async () => {
  const { data } = await client.query({
    query: GET_HOMEDATA,
    variables: {
      limit: 9,
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

  return data;
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

  return data;
};

const EventLoader = async ({ params }) => {
  const { id } = params;
  const eventId = parseInt(id);
  console.log(id);

  const { data } = await client.query({
    query: GET_ONE_EVENT,
    variables: {
      eventId: eventId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${store.getState().decodedToken.token}`,
      },
    },
  });

  return data;
};

const ProfileBandLoader = async ({ params }) => {
  const { id } = params;
  const artistId = parseInt(id);
  const { data } = await client.query({
    query: GET_ARTISTE,
    variables: {
      artistId: artistId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${store.getState().decodedToken.token}`,
      },
    },
  });

  return data;
};

const ProfileOrganizerLoader = async ({ params }) => {
  const { id } = params;
  const organizerId = parseInt(id);
  const { data } = await client.query({
    query: GET_ORGANIZER,
    variables: {
      organizerId: organizerId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${store.getState().decodedToken.token}`,
      },
    },
  });

  return data;
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
      {
        path: '/profile/band/:id',
        element: <Profile />,
        loader: ProfileBandLoader,
      },
      {
        path: '/profile/organizer/:id',
        element: <Profile />,
        loader: ProfileOrganizerLoader,
      },
      {
        path: '/event/:id',
        element: <EventPage />,
        loader: EventLoader,
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
