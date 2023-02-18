import dotenv from 'dotenv';
import {existsSync, mkdirSync} from 'node:fs';
import Joi, {string} from 'joi';
import {z} from 'zod';
import {join} from 'node:path';

dotenv.config({path: join(__dirname, '../.env')});
const envValidationSchema = z
  .object({
    UPLOADED_IMAGES_DIR: z.string(),
    CONVERTED_IMAGES_DIR: z.string(),
    PORT: z.string(),
  })
  .optional();

const envInit = () => {
  const errorMessage = envValidationSchema.safeParse(process.env);

  /* Throwing an error if the environment variables are not set. */
  if (!errorMessage.success) {
    throw new Error(`${errorMessage.error}`);
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
