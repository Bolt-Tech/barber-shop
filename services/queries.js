import { connection } from './db_access.js';

export const getAppointment = async (hour) => {
    const [rows] = await connection.query(`SELECT * FROM appointments WHERE time='${hour}'`);
    if (rows[0]?.available) {
        return `See you at ${hour}!`
    }
    else {
        return "Barber is not available";
    }
}




