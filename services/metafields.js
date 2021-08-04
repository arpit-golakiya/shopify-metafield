import { useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";
import { titleCase } from "title-case";

export default {

  /*
   * List out All metafields
   */
  getAll: (id, metatype, search = '*') => {
    let query = '';
    if(search != '*' && search != null) query = `namespace: ${search}*`;  
    // if(status != '' && status != null) query = ( query != '' ? ` AND ` : ``)+`status:${status}`;
    if(query != '') query = `, query:"${query}"`;
  
    // id = `gid://shopify/${titleCase(metatype)}/${id}`
    
    // let query = (search == '*') ? '' : `, query:"title: ${search}*"`;
    const _QUERY = gql`
    query ($id: ID!, $numProducts: Int!) {
      ${metatype}(id: $id) {
        id
        metafields(first: $numProducts) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              namespace
              key
              value
              valueType
              description
              ownerType
              legacyResourceId
            }
          }
        }
      }
    }
  `;
    return useQuery(_QUERY, {
      variables: { 
        id: id, 
        numProducts: 10,
        search: '', 
        cursor: "" 
      }
    });
  }, 

  /*
   * Add new metafield
   */
  add: (id, metatype) => {
    // id = "gid://shopify/Product/6810054590619"
    // metatype = 'product'
    const updateName = metatype + 'Update';
    const updateInput = titleCase(metatype) + 'Input!';
    
    // console.log('id',id)
    // console.log('metatype',metatype)
    // console.log('updateName',updateName)

    const _QUERY = gql`
    mutation ${updateName}($metafield: [MetafieldInput!]) {
      ${updateName}(input: {
        id: "${id}",
        metafields: $metafield
      }) {
        product {
          id
          metafields(first: 10) {
            pageInfo { 
              hasNextPage 
              hasPreviousPage 
            }
            edges {
              node {
                id
                namespace
                key
                value
                description
                valueType
              }
            }
          }
        }
      }
    }
  `;
    return useMutation(_QUERY);
  },

  /*
   * Remove new metafield
   */
  remove: () => {
    const _QUERY = gql`
    mutation metafieldDelete($input: MetafieldDeleteInput!) {
      metafieldDelete(input: $input) {
        deletedId
        userErrors {
          field
          message
        }
      }
    }
  `;
    return useMutation(_QUERY);
  }
}

// productUpdate(
//   input: ProductInput!
//   ): ProductUpdatePayload


// mutation productUpdate($input: ProductInput!) {
//   productUpdate(input: $input) {
//     user {
//       id
//       username
//       email
//       phone
//       firstName
//       lastName
//     }
//   }
// }