import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, images } from '@repo/db';
import { and, eq } from 'drizzle-orm';
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
    deleteImage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [existingImage] = await db
        .select()
        .from(images)
        .where(
          and(eq(images.id, input.id), eq(images.userId, input.userId))
        );

      if (existingImage) {
        
        await db.delete(images).where(eq(images.id, input.id));
        return { success: true, message: 'Image deleted successfully.' };
      } else {
        throw new Error(
          'Image not found or you do not have permission to delete this image.'
        );
      }
    }),
})