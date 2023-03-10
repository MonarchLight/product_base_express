"use strict";

import { v2 as cloudinary } from 'cloudinary';

import { config } from '../config.js';

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET,
    secure: true
});

const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        timeout: 60 * 1000,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options, (err) => { console.log(err); });
        //console.log(result);
        return result.url;
    } catch (error) {
        console.error(error);
    }
};

// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//         colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         // console.log(result);
//         return result.colors;
//     } catch (error) {
//         console.error(error);
//     }
// };

// const createImageTag = (publicId) => {

//     // // Set the effect color and background color
//     // const [effectColor, backgroundColor] = colors;

//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//         transformation: [
//             { height: 150, width: 150, crop: "thumb" },
//         ],
//     });

//     return imageTag;
// };

export const reqImage = async (image) => {

    // Upload the image
    const result = await uploadImage(image);

    // Get the colors in the image
    // const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    //const result = await createImageTag(publicId); //, colors[0][0], colors[1][0]

    return result;
};
