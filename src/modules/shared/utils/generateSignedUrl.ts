import { Storage } from '@google-cloud/storage';
import {
  GCS_BUCKET_NAME,
  GCP_LOCAL_APP_CREDENTIALS,
  GCP_CUSTOM_CDN_DOMAIN,
} from '../../../config/env';

const getStorage = () => {
  return new Storage(
    GCP_LOCAL_APP_CREDENTIALS
      ? { keyFilename: GCP_LOCAL_APP_CREDENTIALS }
      : undefined,
  );
};

export const generateSignedUrl = async (
  objectPath: string,
): Promise<string> => {
  try {
    const bucketName = GCS_BUCKET_NAME!;
    const storage = getStorage();

    const [url] = await storage
      .bucket(bucketName)
      .file(objectPath)
      .getSignedUrl({
        action: 'read',
        expires: Date.now() + 10 * 60 * 1000,
      });

    return url;
  } catch (error) {
    console.error(`Signed URL generation failed for ${objectPath}`);
    console.error('[Bucket]:', GCS_BUCKET_NAME);
    console.error('[Credentials path]:', GCP_LOCAL_APP_CREDENTIALS);
    console.error('[Environment]:', {
      NODE_ENV: process.env.NODE_ENV,
      CI: process.env.CI,
      GOOGLE_APPLICATION_CREDENTIALS:
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
    console.error('[Original Error]:', error);
    throw new Error(`Failed to generate signed URL for ${objectPath}`);
  }
};
