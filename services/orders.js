import { useQuery } from "react-apollo";
import axios from "axios";

const url =  "/api/orders";
const getOrders = async () => {
    const res = await fetch(url); 
   const orders = res.json();
   return orders;
}
export { getOrders};



//   let query = '';
//   if(search != '*' && search != null) query = `title: ${search}*`;  
//   if(status != '' && status != null) query = ( query != '' ? ` AND ` : ``)+`status:${status}`;
//   if(query != '') query = `, query:"${query}"`;
// {
//   headers: { 
//     // 'Content-Type': 'application/json',
//     // "Access-Control-Allow-Origin": "https://f381dd90326c.ngrok.io",
//     // 'Access-Control-Allow-Origin': '*',
//     // "x-requested-with": "XMLHttpRequest",
//     "X-Shopify-Access-Token":Token
//   }}
// const GET_ORDERS = await axios.get("https://hiren-panther.myshopify.com/admin/api/2021-07/orders.json")
// return GET_ORDERS;  