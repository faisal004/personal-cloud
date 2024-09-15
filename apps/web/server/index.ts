import { z } from 'zod';
import { publicProcedure, router } from './trpc';
import { todos, db } from "@repo/db"
export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
      return await db.select().from(todos);
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        await db.insert(todos).values({ id:(Math.round(Math.random()*100000)),content: opts.input, done: false });
        return true;
      }),
  });


export type AppRouter = typeof appRouter;