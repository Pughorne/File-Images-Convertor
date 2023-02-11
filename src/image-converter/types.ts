export interface InputImage {
  filepath: string;
  outputFilepath?: string;
  options: {
    targetFormat: string;
    quality?: number;
  };
}

export enum ImageStatus {
  CONVERTED = 'CONVERTED',
  UNCONVERTED = 'UNCONVERTED',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export interface OutputImage {
  status: ImageStatus;
  filepath?: string;
}
