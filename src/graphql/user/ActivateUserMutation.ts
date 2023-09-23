import { gql } from 'graphql-tag';

export default gql`
mutation activateUser($email: String!, $token: String!) {
  activateUser(email: $email, token: $token)
}`;
