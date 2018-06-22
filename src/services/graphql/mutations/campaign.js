import gql from 'graphql-tag';

export const REDEEM_COUPON = gql`
  mutation redeem($code: String!){
    redeemCoupon(input:{ couponCode: $code}){
      code
      id
      status
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
  mutation createCampaing(
    $startAt: Timestamp!,
    $endAt: Timestamp!,
    $country: String,
    $city: String,
    $couponsNumber: Int!,
    $title: String!,
    $description: String,
    $customMessage: String,
    $officeId: String!,
    $background: String,
    $rangeAge: [Int]!,
    $upload: Upload) {
      addCampaign(input:{
        startAt: $startAt,
        endAt: $endAt,
        country: $country,
        city: $city,
        couponsNumber: $couponsNumber,
        title: $title,
        description: $description,
        customMessage: $customMessage,
        officeId: $officeId,
        upload: $upload
        background: $background,
        rangeAge: $rangeAge
      }) {
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
        office {
          id
          address
        }
        totalCoupons
        background
      }
  }
`;
