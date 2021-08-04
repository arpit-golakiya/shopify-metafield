import orders from "../../../json/orders.json"

export default async function handler(req, res) {
    res.status(200).json(orders) ;
}