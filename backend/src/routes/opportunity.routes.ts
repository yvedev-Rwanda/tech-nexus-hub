import { Router } from 'express';
import * as opportunityController from '../controllers/opportunity.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', opportunityController.list);
router.post('/:id/apply', authenticate, opportunityController.apply);

export default router;
