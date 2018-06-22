import gql from 'graphql-tag';

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

export const HUNTERS_COUPONS = gql`
  query couponsByHunterInCompany($hunterId: String!){
    couponsByHunter(hunterId: $hunterId) {
      ...on CouponForMaker {
        id
        code
        status
        updatedAt
        campaign {
          id
          title
        }
      }
    }
  }
`;

