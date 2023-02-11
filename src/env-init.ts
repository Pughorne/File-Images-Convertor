import dotenv from 'dotenv';
import {existsSync, mkdirSync} from 'node:fs';
import Joi, {string} from 'joi';
import {join} from 'node:path';

dotenv.config({path: join(__dirname, '../.env')});

const envValidationSchema = Joi.object({
  UPLOADED_IMAGES_DIR: Joi.string().required(),
  CONVERTED_IMAGES_DIR: Joi.string().required(),
  PORT: Joi.string().required(),
}).unknown(true);

const envInit = () => {
  const errorMessage = envValidationSchema.validate(process.env)?.error
    ?.message;

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const uploadedFilesDir = process.env.UPLOADED_IMAGES_DIR!;
  if (!existsSync(uploadedFilesDir)) {
    mkdirSync(uploadedFilesDir);
  }

  const convertedFilesDir = process.env.CONVERTED_IMAGES_DIR!;
  if (!existsSync(convertedFilesDir)) {
    mkdirSync(convertedFilesDir);
  }
};

export const {UPLOADED_IMAGES_DIR, CONVERTED_IMAGES_DIR, PORT} = process.env;

export {envInit};
