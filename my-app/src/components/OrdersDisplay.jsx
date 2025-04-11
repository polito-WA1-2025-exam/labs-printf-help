import { Button, Table } from "react-bootstrap"

function OrdersDisplay(props){
    const ans = props.orders

    return <Table striped bordered hover>                        
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">UserID</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Discount</th>
            </tr>
        </thead>
        <tbody>
            {ans.map(a => <OrderRow key={a.orderId} order={a}/>)}
        </tbody>
    </Table>
}

function OrderRow(props){
    const a = props.order
    return <tr>
        <OrderRowData order={a}/>
    </tr>
}

function OrderRowData(props){
    const a = props.order
    return <>
        <td>{a.orderId}</td>
        <td>{a.userID}</td>
        <td>{a.orderDate}</td>
        <td>{a.total}</td>
        <td>{a.appliedDiscount}</td>
    </>
}

export default OrdersDisplay