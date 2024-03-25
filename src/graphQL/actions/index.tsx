import { gql } from "@apollo/client";

// Query

// Mutation
export const CREATE_ACCOUNT = gql `
mutation CreateAccount($input: RegisterUserInput!) 
{register(input: $input) 
    {id} 
}` 

export const LOGIN_MUTATION = gql`
  mutation Login($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      token
    }
  }
`;




