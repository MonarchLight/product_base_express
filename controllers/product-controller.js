"use strict";

import { validationResult } from 'express-validator';

import * as productService from "../service/product-service.js";
import { config } from '../config.js';
import { ApiError } from "../exceptions/api-error.js";


export const addProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.AddProductBadRequest(false, 'null', errors.array()));
        }
        const { isActive, image, name, count, weightPerItem, pricePerItem, description } = req.body;
        const productData = await productService.addProduct(isActive, image, name, count, weightPerItem, pricePerItem, description);

        return res.status(201).json({ status: true, error: null, payload: productData });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.AddProductBadRequest(false, 'null', errors.array()));
        }

        const { isActive, image, name, count, weightPerItem, pricePerItem, description } = req.body;
        if (Object.keys(req.body).length === 0) {
            return next(ApiError.AddProductBadRequest(false, 'null', [{ message: 'Request is empty' }]));
        }

        const { id } = req.params;
        const productData = await productService.updateProduct(id, isActive, image, name, count, weightPerItem, pricePerItem, description);

        return res.status(201).json({ status: true, error: 'null', payload: productData });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const productData = await productService.deleteProduct(id);

        return res.status(200).json({ status: true, error: 'null', payload: productData })
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();

        return res.status(200).json({ status: true, error: 'null', payload: products });
    } catch (error) {
        next(error);
    }
};

export const getAllProductsHistory = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsHistory();

        return res.status(200).json({ status: true, error: 'null', payload: products });
    } catch (error) {
        next(error);
    }
};

// https://cloudinary.com/ - для картинок