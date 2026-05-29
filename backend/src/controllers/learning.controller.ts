import { Request, Response } from 'express';
import * as learningService from '../services/learning.service';

export const getPaths = async (req: Request, res: Response) => {
  try {
    const paths = await learningService.getAllPaths();
    res.json(paths);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPath = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const path = await learningService.getPathDetails(id);
    if (!path) return res.status(404).json({ error: 'Path not found' });
    res.json(path);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const path = await learningService.createPath(req.body);
    res.status(201).json(path);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
