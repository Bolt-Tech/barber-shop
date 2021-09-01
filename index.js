import express from 'express';
import cron from 'node-cron';
import { getAppointment, resetAppointments, createCustomer, login } from './services/queries.js'
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors())

cron.schedule('0 18 * * *', async () => {
  console.log("it's time");
  await resetAppointments();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.post('/', async (req, res) => {
  const queryResponse = await getAppointment(req, req.body.selectTime);
  console.log(queryResponse)
  // res.send()
})

app.post('/signUp', async (req, res) => {
  console.log(req.body);
  createCustomer(req);
  // res.send()
})

app.post('/login', async (req, res) => {
  console.log(req.body);
  login(req);
  // res.send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})