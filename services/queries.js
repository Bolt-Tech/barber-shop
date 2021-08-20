import { connection } from './db_access.js';

export const getAppointment = async (req, hour) => {

    createCustomer(req);
    
    const [rows] = await connection.query(`SELECT * FROM appointments WHERE time='${hour}'`);

    if (parseInt(hour) < 9 || parseInt(hour) > 18) {
        return "Barber shop is closed. Please return between 09:00-18:00"
    }
    else if (rows[0]?.available) {
        await setAppointment(req, hour);
        return `See you at ${hour}!`
    }
    else {
        return "Barber is not available";
    }
}

const setAppointment = async(req, hour) => {
    const customers = await getCustomer(req);
    const { id: customerId } = customers[0]
    await connection.query(`UPDATE appointments SET available = 0, customer_id = '${parseInt(customerId)}' WHERE time='${hour}'`);
}

const createCustomer = async(req) => {
    const requestBody = req.body;
    const customers = await getCustomer(req);
    if (!customers[0]) {
        await connection.query(`INSERT INTO customers (first_name, last_name, email, phone) VALUES ('${requestBody.firstName}', '${requestBody.lastName}', '${requestBody.email}', '${requestBody.phone}')`);
    }
    else {
        return console.log("Customer already in Database");
    }
}

const getCustomer = async(req) => {
    const { phone } = req.body;
    const [customers] = await connection.query(`SELECT * FROM customers WHERE phone='${phone}'`);
    return customers;
}




