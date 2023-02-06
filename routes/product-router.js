'use strict';

import { Router } from "express";
import { check } from 'express-validator';

import * as controller from "../controllers/product-controller.js";

export { router };

const router = new Router();

/** /api/product Add product
 * @api {post} /api/product Add product
 * @apiVersion 1.0.0
 * @apiName PostProduct
 * @apiGroup Product
 * @apiDescription Add product
 *
 * @apiBody {Boolean} [isActive] Switches. (default: false)
 * @apiBody {String} [image] Photo URL. (default: "")
 * @apiBody {String} name Product name (unique, require)
 * @apiBody {Number} count Аmount (require)
 * @apiBody {Number} weightPerItem Unit weight (require)
 * @apiBody {Number} pricePerItem Unit price (require)
 * @apiBody {String} [description] Description. (default: "")
 *
 * @apiSuccess {json} Object Object with status, errors[{}], payload
 * @apiSuccessExample {json} Success-Response:
    HTTP/1.1 201 OK
 {
    "status": true,
    "error": null,
    "payload": {
        "isActive": true,
        "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
        "name": "Lamp",
        "count": 1,
        "weightPerItem": 0.435,
        "pricePerItem": 236,
        "description": "Give your interior an oriental touch with our Rob. This hanging lamp is made of wood with linen and steel, all finished in a black color. It has a diameter of 46 cm and a height of 149 cm. The mounting plate has a diameter of 12 cm and a height of 2.5 cm. The required E27 light source is not yet included, do not forget to order it separately. Make it extra cozy at home with an external dimmer. Get a stylish hanging lamp with our Rob hanging lamp.",
        "history": [
            {
                "date": "2023-02-01T14:04:31.374Z",
                "productHistory": "63da716f47f117be22d43034",
                "_id": "63da716f47f117be22d43037"
            }
        ],
        "_id": "63da716f47f117be22d43036",
        "__v": 0
    }
 }

 * @apiError {json} Object Object with status, errors[{}], payload
 * @apiErrorExample {json} Error-Response:
    HTTP/1.1 400 Bad Request
 {
    "status": false,
    "payload": null,
    "error": [
        {
            "msg": "`Name` can not be empty.",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "`Name` can not be empty.",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "`Count` must be integer.",
            "param": "count",
            "location": "body"
        },
        {
            "msg": "`Weight` must be no more than 3 characters after the dot.",
            "param": "weightPerItem",
            "location": "body"
        },
        {
            "msg": "`Price` must be no more than 2 characters after the dot.",
            "param": "pricePerItem",
            "location": "body"
        }
    ]
 }
 */

