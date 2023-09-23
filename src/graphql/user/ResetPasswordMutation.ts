import { gql } from 'graphql-tag';

export default gql`
mutation resetPassword($email: String!, $token: String!, $password: String!) {
    resetPassword(email: $email, token: $token, password: $password)
}`;
