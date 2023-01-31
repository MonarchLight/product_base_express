"use strict";

export const errorMiddlewares = (error, req, res, next) => {
    //console.log(error);
    if (error instanceof Error) {

        return res.status(404).json({ status: false, errors: { message: error.message }, payload: null });
    }

    return res.status(500).json({ error, message: 'Internal server error.' });
};