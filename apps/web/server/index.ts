import { notesRouter } from './router/notes';
import { filesRouter } from './router/files';
import { imagesRouter } from './router/images';
import { router } from './trpc';
export const appRouter = router({

  images: imagesRouter,
  files: filesRouter,
  notes: notesRouter,
});


export type AppRouter = typeof appRouter;