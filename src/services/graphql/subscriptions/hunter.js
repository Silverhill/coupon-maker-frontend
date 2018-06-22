import gql from 'graphql-tag';

export const HUNTED_COUPON = gql`
  subscription huntedCoupons {
    huntedCoupon {
      id
      status
      code
    }
  }
`;
