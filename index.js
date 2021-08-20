import express from 'express';
import { getAppointment } from './services/queries.js'
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  const queryResponse = await getAppointment(req, req.body.selectTime);
  // console.log(req.body);
  console.log(queryResponse)
  // res.send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})