"use strict";

import { ApiError } from "../exceptions/api-error.js";

export const errorMiddlewares = (error, req, res, next) => {
    console.log(error);
    if (error instanceof ApiError) {

        return res.status(error.status).json({ message: error.message, payload: error.payload, errors: error.errors });
    }

    return res.status(500).json({ error, message: 'Internal server error.' });
};