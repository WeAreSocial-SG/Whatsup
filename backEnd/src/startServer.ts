import express, { Request, Response } from 'express';
import * as fs from 'fs';
import cors from 'cors';
import createUpdate from './createUpdate';

export default function startServer(){
    const app = express();
    const PORT = 4000; 
    // add cors server
    app.use(cors({
        origin: "*", 
    }));
    // Define an endpoint to read current update
    app.get('/currentUpdate', (req: Request, res: Response) => {
        try {
            // Read the JSON file synchronously
            const data = fs.readFileSync('data/currentData.json', 'utf8');
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Return the JSON data as a response
        } catch (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read file' }); // Send an error response if file reading fails
        }
    });
    // start update manually
    app.get('/manualUpdate', (req:Request, res:Response)=>{
        try{
            createUpdate()
            res.status(500).send('ok updating now'); // Send an error response if file reading fails
        }
        catch(err){
            console.error(err);
            res.status(500).json({ error: 'Failed to read file' }); // Send an error response if file reading fails
        }
    })
    // todo create endpoint to read previous updates
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // retun
    return app;
}