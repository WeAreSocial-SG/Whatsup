console.clear()
import createUpdate from "./createUpdate.js";
import cron from 'node-cron';
import startServer from "./startServer.js";


// setup cron job
const forceToCreateNewUpdate = false
const scheduledTask = cron.schedule(
  '0 0 * * 0',
  async() => {createUpdate()}, 
 {timezone: 'Asia/Singapore'}
);
if(forceToCreateNewUpdate){createUpdate()}


// start express server
const server = startServer();