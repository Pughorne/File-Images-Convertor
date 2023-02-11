import {imagesQueue} from '@/image-converter/queue';
import {ImageStatus} from '@/image-converter/types';
import {imageUploadMiddleware} from '@/upload';
import express from 'express';
import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({})

const imageConverterRouter = express.Router();

imageConverterRouter.post('/upload', [
  validator.body(Joi.object({quality: Joi.number().required(), targetFormat: Joi.string().required(), lossless: Joi.boolean()})),
  imageUploadMiddleware
], (req, res) => {
  const imageId = imagesQueue.add({
    filepath: req.file!.path,
    options: {
      quality: +req.body.quality,
      targetFormat: req.body.targetFormat
    }
  })
  res.json({imageId});
})

imageConverterRouter.get('/imageStatus/:id', (req, res) => {
  const status = imagesQueue.get(req.params.id).status;
  res.json({status});
})

imageConverterRouter.get('/download/:id', (req, res) => {
    const image = imagesQueue.get(req.params.id);

    if (image.status === ImageStatus.CONVERTED) {
      return res.download(image.filepath!);
    }

    return res.status(404).end();
});


export {imageConverterRouter};
