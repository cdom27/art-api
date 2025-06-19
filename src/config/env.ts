import dotenv from 'dotenv';

dotenv.config();

// for CI/CD environments, we use TEST_DB_URL for NODE_ENV=test
// for local development, we use DB_URL
const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL || process.env.DB_URL
    : process.env.DB_URL;

if (!dbUrl) {
  throw new Error(
    'Database env vars are not fully defined (missing DB_URL or TEST_DB_URL)'
  );
}

// GCS config
const bucketName = process.env.GCS_BUCKET_NAME;
const credentialsPath = process.env.GCP_LOCAL_APP_CREDENTIALS;
const customCdnDomain = process.env.GCP_CUSTOM_CDN_DOMAIN;

// validate dev credentials only in local env
const isLocal = !process.env.CI && process.env.NODE_ENV !== 'production';

if (isLocal && !credentialsPath) {
  throw new Error('GCP_LOCAL_APP_CREDENTIALS must be defined for local dev');
}

export const DB_URL = dbUrl;
export const PORT = process.env.PORT;

export const GCS_BUCKET_NAME = bucketName;
export const GCP_LOCAL_APP_CREDENTIALS = credentialsPath;
export const GCP_CUSTOM_CDN_DOMAIN = customCdnDomain;
