import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, images } from '@repo/db';
import { eq } from 'drizzle-orm';
export const imagesRouter = router({
    addImage: publicProcedure
    .input(z.object({
      userId: z.string(),
      url: z.string().url()
    }))
    .mutation(async (opts) => {
      await db.insert(images).values({
        id: crypto.randomUUID(),
        userId: opts.input.userId,
        url: opts.input.url
      });
      return true;
    }),
  getImagesByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const imagesForUser = await db
        .select()
        .from(images)
        .where(eq(images.userId, input));
      return imagesForUser;
    }),
})