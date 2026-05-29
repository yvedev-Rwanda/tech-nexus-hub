import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as profileService from '../services/profile.service';

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await profileService.getProfile(req.user!.id);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await profileService.updateProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const follow = async (req: AuthRequest, res: Response) => {
  try {
    const { followingId } = req.body;
    // We need the profile IDs for following, not necessarily the user IDs
    // But my schema uses Profile fields that map to Profile IDs.
    // Let's assume the request sends the target Profile ID.
    const result = await profileService.followUser(req.user!.id, followingId);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSuggestions = async (req: AuthRequest, res: Response) => {
  try {
    const users = await profileService.getRecommendations(req.user!.id);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
