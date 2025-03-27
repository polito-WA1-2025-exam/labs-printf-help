import dayjs from "dayjs";

export class Order {
    constructor({orderId = null, userID, orderDate, total = 0, appliedDiscount = "FALSE"}) {
        this.orderId = orderId;
        this.userID = userID; 
        this.orderDate = orderDate? orderDate : dayjs().format('YYYY-MM-DD');
        this.total = total;
        this.appliedDiscount = appliedDiscount;
        this.bowls = [];
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
    getBowls() {
        return this.bowls;
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

    addBowl (bowl) {
        this.bowls.push(bowl);
    }

    // Convert to JSON
    toJSON() {
        return {
            orderId: this.orderId,
            userID: this.userID,
            orderDate: this.orderDate,
            bowls: this.bowls.map(bowl => bowl.toJSON()),
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