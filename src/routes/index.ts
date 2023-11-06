import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
	console.log(req.body);

	res.sendStatus(200);
});

export default router;
