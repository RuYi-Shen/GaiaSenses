import { likeRepository, LikeContent } from "../repositories/likeRepository.js";

async function likePost(likeInfo: LikeContent) {
  return await likeRepository.create(likeInfo);
}

async function dislikePost(likeInfo: LikeContent) {
  return await likeRepository.deleteById(likeInfo);
}

async function getLikes(likeInfo: LikeContent) {
  const liked = await likeRepository.getById(likeInfo);
  const usersInfo = await likeRepository.getByPost(likeInfo);
  const count = await likeRepository.countByPost(+likeInfo.postId);

  if (liked) {
    usersInfo.unshift(liked);
  }
  const users = usersInfo.map((userInfo) => {
    return userInfo.user;
  });

  return { liked: liked ? true : false, users, count };
}

export const likeService = {
  likePost,
  dislikePost,
  getLikes,
};
