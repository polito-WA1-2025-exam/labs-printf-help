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
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 className="mb-2">Order {order.id}</h5>
                        <p className="mb-1 text-muted">
                            Date: {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p className="mb-0 fw-semibold">Total: {order.totalPrice.toFixed(1)} €</p>
                    </div>
                    <Button variant="outline-secondary" size="sm" onClick={toggleExpanded}>
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                </div>

                {expanded && (
                    <div className="mt-3 border-top pt-3">
                        <p className="mb-1">User id: {order.userId}</p>
                        <p className="mb-0">Discount Applied: {order.appliedDicount.toFixed(1)} €
                        </p>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

export default OrderCard
