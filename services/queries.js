import { connection } from './db_access.js';
import { generateHash, checkPassword } from './encryption.js'

export const getAppointment = async (req, hour) => {

    await createCustomer(req);
    
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

export const createCustomer = async(req) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await generateHash(password);
    console.log(req.body)
    const customers = await getCustomer(req);
    if (!customers[0]) {
        await connection.query(`INSERT INTO customers (first_name, last_name, email, phone, password) VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', '${hashedPassword}')`);
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

export const resetAppointments = async() => {
    await connection.query(`UPDATE appointments SET available=1`);
    console.log('All appointments are now available!');
}

export const login = async(req) => {
    const { email, password } = req.body;
    const [rows] = await connection.query(`SELECT password FROM customers WHERE email='${email}'`);
    const hashedPassword = rows[0].password;
    const verfiedPassword = await checkPassword(password, hashedPassword);
    console.log(verfiedPassword)
}