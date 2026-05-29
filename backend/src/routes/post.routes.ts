import { Router } from 'express';
import * as postController from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/feed', authenticate, postController.getFeed);
router.post('/', authenticate, postController.create);
router.post('/:postId/like', authenticate, postController.like);
router.post('/:postId/comment', authenticate, postController.comment);

export default router;
