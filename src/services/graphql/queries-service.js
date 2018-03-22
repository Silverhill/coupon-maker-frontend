import gql from 'graphql-tag';

const QueryService = {
  login: gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password)
  }
  `
}

export default QueryService;
