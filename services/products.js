import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const getProducts = (search = '*', status = '') => {
  let query = '';
  if(search != '*' && search != null) query = `title: ${search}*`;  
  if(status != '' && status != null) query = ( query != '' ? ` AND ` : ``)+`status:${status}`;
  if(query != '') query = `, query:"${query}"`;

  const GET_PRODUCTS = gql`
  query {
    products(first: 10${query}) {
      pageInfo { # Returns details about the current page of results
        hasNextPage # Whether there are more results after this page
        hasPreviousPage # Whether there are more results before this page
      }
      edges {
        cursor
        node {
          id
          legacyResourceId
          title
          description
          productType
          featuredImage {
            originalSrc
          }
          totalInventory
          status
          vendor
          createdAt
          updatedAt
        }
      }
    }
  }
`;
  return useQuery(GET_PRODUCTS);
}

const addProductMetafield = (product_id) => {
  $input = product_id
  const Add_Query = gql`
  mutation($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      metafields(first: 100) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }
}
`;
  return useQuery(Add_Query);
}

export { getProducts, addProductMetafield };