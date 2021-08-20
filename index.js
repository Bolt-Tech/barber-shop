import express from 'express';
import { getAppointment } from './services/queries.js'
const app = express();
const port = 3000;


app.get('/', async (req, res) => {
  const queryResponse = await getAppointment('09:00');
  res.send(queryResponse)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})