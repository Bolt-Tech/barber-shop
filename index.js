import express from 'express';
import cron from 'node-cron';
import { getAppointment, resetAppointments } from './services/queries.js'
const app = express();
const port = 3000;

cron.schedule('0 18 * * *', async () => {
  console.log("it's time");
  await resetAppointments();
});

app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  const queryResponse = await getAppointment(req, req.body.selectTime);
  console.log(queryResponse)
  // res.send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})