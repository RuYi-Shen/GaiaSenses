import { likeService } from "../services/likeService.js";
import { postRepository, PostContent } from "../repositories/postRepository.js";

async function createPost(postInfo: PostContent) {
  return await postRepository.create(postInfo);
}

async function publishPost(postId: number, userId: number) {
  const postFromDb = await postRepository.findById(postId);
  if (postFromDb.userId !== userId) {
    throw new Error("You can't publish this post");
  }
  return await postRepository.publish(postId);
}

async function getNewPosts(userId: number) {
  const posts = await postRepository.findAll();
  return await Promise.all(
    posts.map(async (post) => {
      const { id: postId } = post;
      const likes = await likeService.getLikes({ postId, userId });
      return { ...post, likes };
    })
  );
}

async function getBestPosts(userId: number) {
  const posts = await postRepository.findLastWeek();
  posts.sort((a, b) => b._count.Like - a._count.Like);
  return await Promise.all(
    posts.slice(0, 10).map(async (post) => {
      const { id: postId } = post;
      const likes = await likeService.getLikes({ postId, userId });
      delete post._count;
      return { ...post, likes };
    })
  );
}

async function getUserPosts(userId: number) {
  const posts = await postRepository.findUser(userId);
  return await Promise.all(
    posts.map(async (post) => {
      const { id: postId } = post;
      const likes = await likeService.getLikes({ postId, userId });
      return { ...post, likes };
    })
  );
}

async function getLikedPosts(userId: number) {
  const posts = await postRepository.findLiked(userId);
  return await Promise.all(
    posts.map(async (post) => {
      const { id: postId } = post.post;
      const likes = await likeService.getLikes({ postId, userId });
      return { ...post.post, likes };
    })
  );
}

async function deletePost(postId: number, userId: number) {
  const post = await postRepository.findById(postId);
  if (post.userId !== userId) {
    throw new Error("You can't delete this post");
  }
  return await postRepository.deleteById(postId);
}

export const postService = {
  createPost,
  publishPost,
  getNewPosts,
  getBestPosts,
  getUserPosts,
  getLikedPosts,
  deletePost,
};
