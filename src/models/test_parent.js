export default (sequelize, DataTypes) => {
    const TestParent = sequelize.define('TestParent', {
        username: DataTypes.STRING,
    }, {
        classMethods: {
            associate: (models) => {
                TestParent.hasMany(models.TestChild);
            },
        },
    });
    return TestParent;
};

