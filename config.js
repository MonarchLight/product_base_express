"use strict";

import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    "PORT": process.env.PORT,
    "MONGODB": process.env.MONGODB,
}