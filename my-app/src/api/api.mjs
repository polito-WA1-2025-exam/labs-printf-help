const URI = "http://localhost:3000/api"

async function loadOrders (){
    const response = await fetch(`${URI}/order/list`)
    const orders = await response.json()
    console.log(orders)
    return orders
}