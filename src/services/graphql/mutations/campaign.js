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
