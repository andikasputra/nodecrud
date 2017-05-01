'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'Users',
      ['email'],
      {
        indexName: 'EmailUnique',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('Users', 'EmailUnique')
  }
};
