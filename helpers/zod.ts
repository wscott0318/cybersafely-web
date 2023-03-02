import { z } from 'zod'

export function addIssue(name: string, message: string, ctx: z.RefinementCtx) {
  ctx.addIssue({
    message,
    code: 'custom',
    path: name.split('.'),
  })
}
