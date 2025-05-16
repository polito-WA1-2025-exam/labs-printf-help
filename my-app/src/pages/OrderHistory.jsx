import OrderCard from "../components/OrderCard"

const sampleOrders = [
  {
    id: 1,
    userId: 1,
    orderDate: "2025-05-09 09:42:39",
    appliedDicount: 0,
    totalPrice: 10,
  },
  {
    id: 2,
    userId: 2,
    orderDate: "2025-05-10 14:21:11",
    appliedDicount: 2,
    totalPrice: 18,
  },
]

export default function OrderHistory() {
  return (
    <div className="text-center mt-5">
      <h1>Order History</h1>
      <div className="container mt-4">
        {sampleOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}