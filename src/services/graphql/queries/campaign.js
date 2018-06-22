import gql from 'graphql-tag';

export const ALL_CAMPAIGNS = gql`
  query allCampaigns($limit: Int, $sortDirection: Int){
    myCampaigns(limit:$limit, sortDirection: $sortDirection) {
      campaigns{
        id
        title
        office {
          id
          address
        }
        startAt
        endAt
        image
        totalCoupons
        background
      }
    }
  }
`;

export const INACTIVE_CAMPAIGNS = gql`
  query inactiveCampaigns($limit: Int, $sortDirection: Int){
    myCampaigns: myInactiveCampaigns(limit:$limit, sortDirection: $sortDirection) {
      campaigns{
        id
        title
        office {
          id
          address
        }
        startAt
        endAt
        totalCoupons
        huntedCoupons
      }
    }
  }
`;

export const GET_CAMPAIGN = gql`
  query getCampaign($id:String!){
    campaign(id:$id){
      id
      title
      startAt
      endAt
      image
      totalCoupons
      customMessage
      city
      country
      description
      status
      background
      rangeAge
      huntedCoupons
      redeemedCoupons
      office {
        id
        address
      }
    }
  }
`;

export const HUNTERS_CAMPAIGN = gql`
  query huntersCampaign($id:String!){
    hunters: huntersByCampaign(campaignId: $id){
      name
      email
      image
      id
      couponsInCampaign
    }
  }
`;
