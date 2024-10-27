import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';
import { z } from 'zod';

const undrstndErrorDataSchema = z.object({
  object: z.literal('error'),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable(),
});

export type UndrstndErrorData = z.infer<typeof undrstndErrorDataSchema>;

export const undrstndFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: undrstndErrorDataSchema,
  errorToMessage: data => data.message,
});
