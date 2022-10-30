import { initTRPC } from '@trpc/server';
import { IContext } from "./context";

const t = initTRPC.context<IContext>().create();

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;