import { gql } from 'graphql-tag';

export default gql`
mutation requestPasswordReset($email: String!, $resetUrl: String!) {
    requestPasswordReset(email: $email, resetUrl: $resetUrl)
}`;
