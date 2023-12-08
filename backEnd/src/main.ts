console.clear()
import createUpdate from "./createUpdate";
import cron from 'node-cron';
import startServer from "./startServer";


// setup cron job
const forceToCreateNewUpdate = true
const scheduledTask = cron.schedule(
  '0 0 * * 0',
  async() => {createUpdate()}, 
 {timezone: 'Asia/Singapore'}
);
if(forceToCreateNewUpdate){createUpdate()}


// start express server
const server = startServer();