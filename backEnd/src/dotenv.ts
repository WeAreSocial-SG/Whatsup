import * as dotenv from 'dotenv';
dotenv.config();

export const keys = {
    openAi: process.env.OPEN_AI,
    googleCloud: process.env.GOOGLE_CLOUD
}