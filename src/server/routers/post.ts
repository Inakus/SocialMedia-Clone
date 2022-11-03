import z from "zod"

import { publicProcedure, router } from "../trpc";


export const postRouter = router({
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user.userId
        }
      })

      if (!currentUser) {
        return {
          code: 404,
          message: "User not found"
        }
      }

      const createPost = await ctx.prisma.post.create({
        data: {
          userId: currentUser.id,
          title: input.title,
          content: input.content,
        }
      })

      if (createPost) {
        return {
          code: 200,
          message: "Succesfully created post!",
          result: createPost.id
        }
      }

      return {
        code: 400,
        message: "Somethink went wrong"
      }
    }),
  delete: publicProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletePost = await ctx.prisma.post.delete({
        where: {
          id: input.postId
        }
      })

      if (deletePost) {
        return {
          code: 200,
          message: "Succesfully deleted post"
        }
      }

      return {
        code: 400,
        message: "Somethin went wrong"
      }
    }),
  findAllPosts: publicProcedure
    .query(async ({ ctx }) => {
      return {
        code: 200,
        message: "Succesfully find all posts",
        result: await ctx.prisma.post.findMany({
        include: {
          likes: true,
          comments: true,
          user: true
        }
      })}
    }),
  findPost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const findPost = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId
        },
        include: {
          likes: true,
          comments: true,
          user: true
        }
      })

      if (findPost) return {
        code: 200,
        message: "Succesfully find post",
        result: findPost
      }

      return {
        code: 404,
        message: "Post not found"
      }
    }),
  findAllUserPost: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          userId: input.userId
        },
        include: {
          likes: true,
          comments: true,
        }
      })

      return {
        code: 200,
        message: "Succesfully find user posts",
        result: posts
      }
    })
});

export type IPostRouter = typeof postRouter;