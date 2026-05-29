import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as opportunityService from '../services/opportunity.service';

export const list = async (req: AuthRequest, res: Response) => {
  try {
    const opportunities = await opportunityService.getOpportunities(req.query);
    res.json(opportunities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const apply = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await opportunityService.applyToOpportunity(req.user!.id, id, req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
