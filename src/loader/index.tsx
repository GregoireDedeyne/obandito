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

export const EventsSearch: any = async ({
  params,
}: {
  params: { searchTerm: string };
}) => {
  const { searchTerm } = params;
  console.log(searchTerm);

  const { data } = await client.query({
    query: GET_SEARCH_EVENTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const ArtistsSearch: any = async ({
  params,
}: {
  params: { searchTerm: string };
}) => {
  const { searchTerm } = params;
  console.log(searchTerm);

  const { data } = await client.query({
    query: GET_SEARCH_ARTISTSHOMEDATA,
    variables: {
      name: searchTerm,
    },
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const MoreHomeLoader: any = async ({
  params,
}: {
  params: {
    limitEvents: string;
  };
}) => {
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

export const RegionLoader: any = async ({
  params,
}: {
  params: {
    region: string;
  };
}) => {
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

export const GenreLoader: any = async ({
  params,
}: {
  params: {
    genre: string;
  };
}) => {
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

export const EventLoader: any = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
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
    fetchPolicy: 'no-cache',
  });
  console.log('dataloader :', data);
  return data;
};

export const RegionSelectLoader = async () => {
  const { data } = await client.query({
    query: GET_REGION,
    fetchPolicy: 'no-cache',
  });

  return data;
};

export const ProfileBandLoader: any = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
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

export const ProfileOrganizerLoader: any = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
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
