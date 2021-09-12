import e from 'express';
import { connection } from './db_access.js';
import { generateHash, checkPassword } from './encryption.js'

export const getAppointment = async (hour) => {
    const [rows] = await connection.query(`SELECT * FROM appointments WHERE time='${hour}'`);
    if (parseInt(hour) < 9 || parseInt(hour) > 18) {
        console.log("Barber shop is closed. Please return between 09:00-18:00");
        return false;
    }
    else if (rows[0]?.available) {
        return true;
    }
    else {
        console.log("Barber is not available");
        return false;
    }
}

export const setAppointment = async (appointmentData) => {
    const { selectedTime, phone } = appointmentData;
    const appointmentAvailable = await getAppointment(selectedTime);
    if (appointmentAvailable) {
        const customers = await getCustomer(phone);
        if (customers[0]) {
            const { id: customerId } = customers[0]
            await connection.query(`UPDATE appointments SET available = 0, customer_id = '${parseInt(customerId)}' WHERE time='${selectedTime}'`);
            console.log(`See you at ${selectedTime}!`);
        }
        else {
            console.log("User does not exist!");
        }
    }
}

export const createCustomer = async (req) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await generateHash(password);
    const customers = await getCustomer(req);
    if (!customers[0]) {
        try {
            await connection.query(`INSERT INTO customers (first_name, last_name, email, phone, password) VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', '${hashedPassword}')`);
            console.log("Customer added successfully");
        } catch (error) {
            console.log(error)
        }
    }
    else {
        return console.log("Customer already in Database");
    }
}

const getCustomer = async (phone) => {
    try {
        const [customers] = await connection.query(`SELECT * FROM customers WHERE phone='${phone}'`);
        return customers;
    } catch (error) {
        console.log(error);
    }
}

export const resetAppointments = async () => {
    try {
        console.log('All appointments are now available!');
        await connection.query(`UPDATE appointments SET available=1, customer_id=NULL`);
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await connection.query(`SELECT password FROM customers WHERE email='${email}'`);
    if (rows[0]) {
        const hashedPassword = rows[0].password;
        const verfiedPassword = await checkPassword(password, hashedPassword);
        console.log(verfiedPassword)
        res.status(200).send('User logged in successfully!')
    }
    else {
        res.status(404).send('User does not exist!');
    }
}