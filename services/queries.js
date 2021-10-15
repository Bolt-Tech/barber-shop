import { connection } from './db_access.js';
import { generateHash, checkPassword } from './encryption.js'
import jwt from 'jsonwebtoken';

export const getToken = async(req, res) => {
    try {
        const token = jwt.sign({ name: "Muli" }, 'shhhhh');
        res.send(token);
    } catch (error) {
        console.log(error)
    }
}

//-----------------------------------[Setting: Appointments]-----------------------------------//

//Styles for HTML Table to display customer + time data for admin
const tableStyle = 'margin: 30px auto;border: black solid 2px;border-collapse: collapse;'
const borderCells = 'font-size: calc(1em + 1vmin);border: solid 2px black;padding:20px;'

//This function used to generate table data appointments list and customer names for admin to read.
export const getAllAppointments = async (res) => {
    const takenAppointmentSQL = `SELECT time, concat(first_name,' ', last_name) as fullname FROM appointments a INNER JOIN customers c ON c.id=a.customer_id WHERE time IS NOT NULL`;
    const [rows] = await connection.query(takenAppointmentSQL);
    if (rows[0]) {
        let htmlTable = `<h1 style="margin: 10px auto; text-align: center;font-size: calc(0.75em + 3vmin);text-decoration: underline;">Customers & Appointment Table Data:</h1>
        <table style="${tableStyle}">
        <caption style="margin: 10px;font-size: calc(0.55em + 1vmin)">Currently used appointments list:</caption>
        <thead>
        <tr>
        <th style="background-color: #001f3f;color: whitesmoke;${borderCells}">Full name</th>
        <th style="background-color: #b36522;color: whitesmoke;${borderCells}">Time</th>
        </tr>
        </thead>`;
        rows.forEach(row => {
            htmlTable += `<tr>
            <td style="${borderCells}">${row.fullname}</td> 
            <td style="${borderCells}">${row.time}</td>
            </tr>`;
        });
        htmlTable += `</table>`;
        //console.log(htmlTable); //Prints a long JSON codes
        res.send(htmlTable);
    }
    else {
        console.log("Appointments are empty");
        res.send('<h1>ApAppointments are empty!</h1>')
        return;
    }
}

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

export const setAppointment = async(appointmentData, token) => {
    //const { selectedTime, phone } = appointmentData;
    const { selectedTime } = appointmentData;
    const appointmentAvailable = await getAppointment(selectedTime);
    let userEmail = "";
    if(appointmentAvailable) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            //console.log("(queries)decoded? " + JSON.stringify(decodedToken));

            userEmail = decodedToken.name;
        }
        catch(error) {
            console.log("Token error details: " + error);
            return;
        }

        const customers = await getCustomer(userEmail);
        //console.log("email? " + userEmail);
        //console.log("token? " + token);
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

export const resetAppointments = async() => {
    try {
        console.log('All appointments are now available!');
        await connection.query(`UPDATE appointments SET available=1, customer_id=NULL`);
    } catch (error) {
        console.log(error)
    }
}

//-----------------------------------[Setting: Customers/Admins]-----------------------------------//

//A function to create customer account
export const createCustomer = async(req) => {
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

const getCustomer = async(email) => {
    try {
        const [customers] = await connection.query(`SELECT * FROM customers WHERE email='${email}'`);
        return customers;
    } catch (error){
        console.log(error);
    }
}


//* Login for customers making appointment, while admins read taken appointments with each customer names
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userTypeValue = 'customer';
        let [rows] = await connection.query(`SELECT password FROM admins WHERE email='${email}'`);
        if (rows[0]) {
            userTypeValue = 'admin';
        } else {
            [rows] = await connection.query(`SELECT password FROM customers WHERE email='${email}'`);
        }
        if (rows[0]) {
            const hashedPassword = rows[0].password;
            const verfiedPassword = await checkPassword(password, hashedPassword);
            console.log("Is password verfied?\t" + verfiedPassword); //? Debugging for making sure password is working

            if (verfiedPassword) {
                const { JWT_TOKEN_SECRET } = process.env;
                //console.log("User's password:\t" + JWT_TOKEN_SECRET); //? Debug only to test if password is received
                const token = jwt.sign({ name: email }, JWT_TOKEN_SECRET, { expiresIn: '5h' });
                //console.log("Token Key:\t\t" + token); //? Debug only to test if token is received
                res.status(200).json({ accessToken: token, userType: userTypeValue });
            }
            else {
                res.status(404).send('Email or password are incorrect, please try again.');
            }
        }
        else {
            res.status(404).send('Email or password are incorrect, please try again.');
        }
    } catch (error) {
        console.log(error)
    }
}