import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import { ChevronDown, ChevronUp } from "lucide-react"

function OrderCard(props) {
    const [expanded, setExpanded] = useState(false)
    const order = props.order

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <Card>
            <Card.Body>
                <div>
                    <div>
                        <h5>Order {order.id}</h5>
                        <p>
                            Date: {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p>Total: {order.totalPrice.toFixed(1)} €</p>
                    </div>
                    <Button variant="outline-secondary" size="sm" onClick={toggleExpanded}>
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                </div>

                {expanded && (
                    <div>
                        <p>User ID: {order.userId}</p>
                        <p>Discount Applied: ${order.appliedDicount.toFixed(2)}</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default OrderCard
