class Order {
    constructor() {
        this.orderId = null; // Order ID
        this.userID; 
        this.orderDate;
        this.total = 0;
        this.appliedDiscount = "FALSE";
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
        this.total += bowl.getPrice(); // Update total price
        if (this.bowls.length >= 4) {
            this.appliedDiscount = "TRUE"; // Set discount if more than one bowl is added
        }
    }

    delBowl (id) {
        this.bowls.filter(bowl => bowl.getLocalId() !== id); // Filter out the bowl with the given ID
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

export default Order;