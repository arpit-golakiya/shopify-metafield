import { useQuery } from "react-apollo";
import gql from "graphql-tag";

const getBlogs = (search = '*', status = '') => {
  let query = '';
  if(search != '*' && search != null) query = `title: ${search}*`;  
  if(status != '' && status != null) query = ( query != '' ? ` AND ` : ``)+`status:${status}`;
  if(query != '') query = `, query:"${query}"`;

  const GET_ = gql`
  query {
    blogs (first:10${query}) {
      pageInfo { # Returns details about the current page of results
        hasNextPage # Whether there are more results after this page
        hasPreviousPage # Whether there are more results before this page
      }
      edges {
        node {
          id
          seo {
            title
            description
          }
          title
          url
          handle
        }
      }
    }
  }
`;
  return useQuery(GET_);
}

const addBlogsMetafield = (product_id) => {
  $input = product_id
  const Add_Query = gql`
  mutation($input: BlogInput!) {
  blogUpdate(input: $input) {
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

export { getBlogs, addBlogsMetafield };