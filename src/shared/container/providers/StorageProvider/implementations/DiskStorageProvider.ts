import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      // Pega o arquivo dentro da pasta tmp
      path.resolve(uploadConfig.tmpFolder, file),
      // Move o arquivo para a pasta uploads
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      // Tenta encontrar o arquivo
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Se o arquivo foi encotrado, deleta ele
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
