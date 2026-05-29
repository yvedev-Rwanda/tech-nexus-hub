import { Router } from 'express';
import * as profileController from '../controllers/profile.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, profileController.getMyProfile);
router.put('/me', authenticate, profileController.updateMyProfile);
router.post('/follow', authenticate, profileController.follow);
router.get('/suggestions', authenticate, profileController.getSuggestions);

export default router;
