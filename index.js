import express from 'express';
import cron from 'node-cron';
import { resetAppointments, createCustomer, login, setAppointment, getToken, getAllAppointments } from './services/queries.js'
import { authenticateToken } from './services/middleware.js';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors())

cron.schedule('36 10 * * *', async () => {
  console.log("it's time");
  await resetAppointments();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.get('/', async (req, res) => {
  console.log(req.name);
  res.send('Invalid route');
})

app.post('/signUp', async (req, res) => {
  console.log(req.body);
  createCustomer(req);
  // res.send()
})
//TODO: Reorganize HTML table queries data API (Part B + C)
//Part 2, B - Admin login
app.get('/admin-login', async (req, res) => {
  await getAllAppointments(res);
  
  //const { customerName, appointmentTime} = req.body;
//console.log(res);
//console.log(req.body);
})

app.post('/login', async (req, res) => {
  await login(req, res);
})

app.post('/set-appointment', authenticateToken, async (req, res) => {
  let token = req.headers["x-api-token"];
  //let token2 = req.headers.x-api-token[7];//unsure
  //console.log("Header request: " + JSON.stringify(req.headers.x-api-token)); //? Debug
  console.log("Header request token: " + JSON.stringify(token)); //? Debug
  //console.log("Header request token2: " + JSON.stringify(token2)); //? Debug
  console.log(JSON.stringify(req.body));
  res.send(req.authenticateMessage);
  await setAppointment(req.body, token);
})

app.get('/get-token', async (req, res) => { //? Temporary quick check token
  await getToken(req,res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})