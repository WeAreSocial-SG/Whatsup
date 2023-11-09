import express from 'express';
import bodyParser from 'body-parser';


export default function startServer(){
  // setup server
  const app = express();
  const port = 3000;
  app.use(bodyParser.json());
  // handle main hook
  app.get('/update', (req:any, res:any) => {
    // get payload though rn the payload does nothing
    // const payload = req.body;

    try{
      // return the current update file
      res.json({});
    } catch(e) {
      console.error(e)
      res.status(500).json({ message: 'i fucked up somehow... aim soweee' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app
}
