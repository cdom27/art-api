import { Storage } from '@google-cloud/storage';
import {
  GCS_BUCKET_NAME,
  GCP_LOCAL_APP_CREDENTIALS,
} from '../../../config/env';

const storage = new Storage(
  GCP_LOCAL_APP_CREDENTIALS
    ? {
        keyFilename: GCP_LOCAL_APP_CREDENTIALS,
      }
    : undefined
);

const bucketName = GCS_BUCKET_NAME!;

export const generateSignedUrl = async (
  objectPath: string
): Promise<string> => {
  try {
    const [url] = await storage
      .bucket(bucketName)
      .file(objectPath)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 10 * 60 * 1000,
      });

    return url;
  } catch (error) {
    console.error(`Signed URL Error - Failed for ${objectPath}:`, error);
    throw new Error(`Failed to generate signed URL for ${objectPath}`);
  }
};
