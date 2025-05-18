import { Request, Response } from 'express';
import { storeSecret } from './service';
import { generateAndHashKey, normalizeDomain } from './utils';
import { failure, success } from '../../utils/buildResponse';

export const registerDomainHandler = async (
  req: Request<{}, {}, { domain: string }>,
  res: Response
) => {
  // parse body and normalize domain
  const { domain } = req.body;

  console.log('DOMAIN:', domain);

  console.log('REQ BODY:', req.body);

  if (!domain) {
    return failure(res, 'Website missing from request body', 400);
  }

  const normalizedDomain = normalizeDomain(domain);

  if (!normalizedDomain) {
    return failure(res, 'Domain was not normalize', 400);
  }

  // generate public key and secret hash
  const keyPair = await generateAndHashKey();

  try {
    // store secret with domain
    const data = await storeSecret(normalizedDomain, keyPair.secret);

    if (!data) {
      return failure(res, 'An error occured while storing secret.', 400);
    }

    // return public key
    // res.status(200).json({ pubKey: keyPair.pubKey });
    return success(res, keyPair.pubKey, 'Successfully generated key pair.');
  } catch (error) {
    console.log('Error registering domain:', error);
    return failure(res, 'Internal error while registering dev website.');
  }
};
