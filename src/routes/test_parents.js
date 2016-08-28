import { Router } from 'express';
import models from '../models';

const router = Router();

router.post('/create', (req, res) => {
    models.TestParent.create({
        username: req.body.username,
    }).then(() => {
        res.redirect('/');
    });
});

router.get('/:test_parent_id/destroy', (req, res) => {
    models.TestParent.destroy({
        where: {
            id: req.params.user_id,
        },
    }).then(() => {
        res.redirect('/');
    });
});

router.post('/:test_parent_id/test_childrens/create', (req, res) => {
    models.TestChild.create({
        title: req.body.title,
        TestParentId: req.params.test_parent_id,
    }).then(() => {
        res.redirect('/');
    });
});

router.get('/:test_parent_id/test_childrens/:test_childrens_id/destroy', (req, res) => {
    models.TestChild.destroy({
        where: {
            id: req.params.test_childrens_id,
        },
    }).then(() => {
        res.redirect('/');
    });
});

export default router;
