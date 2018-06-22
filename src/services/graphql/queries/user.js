import gql from 'graphql-tag';

export const ME = gql`
  query getMe($withCompany: Boolean = false) {
    me {
      name
      email
      image
      id
      role
    }
    myCompany @include(if: $withCompany) {
      id
      businessName
      logo
      slogan
    }
  }
`;

export const SIGN_IN = gql`
  query signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
      token
    }
  }
`;
