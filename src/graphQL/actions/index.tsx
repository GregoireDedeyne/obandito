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
      zip_code
      description
      youtube_link
      spotify_link
      validation
      role {
        name
      }
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
      }
      style {
        name
      }
    }
  }
`;

export const GET_ARTISTE = gql`
  query Artist($artistId: Int!) {
    artist(id: $artistId) {
      id
      mail
      name
      image_url
      address
      city
      region
      zip_code
      description
      youtube_link
      spotify_link
      validation
      style {
        name
      }
      role {
        name
      }
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
      }
    }
  }
`;

export const GET_LASTARTISTS = gql`
  query LastArtists($limit: Int!) {
    artists(limit: $limit) {
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

export const GET_MOREHOMEDATA = gql`
  query RandomBandsQuery($limit: Int, $limitEvents: Int) {
    artists(limit: $limit) {
      image_url
      name
      id
      style {
        name
      }
    }
    events(limit: $limitEvents) {
      city
      description
      image_url
      id
      name
      region
      price
      date
      available
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

export const GET_HOMEDATA = gql`
  query RandomBandsQuery($limit: Int, $limitEvents: Int) {
    artists(limit: $limit) {
      image_url
      name
      id
      style {
        name
      }
    }
    events(limit: $limitEvents) {
      city
      description
      image_url
      id
      name
      region
      price
      date
      available
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

export const GET_SEARCH_ARTISTSHOMEDATA = gql`
  query RandomBandsQuery($name: String) {
    artists(name: $name) {
      name
      image_url
      id
      style {
        name
      }
    }
  }
`;

export const GET_SEARCH_EVENTSHOMEDATA = gql`
  query RandomBandsQuery($name: String) {
    events(name: $name) {
      city
      description
      image_url
      id
      name
      region
      price
      date
      available
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
    artists(style: $style) {
      image_url
      name
      id
      style {
        name
      }
    }
    events(limit: $limitEvents) {
      city
      description
      image_url
      name
      region
      price
      date
      id
      available
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
    artists(limit: $limit) {
      image_url
      name
      id
      style {
        name
      }
    }
    events(region: $region) {
      city
      date
      id
      description
      image_url
      name
      available
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

export const GET_ONE_EVENT = gql`
  query GetOneEvent($eventId: Int!) {
    event(id: $eventId) {
      description
      date
      city
      catering
      available
      id
      image_url
      name
      occupied_slots
      region
      price
      total_slots
      zip_code
      address
      artists {
        name
        id
        image_url
        style {
          name
        }
      }
      organizer {
        name
        image_url
        region
        id
      }
    }
  }
`;

export const POSTULATION_EVENT = gql`
  mutation PostulationEvent($eventId: Int!) {
    postulationEvent(eventId: $eventId)
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

export const CREATE_EVENT = gql`
  mutation Mutation($input: InputAddEvent!) {
    addEvent(input: $input) {
      name

      description
      date
      city
      catering
      address
      price
      region
      total_slots
      zip_code
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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      mail
      name
      image_url
      address
      city
      region
      zip_code
      description
      youtube_link
      spotify_link
      validation
      style {
        name
      }
      role {
        name
      }
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
        total_slots
        occupied_slots
        available
      }
    }
  }
`;
