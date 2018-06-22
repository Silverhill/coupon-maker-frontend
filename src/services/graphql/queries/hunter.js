import gql from 'graphql-tag';

export const HUNTER_COUPONS_IN_COMPANY = gql`
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

export const HUNTER_COUPONS_IN_CAMPAING = gql`
  query couponsByHunterInCampaign($campaignId: String!, $hunterId: String!){
    coupons: couponsByCampaignAndHunter(campaignId:$campaignId, hunterId: $hunterId) {
      id
      status
      code,
      updatedAt
    }
  }
`;


