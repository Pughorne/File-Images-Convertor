import {InputImage, ImageStatus} from '@/image-converter/types';
import path from 'node:path';
import sharp from 'sharp';

const imageConverter = async (
  image: InputImage
): Promise<ImageStatus.CONVERTED | ImageStatus.ERROR> => {
  let status;

  try {
    await sharp(image.filepath)
      [image.options.targetFormat](image.options)
      .toFile(image.outputFilepath);
    status = ImageStatus.CONVERTED;
    console.log(
      `Image ${path.basename(image.filepath)} converted to ${path.basename(
        image.outputFilepath!
      )} with options: ${JSON.stringify(image.options)}`
    );
  } catch {
    status = ImageStatus.ERROR;
    console.log(`Cannot convert file ${path.basename(image.outputFilepath!)}`);
  }

  return status;
};

export {imageConverter};
