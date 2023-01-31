"use strict";

export class ApiError extends Error {
    status;
    payload;
    errors;

    constructor(status, message, payload, errors = []) {
        super(message);
        this.status = status;
        this.payload = payload;
        this.errors = errors;
    }

    static AddProductBadRequest(message, payload, errors = []) {

        return new ApiError(400, message, payload, errors);
    }
}