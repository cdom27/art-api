import { Request, Response } from 'express';
import { storeSecret } from './service';
import { generateAndHashKey, normalizeDomain } from './utils';

export const registerDomainHandler = async (
  req: Request<{}, {}, { domain: string }>,
  res: Response
) => {
  // parse body and normalize domain
  const { domain } = req.body;

  console.log('DOMAIN:', domain);

  console.log('REQ BODY:', req.body);

  if (!domain) {
    res
      .status(400)
      .json({ error: 'Domain to register is missing from request body' });
    return;
  }

  const normalizedDomain = normalizeDomain(domain);

  if (!normalizedDomain) {
    res.status(400).json({ error: 'Domain was not normalized.' });
    return;
  }

  // generate public key and secret hash
  const keyPair = await generateAndHashKey();

  try {
    // store secret with domain
    const data = await storeSecret(normalizedDomain, keyPair.secret);

    if (!data) {
      res.status(400).json({ error: 'Error while storing the secret.' });
      return;
    }

    // return public key
    res.status(200).json({ pubKey: keyPair.pubKey });
  } catch (error) {
    console.log('Error registering domain:', error);
    res.status(500).json({ error: 'Internal error registering domain.' });
    return;
  }
};
