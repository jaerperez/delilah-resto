'use strict';

module.exports = {

  // Que se ejecuta cuando hacemos la siembra
  up: (queryInterface, Sequelize) => {

    let productos = [
      { nombre: "Tacos", precio: 30, activo:1 ,imagen:"https://tipsparatuviaje.com/wp-content/uploads/2018/09/tacos-comida-mexicana.jpg"},
      { nombre: "Fajitas", precio: 23, activo:1 ,imagen:"https://tipsparatuviaje.com/wp-content/uploads/2018/09/fajitas-comida-mexicana.jpg"},
      { nombre: "Enchiladas", precio: 11,activo:1 ,imagen:"https://tipsparatuviaje.com/wp-content/uploads/2018/09/enchiladas-comida-mexicana.jpg"},
      { nombre: "Pozole", precio: 18, activo:1 ,imagen:"https://tipsparatuviaje.com/wp-content/uploads/2018/09/pozole-comida-mexicana.jpg"},
    ];

    return queryInterface.bulkInsert('producto', productos, {});
  },

  // Esto se ejecuta cuando se dehace la siembra
  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('producto', null, {});
  }
};