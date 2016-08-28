import { Router } from 'express';
import Controller from '../controllers';

const router = Router();
const controller = new Controller();

router.get('/', controller.index);

export default router;
