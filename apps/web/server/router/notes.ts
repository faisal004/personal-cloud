
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { db, notes } from '@repo/db';
import { and, eq } from 'drizzle-orm';
export const notesRouter=router({
    addNote: publicProcedure
    .input(z.object({
      userId: z.string(),
      content: z.string(),
    }))
    .mutation(async (opts) => {
 
        const [newNote] = await db.insert(notes).values({
          userId: opts.input.userId,
          content: opts.input.content,
        }).returning();
        return newNote;
      
    }),

  updateNote: publicProcedure
    .input(z.object({
      id: z.string(),
      content: z.string(),
    }))
    .mutation(async (opts) => {
      const existingNote = await db
        .select()
        .from(notes)
        .where(eq(notes.id, opts.input.id))
        .execute();

      if (existingNote.length > 0) {
        await db
          .update(notes)
          .set({ content: opts.input.content })
          .where(eq(notes.id, opts.input.id));

        return existingNote[0];
      } else {
        throw new Error('Note not found');
      }
    }),
    geNotesByUserId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const noteForUser = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, input));
      return noteForUser;
    }),
    deleteNote: publicProcedure
    .input(z.object({
      id: z.string(),
      userId: z.string(),
    }))
    .mutation(async (opts) => {
      const existingNote = await db
        .select()
        .from(notes)
        .where(and(
          eq(notes.id, opts.input.id),
          eq(notes.userId, opts.input.userId) 
        ))
        .execute();

      if (existingNote.length > 0) {
        await db.delete(notes).where(eq(notes.id, opts.input.id));
        return { success: true, message: 'Note deleted successfully.' };
      } else {
        throw new Error('Note not found or you do not have permission to delete this note.');
      }
    }),
})