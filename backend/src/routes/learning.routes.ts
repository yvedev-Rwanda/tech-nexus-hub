import { Router } from 'express';
import * as learningController from '../controllers/learning.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', learningController.getPaths);
router.get('/:id', learningController.getPath);
router.post('/', authenticate, authorize(['PLATFORM_ADMIN']), learningController.create);

export default router;
