import gql from 'graphql-tag';

export const UPLOAD_LOGO = gql`
  mutation changeLogoCompany($upload: Upload!){
    addImageToCompany(upload: $upload){
      id
      logo
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateMyCompany(
    $id: String!,
    $businessName: String,
    $slogan: String,
    $upload: Upload){
    updateCompany(input:{
      id: $id,
      businessName: $businessName,
      slogan: $slogan,
      upload: $upload
    }){
      id
      slogan
      logo
      businessName
    }
  }
`;

export const CREATE_OFFICE = gql`
  mutation createOffice(
    $ruc: String!,
    $economicActivity: String!,
    $contributorType: String!,
    $legalRepresentative: String!,
    $name: String!,
    $officePhone: String,
    $cellPhone: String,
    $address: String!,
    $email: String!,
    $companyId: String!){
      addOffice(input:{
        ruc: $ruc,
        economicActivity: $economicActivity,
        contributorType: $contributorType,
        legalRepresentative: $legalRepresentative,
        name: $name,
        officePhone: $officePhone,
        cellPhone: $cellPhone,
        address: $address,
        email: $email,
        companyId: $companyId
      }) {
        id
        ruc
        economicActivity
        contributorType
        legalRepresentative
        name
        officePhone
        cellPhone
        address
        email
      }
  }
`;
