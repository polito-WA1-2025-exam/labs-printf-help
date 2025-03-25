// order.mjs

import dayjs from "dayjs";

// Example: A class to represent an Order
export class Order {
    /*CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER NOT NULL,
    orderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    appliedDiscount BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
)*/
    constructor({orderId = null, userID, orderDate, total, appliedDiscount = "FALSE"}) {
        this.orderId = orderId;
        this.userID = userID; 
        this.orderDate = orderDate? orderDate : dayjs().format('YYYY-MM-DD');
        this.total = total;
        this.appliedDiscount = appliedDiscount;
    }
    // Getters
    getOrderId() {
        return this.orderId;
    }

    getUserID() {
        return this.userID;
    }

    getOrderDate() {
        return this.orderDate;
    }

    getTotal() {
        return this.total;
    }

    getAppliedDiscount() {
        return this.appliedDiscount;
    }

    // Setters
    setOrderId(orderId) {
        this.orderId = orderId;
    }

    setUserID(userID) {
        this.userID = userID;
    }

    setOrderDate(orderDate) {
        this.orderDate = orderDate;
    }

    setTotal(total) {
        this.total = total;
    }

    setAppliedDiscount(appliedDiscount) {
        this.appliedDiscount = appliedDiscount;
    }

    // Convert to JSON
    toJSON() {
        return {
            orderId: this.orderId,
            userID: this.userID,
            orderDate: this.orderDate,
            total: this.total,
            appliedDiscount: this.appliedDiscount
        };
    }

    // Create an Order instance from JSON
    static fromJSON(json) {
        return new Order(
            json.orderId,
            json.userID,
            json.orderDate,
            json.total,
            json.appliedDiscount
        );
    }
}