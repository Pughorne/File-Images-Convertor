import {envInit, PORT} from '@/env-init';
import {imageConverterRouter} from '@/image-converter';
import express from 'express';

envInit();

const app = express();
app.use('/', imageConverterRouter);

app.listen(PORT, () => {
  console.log(`Server listen port: ${PORT}`);
});
