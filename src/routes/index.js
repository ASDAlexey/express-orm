import express from 'express';
import models from '../models';

const router = express.Router();

router.get('/', (req, res) => {
    models.TestParent.findAll({
        include: [models.TestChild],
    }).then((testParents) => {
        res.render('index', {
            title: 'Sequelize: Express Example',
            testParents,
        });
    });
});

export default router;
