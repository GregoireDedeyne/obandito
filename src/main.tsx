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

import { EventPage } from './components/Pages/Event.tsx';
import { EventFormPage } from './components/Pages/EventForm.tsx';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import ProfileBis from './components/Pages/ProfileBis.tsx';
import {
  ArtistsSearch,
  EventLoader,
  EventsSearch,
  GenreLoader,
  HomeLoader,
  MoreHomeLoader,
  ProfileBandLoader,
  ProfileOrganizerLoader,
  RegionLoader,
  RegionSelectLoader,
} from './loader/index.tsx';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql/',
});

// Ajouter ApolloClient
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

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
        path: '/home/:limitEvents',
        element: <HomeNotLogPage />,
        loader: MoreHomeLoader,
      },
      {
        path: 'events/search/:searchTerm',
        element: <HomeNotLogPage />,
        loader: EventsSearch,
      },
      {
        path: 'artists/search/:searchTerm',
        element: <HomeNotLogPage />,
        loader: ArtistsSearch,
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
        loader: RegionSelectLoader,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      { path: '/home/:id', element: <HomeNotLogPage />, loader: HomeLoader },
      {
        path: '/profile/band/:id',
        element: <ProfileBis />,
        loader: ProfileBandLoader,
      },
      {
        path: '/profile/organizer/:id',
        element: <ProfileBis />,
        loader: ProfileOrganizerLoader,
      },
      {
        path: '/event/:id',
        element: <EventPage />,
        loader: EventLoader,
      },
      {
        path: 'eventcreation',
        element: <EventFormPage />,
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
