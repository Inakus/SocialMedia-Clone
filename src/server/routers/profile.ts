import z from "zod"

import { publicProcedure, router } from "../trpc";

export const profileRouter = router({
    findProfile: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const findProfile = await ctx.prisma.profile.findUnique({
                where: {
                    userId: input.userId
                },
                include: {
                    user: true,
                }
            })

            if (findProfile) {
                return {
                    code: 200,
                    result: findProfile
                }
            }

            return {
                code: 402,
                message: "Profile don't exists"
            }
        })
})