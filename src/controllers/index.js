import models from '../models';

class Controller {
    index(req, res) {
        models.TestParent.findAll({
            include: [models.TestChild],
        }).then((testParents) => {
            res.render('index', {
                title: 'Sequelize: Express Example',
                testParents,
            });
        });
    }
}

export default Controller;
