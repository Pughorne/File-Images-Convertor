import {newImagePath} from '@/image-converter/queue';
import path from 'node:path';

describe('Converter', () => {
  it('Absolute paths', () => {
    const filePath = '/dir_one/dir_two/image.png';
    const outputFileDir = '/dir_three/dir_four';
    const newFileName = newImagePath(filePath, outputFileDir, 'webp');
    expect(newFileName).toBe('/dir_three/dir_four/image.webp');
  });

  it('Relative paths', () => {
    const filePath = './dir_one/dir_two/image.jpeg';
    const outputFileDir = './dir_three/dir_four';
    const newFileName = newImagePath(filePath, outputFileDir, 'png');
    expect(newFileName).toBe(path.resolve('./dir_three/dir_four/image.png'));
  });

  it('Relative and absolute paths', () => {
    const filePath = './dir_one/dir_two/image.jpeg';
    const outputFileDir = '/dir_three/dir_four';
    const newFileName = newImagePath(filePath, outputFileDir, 'png');
    expect(newFileName).toBe('/dir_three/dir_four/image.png');
  });
});
