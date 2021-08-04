import Shopify, { ApiVersion } from "@shopify/shopify-api";

async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch(process.env.HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const json = await res.json()
  
    if (json.errors) {
        throw new Error('Failed to fetch API')
    }
  
    return json.data
  }
  
  export async function getAllProducts() {
    const data = await fetchAPI(`
    query {
      products(first: 10) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
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
    `)
    return data
  }
  
  