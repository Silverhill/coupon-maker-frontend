import gql from 'graphql-tag';

export const SIGN_UP = gql`
  mutation signUp( $email: String!, $password: String!, $company: String, $name: String!){
    signUp(input: { email: $email, password: $password, company: $company, name: $name, role: "maker" }) {
      id
      name
      email
      role
      company {
        id
        businessName
        slogan
      }
    }
  }
`;

export const UPLOAD_IMAGE_USER = gql`
  mutation addImageToUser($upload: Upload!) {
    addImageToUser(upload: $upload) {
      image
      email
      role
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateProfile(
    $name: String,
    $email: String,
    $upload: Upload){
    updateUser(input:{
      name: $name,
      email: $email,
      upload: $upload
    }){
      id
      name
      email
      image
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updateMyPassword(
    $oldPass: String!,
    $newPass: String!){
    updatePassword(input:{
      oldPass: $oldPass,
      newPass: $newPass
    }){
      id
      name
    }
  }
`;
