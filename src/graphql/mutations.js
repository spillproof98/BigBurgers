import { gql } from '@apollo/client';

export const UPDATE_ORDER_ITEMS = gql`
  mutation UpdateOrderItems($id: ID!, $items: [OrderItemInput!]!) {
    updateOrderItems(id: $id, items: $items) {
      _id
      items {
        name
        quantity
        price
      }
    }
  }
`;


export const UPLOAD_PRODUCT = gql`
  mutation UploadProduct($name: String!, $price: Float!, $category: String!, $image: String!) {
    uploadProduct(name: $name, price: $price, category: $category, image: $image) {
      _id
      name
      price
      image
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const ADD_USER = gql`
  mutation AddUser($email: String!, $role: String!) {
    addUser(email: $email, role: $role) {
      email
      role
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($email: String!) {
    removeUser(email: $email)
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;

export const CANCEL_ORDER = gql`
  mutation CancelOrder($id: ID!) {
    cancelOrder(id: $id)
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($items: [OrderItemInput!]!, $customerName: String!, $address: String!) {
    placeOrder(items: $items, customerName: $customerName, address: $address) {
      _id
      status
    }
  }
`;
