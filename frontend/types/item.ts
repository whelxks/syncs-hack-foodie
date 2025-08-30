import { z } from 'zod'
import { Category, Condition } from '@/constants/Enums';

const ZItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    category: z.enum(Category),
    condition: z.enum(Condition),
    description: z.string(),
    reserved: z.boolean(),
    location: z.object({
        lat: z.number(),
        long: z.number(),
    }),
    address: z.string(),
})

export type ItemSchema = z.infer<
  typeof ZItemSchema
>
