import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

import { signUpSchema } from "../../common/validation/auth";
import { publicProcedure, router } from "../trpc";


export const userRouter = router({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      
      const hashedPassword = await hash(password);
      
      const result = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      await ctx.prisma.profile.create({
        data: {
          userId: result.id,
          bio: "Write something about yourself"
        }
      });
      
      return {
        status: 201,
        message: "Account created successfully",
        result: result.id,
      };
    }),
});

export type IServerRouter = typeof userRouter;