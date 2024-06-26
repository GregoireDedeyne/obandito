import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.js';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './styles/index.css';
import ErrorPage from './components/Error/index.jsx';
import { NotLogLayout } from './NotLogLayout/NotLogLayout.jsx';
import { HomeNotLogPage } from './Pages/Home.jsx';
import { SubscribePage } from './Pages/Subscribe.jsx';
import { LoginPage } from './Pages/Login.jsx';
import { EventPage } from './Pages/Event.jsx';
import { EventFormPage } from './Pages/EventForm.jsx';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import ProfileBis from './Pages/ProfileBis.jsx';

import {
  ArtistsSearch,
  EventLoader,
  EventsSearch,
  GenreLoader,
  HomeLoader,
  MoreHomeLoader,
  MsgData,
  ProfileBandLoader,
  ProfileOrganizerLoader,
  RegionLoader,
  RegionSelectLoader,
} from './loader/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { ForgotPasswordPage } from './Pages/ForgotPassword.jsx';
import { ChatAllPage } from './Pages/ChatPage.jsx';
import { LeftMsg } from './components/MyMessages/index.jsx';

// create uploadLink for pict
const uploadLink = createUploadLink({
  uri: `${import.meta.env.VITE_BACK_URL}graphql`,
});
// Add apollo client
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
        path: '/chat/room/:idsender/:idrecever',
        element: <ChatAllPage />,
        loader: MsgData,
      },
      {
        path: '/my-messages',
        element: <LeftMsg />,
        loader: MsgData,
      },
      {
        path: '/reset-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password/:token',
        element: <ForgotPasswordPage />,
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
        loader: RegionSelectLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ApolloProvider>
  // </React.StrictMode>
);
