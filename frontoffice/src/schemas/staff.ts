import { DisputeCreditAction, DisputeReviewAction } from '@/interfaces/review';
import { z } from 'zod';
import { SchemaError } from './errors';

export const disputeResolutionActionFormSchema = z.object({
  credits: z.nativeEnum(DisputeCreditAction).refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  }),
  review: z.nativeEnum(DisputeReviewAction).refine((value) => value !== undefined, {
    message: SchemaError.REQUIRED
  })
});

export type DisputeResolutionActionFormSchemaType = z.infer<typeof disputeResolutionActionFormSchema>;
