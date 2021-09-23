import express from 'express';
import cron from 'node-cron';
import { getAppointment, resetAppointments, createCustomer, login, setAppointment } from './services/queries.js'
import { authenticateToken } from './services/middleware.js';
import jwt from 'jsonwebtoken';
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

app.post('/login', async (req, res) => {
  await login(req, res);
})

app.post('/set-appointment', authenticateToken, async (req, res) => {
  console.log(req.body);
  res.send(req.authenticateMessage)
  await setAppointment(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})