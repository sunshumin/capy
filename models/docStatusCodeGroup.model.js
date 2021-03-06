/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('doc_status_code_group', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		project_id: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'doc_status_code_group',
		timestamps: false
	});
};
