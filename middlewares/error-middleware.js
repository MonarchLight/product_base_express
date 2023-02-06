"use strict";

export const errorMiddlewares = (error, req, res, next) => {

    if (error instanceof Error) {

        return res.status(400).json({ status: false, errors: { message: error.message }, payload: null });
    }

    return res.status(500).json({ error, message: 'Internal server error.' });
};