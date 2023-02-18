import {CONVERTED_IMAGES_DIR} from '@/env-init';
import {imageConverter} from '@/image-converter/converter';
import {InputImage, ImageStatus, OutputImage} from '@/image-converter/types';
import {nanoid} from 'nanoid';
import path from 'node:path';

const newImagePath = (imageInputPath, imageOutputDir, extension) => {
  const basename = path.basename(imageInputPath, path.extname(imageInputPath));
  return path.join(process.cwd(), `${basename}.${extension}`);
};

const createImagesQueue = (outputDir: string) => {
  const convertedImages = new Map<string, OutputImage>();
  const unconvertedImages = new Map<string, InputImage>();

  const runConverter = () => {
    setTimeout(async () => {
      const imagesIDs = Array.from(unconvertedImages.keys()).slice(0, 3);
      for (const imageID of imagesIDs) {
        const image = unconvertedImages.get(imageID)!;
        const imageStatus = await imageConverter(image);
        convertedImages.set(imageID, {
          status: imageStatus,
          filepath: image.outputFilepath!,
        });
        unconvertedImages.delete(imageID);
      }
      runConverter();
    }, 500);
  };

  runConverter();

  return {
    add: (image: InputImage) => {
      const imageID = nanoid();
      image.outputFilepath = newImagePath(
        image.filepath,
        outputDir,
        image.options.targetFormat
      );
      unconvertedImages.set(imageID, image);
      return imageID;
    },
    get: (imageID: string): OutputImage => {
      const outputImage =
        convertedImages.get(imageID) ||
        ({status: ImageStatus.NOT_FOUND} as OutputImage);

      if (unconvertedImages.has(imageID)) {
        outputImage.status = ImageStatus.UNCONVERTED;
      }

      return outputImage;
    },
  };
};

const imagesQueue = createImagesQueue(CONVERTED_IMAGES_DIR!);

export {newImagePath, imagesQueue};
