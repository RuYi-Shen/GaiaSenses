import { appClient } from "./lib/client";

const postService = {
  publish: (id) => appClient.post(`/post/publish/${id}`, {}),
  create: (data) => appClient.post("/post", data),
  delete: (id) => appClient.delete(`/post/${id}`),
  getRecent: () => appClient.get("/post/new"),
  getLiked: () => appClient.get("/post/like"),
  getTrending: () => appClient.get("/post"),
  getFromUser: () => appClient.get("/post/user"),
  like: (id) => appClient.post(`/like/${id}`, {}),
  removeLike: (id) => appClient.delete(`/like/${id}`)
}

export default postService;
