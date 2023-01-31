"use strict";

import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    "PORT": process.env.PORT,
    "MONGODB": process.env.MONGODB,

    "CLOUD_NAME": process.env.CLOUD_NAME,
    "CLOUD_API_KEY": process.env.CLOUD_API_KEY,
    "CLOUD_API_SECRET": process.env.CLOUD_API_SECRET,
}