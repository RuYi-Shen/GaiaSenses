import client from "./lib/client";

const postService = {
  publish: (id) => client.post(`/post/publish/${id}`, {}),
  create: (data) => client.post("/post", data),
  getRecent: () => client.get("/post/new"),
  getLiked: () => client.get("/post/like"),
  getTrending: () => client.get("/post"),
  getFromUser: () => client.get("/post/user"),
  like: (id) => client.post(`/like/${id}`, {}),
  removeLike: (id) => client.delete(`/like/${id}`)
}

export default postService;
