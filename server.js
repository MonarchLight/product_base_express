"use strict";

import express from "express";
import mongoose from 'mongoose';
import helmet from "helmet";
import cors from "cors";

import { config } from './config.js';
import { logger } from './logger/logger.js';
import { router } from './routes/product-router.js';
import { errorMiddlewares } from './middlewares/error-middleware.js';


mongoose.set('strictQuery', false);

const PORT = config.PORT || 3000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/api', router);

app.use(errorMiddlewares);


const start = async () => {
    try {
        await mongoose.connect(config.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
    } catch (error) {
        logger.error(error);
    }
};

start();