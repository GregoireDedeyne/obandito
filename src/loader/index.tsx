import { ApolloClient, InMemoryCache } from '@apollo/client';
import {
  GET_ARTISTE,
  GET_HOMEDATA,
  GET_HOMEGENREDATA,
  GET_HOMEREGIONDATA,
  GET_MOREHOMEDATA,
  GET_ONE_EVENT,
  GET_ORGANIZER,
  GET_REGION,
  GET_SEARCH_ARTISTSHOMEDATA,
  GET_SEARCH_EVENTSHOMEDATA,
} from '../graphQL/actions/index.tsx';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const token = localStorage.getItem('token');
console.log(token);

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql/',
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
  });

  return data;
};

export const EventsSearch = async ({ params }) => {
  const { searchTerm } = params;
  console.log(searchTerm);

  const { data } = await client.query({
    query: GET_SEARCH_EVENTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
  });

  return data;
};

export const ArtistsSearch = async ({ params }) => {
  const { searchTerm } = params;
  console.log(searchTerm);

  const { data } = await client.query({
    query: GET_SEARCH_ARTISTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
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
  });

  return data;
};

export const EventLoader = async ({ params }) => {
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
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data;
};

export const RegionSelectLoader = async () => {
  const { data } = await client.query({
    query: GET_REGION,
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
    },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'no-cache',
  });
  console.log("j'ai reload");

  return data;
};

export const ProfileOrganizerLoader = async ({ params }) => {
  const { id } = params;
  const organizerId = parseInt(id);
  console.log('je reload');

  const { data } = await client.query({
    query: GET_ORGANIZER,
    variables: {
      organizerId: organizerId,
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
