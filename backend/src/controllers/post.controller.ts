import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as postService from '../services/post.service';

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const post = await postService.createPost(req.user!.id, req.body);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const { limit, cursor } = req.query;
    const posts = await postService.getFeed(Number(limit) || 20, cursor as string);
    res.json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const like = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const result = await postService.likePost(req.user!.id, postId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const comment = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const result = await postService.addComment(req.user!.id, postId, content);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
