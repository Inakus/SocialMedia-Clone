import { router } from "../trpc";
import { clientRouter } from "./client";
import { userRouter } from "./user";

export const appRouter = router({
    user: userRouter,
    client: clientRouter
})

export type AppRouter = typeof appRouter