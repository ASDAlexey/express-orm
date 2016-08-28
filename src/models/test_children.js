export default (sequelize, DataTypes) => {
    const TestChild = sequelize.define('TestChild', {
        title: DataTypes.STRING,
    }, {
        classMethods: {
            associate: (models) => {
                TestChild.belongsTo(models.TestParent, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    },
                });
            },
        },
    });
    return TestChild;
};

