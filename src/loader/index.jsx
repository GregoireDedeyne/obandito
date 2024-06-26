import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GET_ARTISTE,
  GET_HOMEDATA,
  GET_HOMEGENREDATA,
  GET_HOMEREGIONDATA,
  GET_MESSAGES,
  GET_MOREHOMEDATA,
  GET_ONE_EVENT,
  GET_ORGANIZER,
  GET_REGION,
  GET_SEARCH_ARTISTSHOMEDATA,
  GET_SEARCH_EVENTSHOMEDATA,
} from '../graphQL/actions/index.jsx';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const token = localStorage.getItem('token');

const uploadLink = createUploadLink({
  uri: `${import.meta.env.VITE_BACK_URL}graphql`,
});

// Ajouter ApolloClient
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

export const HomeLoader = async () => {
  const { data } = await client.query({
    query: GET_HOMEDATA,
    variables: {
      limit: 9,
      limitEvents: 5,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const EventsSearch = async ({ params }) => {
  const { searchTerm } = params;

  const { data } = await client.query({
    query: GET_SEARCH_EVENTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const ArtistsSearch = async ({ params }) => {
  const { searchTerm } = params;

  const { data } = await client.query({
    query: GET_SEARCH_ARTISTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const MoreHomeLoader = async ({ params }) => {
  const limitEvents = parseInt(params.limitEvents);

  const { data } = await client.query({
    query: GET_MOREHOMEDATA,
    variables: {
      limit: 9,
      limitEvents: limitEvents,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const RegionLoader = async ({ params }) => {
  const { region } = params;

  const { data } = await client.query({
    query: GET_HOMEREGIONDATA,
    variables: {
      limit: 10,
      region: region,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const GenreLoader = async ({ params }) => {
  const { genre } = params;

  const { data } = await client.query({
    query: GET_HOMEGENREDATA,
    variables: {
      limitEvents: 5,
      style: genre,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const MsgData = async () => {
  const { data } = await client.query({
    query: GET_MESSAGES,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};
export const EventLoader = async ({ params }) => {
  const { id } = params;
  const eventId = parseInt(id);

  const { data } = await client.query({
    query: GET_ONE_EVENT,
    variables: {
      eventId: eventId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'no-cache',
  });
  return data;
};

export const RegionSelectLoader = async () => {
  const { data } = await client.query({
    query: GET_REGION,
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const ProfileBandLoader = async ({ params }) => {
  const { id } = params;
  const artistId = parseInt(id);
  const { data } = await client.query({
    query: GET_ARTISTE,
    variables: {
      artistId: artistId,
      idReceiver: artistId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const ProfileOrganizerLoader = async ({ params }) => {
  const { id } = params;
  const organizerId = parseInt(id);

  const { data } = await client.query({
    query: GET_ORGANIZER,
    variables: {
      organizerId: organizerId,
      idReceiver: organizerId,
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};
