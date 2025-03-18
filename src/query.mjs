import {Bowl} from "./bowl.mjs";

export function displayOrders(db) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM orders`, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => {
                    const bowl = new Bowl();

                    bowl.setSize(JSON.parse(item.order_contents).size);
                    bowl.setBase(JSON.parse(item.order_contents).base);
                    bowl.setProteins(JSON.parse(item.order_contents).proteins);
                    bowl.setIngredients(JSON.parse(item.order_contents).ingredients);

                    return bowl;
                })

                resolve(result);
            }
        });
    });
}

export function filterOrdersBySize(db, size) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * 
                    FROM orders
                    WHERE json_extract(order_contents, '$.size') = "M"`;
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            } 
            else {
                const result = rows.map((item) => {
                    const bowl = new Bowl();

                    bowl.setSize(JSON.parse(item.order_contents).size);
                    bowl.setBase(JSON.parse(item.order_contents).base);
                    bowl.setProteins(JSON.parse(item.order_contents).proteins);
                    bowl.setIngredients(JSON.parse(item.order_contents).ingredients);

                    return bowl;
                });
                resolve(result);
            }
        });
    });
}
