import { gql } from '@apollo/client';

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    orders {
      _id
      customerName
      address
      status
      items {
        name
        quantity
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      _id
      name
      image
      price
      category
    }
  }
`;

export const GET_USER_ROLE = gql`
  query GetUserRole($email: String!) {
    getUserRole(email: $email)
  }
`;
