import {Bowl} from "./bowl.mjs";

export function displayOrders(db) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM bowlsPerOrder`, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const result = rows.map(item => {
                    const bowl = new Bowl();

                    bowl.setSize(item.size);
                    bowl.setBase(item.base);
                    bowl.setProteins(item.proteins.split(','));
                    bowl.setIngredients(item.ingredients.split(','));

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
                    FROM bowlsPerOrder
                    WHERE size = ?`;
        db.all(sql, [size], (err, rows) => {
            if (err) {
                reject(err);
            } 
            else {
                const result = rows.map(item => {
                    const bowl = new Bowl();

                    bowl.setSize(item.size);
                    bowl.setBase(item.base);
                    bowl.setProteins(item.proteins.split(','));
                    bowl.setIngredients(item.ingredients.split(','));

                    return bowl;
                })

                resolve(result);
            }
        });
    });
}
