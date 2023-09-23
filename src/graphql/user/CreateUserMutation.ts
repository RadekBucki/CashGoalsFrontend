import { gql } from 'graphql-tag';

export default gql`
mutation createUser($userInput: CreateUserInput!) {
  createUser(input: $userInput) {
      name
      email
  }
}`;
