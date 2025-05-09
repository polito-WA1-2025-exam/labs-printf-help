const URI = "http://localhost:3000/api"

async function loadOrders (userId){
    const response = await fetch(`${URI}/order/${userId}`)
    const orders = await response.json()
    console.log(orders)
    return orders
}

export {loadOrders}