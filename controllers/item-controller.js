"use strict";

import { validationResult } from 'express-validator';

import * as userService from "../service/item-service.js";
import { config } from '../config.js';
import { ApiError } from "../exceptions/api-error.js";


export const addItem = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error.', errors.array()));
        }
        const { isActive, image, name, count, weightPerItem, pricePerItem, description } = req.body;
        await userService.addItem(isActive, image, name, count, weightPerItem, pricePerItem, description);

        return res.status(201).json({ message: 'Added item successfully.' });
    } catch (error) {
        next(error);
    }
};

// https://cloudinary.com/ - для картинок