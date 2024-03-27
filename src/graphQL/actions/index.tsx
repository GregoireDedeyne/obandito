import { gql } from '@apollo/client';

// Query
export const GET_ORGANIZER = gql`
  query Organizer($organizerId: Int!) {
    organizer(id: $organizerId) {
      id
      mail
      name
      image_url
      address
      city
      region
      role {
        name
      }
      description
      style {
        name
      }
      spotify_link
      youtube_link
      zip_code
    }
  }
`;

export const GET_LASTARTISTS = gql`
  query LastArtists($limit: Int!) {
    lastArtists(limit: $limit) {
      address
      city
      name
      mail
      role {
        name
      }
      region
      description
      image_url
      zip_code
      spotify_link
      style {
        name
      }
      validation
      youtube_link
      id
    }
  }
`;

export const GET_EVENTS = gql`
  query Query {
    events {
      id
      name
      image_url
      address
      city
      region
      date
      zip_code
      description
      catering
      price
      organizer_id
      validation
    }
  }
`;

export const GET_HOMEDATA = gql`
  query RandomBandsQuery($limit: Int, $limitEvents: Int) {
    randomArtists(limit: $limit) {
      image_url
      name
      style {
        name
      }
    }
    lastEvents(limit: $limitEvents) {
      city
      description
      image_url
      name
      region
      price
      date
      organizer {
        name
      }
    }
    getCountNameEventsByRegion {
      event_count
      region
    }
  }
`;

export const GET_HOMEGENREDATA = gql`
  query RandomBandsQuery($style: String, $limitEvents: Int) {
    artistsByStyle(style: $style) {
      image_url
      name
      style {
        name
      }
    }
    lastEvents(limit: $limitEvents) {
      city
      description
      image_url
      name
      region
      price
      date
      organizer {
        name
      }
    }

    getCountNameEventsByRegion {
      event_count
      region
    }
  }
`;

export const GET_HOMEREGIONDATA = gql`
  query RandomBandsQuery($limit: Int, $region: String!) {
    randomArtists(limit: $limit) {
      image_url
      name
      style {
        name
      }
    }
    eventByRegion(region: $region) {
      city
      date
      description
      image_url
      name
      organizer {
        name
      }
      price
      region
    }

    getCountNameEventsByRegion {
      event_count
      region
    }
  }
`;

export const GET_STYLES = gql`
  query getStyles {
    styles {
      name
    }
  }
`;

// Mutation
export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: RegisterUserInput!) {
    register(input: $input) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      token
    }
  }
`;
