import express from 'express';
import models from '../models';

const router = express.Router();

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
    models.Task.create({
        title: req.body.title,
        UserId: req.params.test_parent_id,
    }).then(() => {
        res.redirect('/');
    });
});

router.get('/:test_parent_id/test_childrens/:test_childrens_id/destroy', (req, res) => {
    models.Task.destroy({
        where: {
            id: req.params.test_childrens_id,
        },
    }).then(() => {
        res.redirect('/');
    });
});

export default router;
