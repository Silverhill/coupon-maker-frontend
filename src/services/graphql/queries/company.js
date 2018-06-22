import gql from 'graphql-tag';

export const COMPANY = gql`
  query getMyCompany{
    myCompany {
      id
      businessName
      logo
      slogan
    }
  }
`;

export const OFFICES = gql`
  query makerOffices($withCompany: Boolean = false){
    myOffices {
      id
      name
      address
      officePhone
      email
      legalRepresentative
      cellPhone
      ruc
    }
    myCompany @include(if: $withCompany) {
      id
      businessName
      logo
      slogan
    }
  }
`;

export const HUNTERS_COMPANY = gql`
  query huntersCompany{
    hunters: myHunters{
      name
      email
      id
      redeemedCoupons
      huntedCoupons
      image
    }
  }
`;
