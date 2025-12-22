import api from "./api";
const API_URL = import.meta.env.VITE_POSTS_URL;

const createPost = async () => {
  return await api.post(API_URL);
};
const getAllPosts = async (post) => {
  return await api.get(API_URL, post);
};

const getById = async (id) => {
  return await api.get(API_URL + "/" + id);
};
const updatePost = async (id, post) => {
  return await api.put(`${API_URL}/${id}`, post);
};
const deletePost = async () => {
  return await api.delete(API_URL);
};
const getByAuthorId = async (id) => {
  return await api.get(`${API_URL}/author/${id}`);
};

const PostService = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  deletePost,
  getByAuthorId,
};

export default PostService;
