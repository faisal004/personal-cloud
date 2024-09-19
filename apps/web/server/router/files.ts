import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, files } from '@repo/db';
import { and, eq } from 'drizzle-orm';
export const filesRouter = router({
    getFilesByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.select().from(files).where(eq(files.userId, input));
    }),
    deleteFile: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [existingFile] = await db
        .select()
        .from(files)
        .where(
          and(eq(files.id, input.id), eq(files.userId, input.userId))
        );

      if (existingFile) {
        
        await db.delete(files).where(eq(files.id, input.id));
        return { success: true, message: 'File deleted successfully.' };
      } else {
        throw new Error(
          'File not found or you do not have permission to delete this image.'
        );
      }
    }),
})