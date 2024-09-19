import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, files } from '@repo/db';
import { eq } from 'drizzle-orm';
export const filesRouter = router({
    getFilesByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.select().from(files).where(eq(files.userId, input));
    }),
})