import { z } from 'zod';

// string().url() currently allows any string starting with http/https.
// resorted to .refine() with a regex for frontend validation.
// more here: https://github.com/colinhacks/zod/issues/2236
export const RegisterDomainSchema = z.object({
  domain: z.string().refine((value) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return urlPattern.test(value);
  }, 'Invalid Domain URL'),
});

export type RegisterDomainData = z.infer<typeof RegisterDomainSchema>;