router.post('/product', [
    check('isActive', '`Active` must be true or false.').optional().isBoolean(),
    check('image', '`Image` must be string.').optional().isString(),
    check('name', '`Name` can not be empty.').isString().notEmpty(),
    check('count', '`Count` must be integer.').isInt({ gt: -1 }),
    check('weightPerItem', '`Weight` must be no more than 3 characters after the dot.').matches(/^\d+(?:\.\d{1,3})?$/),
    check('pricePerItem', '`Price` must be no more than 2 characters after the dot.').matches(/^\d+(?:\.\d{1,2})?$/),
    check('description', '`Description` must be string.').optional().isString(),
], controller.addProduct)

    /** /api/product/:id Update product
    * @api {put} /api/product/:id Update product
    * @apiVersion 1.0.0
    * @apiName PutProduct
    * @apiGroup Product
    * @apiDescription Update product
    *
    * @apiParam {String} [id] The product ID to update
    * @apiBody {Boolean} [isActive] Switches. (default: false)
    * @apiBody {String} [image] Photo URL. (default: "")
    * @apiBody {String} [name] Product name. (unique)
    * @apiBody {Number} [count] Аmount.
    * @apiBody {Number} [weightPerItem] Unit weight.
    * @apiBody {Number} [pricePerItem] Unit price.
    * @apiBody {String} [description] Description. (default: "")
    *
    * @apiSuccess {json} Object Object with status, errors[{}], payload
    * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 201 OK
     {
        "status": true,
        "error": null,
        "payload": {
            "_id": "63da716f47f117be22d43036",
            "isActive": false,
            "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
            "name": "Lamps",
            "count": 1,
            "weightPerItem": 0.435,
            "pricePerItem": 550.8,
            "description": "Give your interior an oriental touch with our Rob. This hanging lamp is made of wood with linen and steel, all finished in a black color. It has a diameter of 46 cm and a height of 149 cm. The mounting plate has a diameter of 12 cm and a height of 2.5 cm. The required E27 light source is not yet included, do not forget to order it separately. Make it extra cozy at home with an external dimmer. Get a stylish hanging lamp with our Rob hanging lamp.",
            "history": [
                {
                    "date": "2023-02-01T14:04:31.374Z",
                    "productHistory": "63da716f47f117be22d43034",
                    "_id": "63da716f47f117be22d43037"
                },
                {
                    "date": "2023-02-01T14:21:44.609Z",
                    "productHistory": "63da757897838e1357042c36",
                    "_id": "63da757897838e1357042c3a"
                }
            ],
            "__v": 0
        }
     }
    * @apiError {json} Object Object with status, errors[{}], payload
    * @apiErrorExample {json} Error-Response:
       HTTP/1.1 400 Bad Request
     {
        "status": false,
        "payload": null,
        "error": {
            "message": "Request is empty"
        }
     }
    */

    .put('/product/:id', [
        check('isActive', '`Active` must be true or false.').optional().isBoolean(),
        check('image', '`Image` must be string.').optional().isString(),
        check('name', '`Name` can not be empty.').optional().isString().notEmpty(),
        check('count', '`Count` must be integer.').optional().isInt({ gt: -1 }),
        check('weightPerItem', '`Weight` must be no more than 3 characters after the dot.').optional().matches(/^\d+(?:\.\d{1,3})?$/),
        check('pricePerItem', '`Price` must be no more than 2 characters after the dot.').optional().matches(/^\d+(?:\.\d{1,2})?$/),
        check('description', '`Description` must be string.').optional().isString(),
    ], controller.updateProduct)

    /** /api/product/history Get all product history
    * @api {get} /api/product/history?limit=0&offset=0 Get all product history
    * @apiVersion 1.0.0
    * @apiName GetProductHistory
    * @apiGroup Product
    * @apiDescription Get all product history
    *
    * @apiParam {Integer} [limit] Limit the number of results returned. (0 - all items)
    * @apiParam {Integer} [offset] Offset specifies skipping the specified number of lines before starting to output lines.
    * 
    * @apiSuccess {json} Object Object with status, errors[{}], payload
    * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 201 OK
    {
        "status": true,
        "error": null,
        "payload": [
            {
                "_id": "63da716f47f117be22d43034",
                "date": "2023-02-01T14:04:31.374Z",
                "type": "Add product",
                "change": "Product Lamp",
                "__v": 0
            },
            {
                "_id": "63da757897838e1357042c36",
                "date": "2023-02-01T14:21:44.609Z",
                "type": "Edit info",
                "change": "Product Lamp:changed 'active' from true to false, changed 'name' from Lamp to Lamps, changed 'pricePerItem' from 236 to 550.8",
                "__v": 0
            }
        ]
    }
    * @apiError {json} Object Object with status, errors[{}], payload
    * @apiErrorExample {json} Error-Response:
       HTTP/1.1 400 Bad Request
     {
        "status": false,
        "errors": {
            "message": "No payload."
        },
        "payload": null
     }
    */

    .get('/product/history', controller.getAllProductsHistory)

    /** /api/product Get all product
    * @api {get} /api/product?limit=0&offset=0 Get all product
    * @apiVersion 1.0.0
    * @apiName GetProduct
    * @apiGroup Product
    * @apiDescription Get all product
    * 
    * @apiParam {Integer} [limit] Limit the number of results returned. (0 - all items)
    * @apiParam {Integer} [offset] Offset specifies skipping the specified number of lines before starting to output lines.
    *
    * @apiSuccess {json} Object Object with status, errors[{}], payload
    * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 201 OK
    {
        "status": true,
        "error": null,
        "payload": [
            {
                "_id": "63da7dc76e380fff8c1c95e5",
                "isActive": false,
                "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
                "name": "Lamp",
                "count": 1,
                "weightPerItem": 0.435,
                "pricePerItem": 550.8,
                "description": "Give your interior an oriental touch with our Rob. This hanging lamp is made of wood with linen and steel, all finished in a black color. It has a diameter of 46 cm and a height of 149 cm. The mounting plate has a diameter of 12 cm and a height of 2.5 cm. The required E27 light source is not yet included, do not forget to order it separately. Make it extra cozy at home with an external dimmer. Get a stylish hanging lamp with our Rob hanging lamp.",
                "history": [
                    {
                        "date": "2023-02-01T14:57:11.529Z",
                        "productHistory": "63da7dc76e380fff8c1c95e3",
                        "_id": "63da7dc76e380fff8c1c95e6"
                    }
                ],
                "__v": 0
            },
            {
                "_id": "63da7e4e6e380fff8c1c95ed",
                "isActive": false,
                "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
                "name": "Buff",
                "count": 1,
                "weightPerItem": 0.055,
                "pricePerItem": 769,
                "description": "Original Multifunctional Tubular: Multifunctional product designed for all-year-round use. Ideal protection against the cold during high-intensity outdoor activities such as trail running, trekking, bouldering, hiking, horse riding, cycling or riding a motorbike. Fit for most necks. Imagine you would start it all over again. That’s what we just did. Our legendary tubular enters a new era to become more comfortable and natural than ever. Protecting as always your skin from long exposure to the sun, its new optimal capacity for transferring moisture vapor away from the body will keep you dry and comfortable.",
                "history": [
                    {
                        "date": "2023-02-01T14:59:26.560Z",
                        "productHistory": "63da7e4e6e380fff8c1c95eb",
                        "_id": "63da7e4e6e380fff8c1c95ee"
                    }
                ],
                "__v": 0
            }
        ]
    }
    * @apiError {json} Object Object with status, errors[{}], payload
    * @apiErrorExample {json} Error-Response:
       HTTP/1.1 400 Bad Request
     {
        "status": false,
        "errors": {
            "message": "No payload."
        },
        "payload": null
     }
    */

    .get('/product', controller.getAllProducts)

    /** /api/product/:id Get product
    * @api {get} /api/product/:id Get product
    * @apiVersion 1.0.0
    * @apiName GetProduct
    * @apiGroup Product
    * @apiDescription Get product
    *
    * @apiParam {String} id The product ID to get
    * @apiSuccess {json} Object Object with status, errors[{}], payload
    * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 201 OK
    {
        "status": true,
        "error": null,
        "payload": [
            {
                "_id": "63da716f47f117be22d43036",
                "isActive": false,
                "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
                "name": "Lamps",
                "count": 1,
                "weightPerItem": 0.435,
                "pricePerItem": 550.8,
                "description": "Give your interior an oriental touch with our Rob. This hanging lamp is made of wood with linen and steel, all finished in a black color. It has a diameter of 46 cm and a height of 149 cm. The mounting plate has a diameter of 12 cm and a height of 2.5 cm. The required E27 light source is not yet included, do not forget to order it separately. Make it extra cozy at home with an external dimmer. Get a stylish hanging lamp with our Rob hanging lamp.",
                "history": [
                    {
                        "date": "2023-02-01T14:04:31.374Z",
                        "productHistory": "63da716f47f117be22d43034",
                        "_id": "63da716f47f117be22d43037"
                    },
                    {
                        "date": "2023-02-01T14:21:44.609Z",
                        "productHistory": "63da757897838e1357042c36",
                        "_id": "63da757897838e1357042c3a"
                    }
                ],
                "__v": 1
            }
        ]
    }
    * @apiError {json} Object Object with status, errors[{}], payload
    * @apiErrorExample {json} Error-Response:
       HTTP/1.1 400 Bad Request
     {
        "status": false,
        "errors": {
            "message": "No payload."
        },
        "payload": null
     }
    */

    .get('/product/:id', controller.getProduct)

    /** /api/product/:id Delete product
    * @api {delete} /api/product/:id Delete product
    * @apiVersion 1.0.0
    * @apiName DeleteProduct
    * @apiGroup Product
    * @apiDescription Delete product
    *
    * @apiParam {String} id The product ID to delete
    * @apiSuccess {json} Object Object with status, errors[{}], payload
    * @apiSuccessExample {json} Success-Response:
       HTTP/1.1 201 OK
    {
        "status": true,
        "error": null,
        "payload": {
            "_id": "63da716f47f117be22d43036",
            "isActive": false,
            "image": "http://res.cloudinary.com/dcltbvpvw/image/upload/v1675244318/photo-1643581278970-413ac3900826.jpg",
            "name": "Lamps",
            "count": 1,
            "weightPerItem": 0.435,
            "pricePerItem": 550.8,
            "description": "Give your interior an oriental touch with our Rob. This hanging lamp is made of wood with linen and steel, all finished in a black color. It has a diameter of 46 cm and a height of 149 cm. The mounting plate has a diameter of 12 cm and a height of 2.5 cm. The required E27 light source is not yet included, do not forget to order it separately. Make it extra cozy at home with an external dimmer. Get a stylish hanging lamp with our Rob hanging lamp.",
            "history": [
                {
                    "date": "2023-02-01T14:04:31.374Z",
                    "productHistory": "63da716f47f117be22d43034",
                    "_id": "63da716f47f117be22d43037"
                },
                {
                    "date": "2023-02-01T14:21:44.609Z",
                    "productHistory": "63da757897838e1357042c36",
                    "_id": "63da757897838e1357042c3a"
                }
            ],
            "__v": 1
        }
    }
    * @apiError {json} Object Object with status, errors[{}], payload
    * @apiErrorExample {json} Error-Response:
       HTTP/1.1 400 Bad Request
     {
        "status": false,
        "errors": {
            "message": "Product 'Id' not valid."
        },
        "payload": null
     }
    */

    .delete('/product/:id', controller.deleteProduct);