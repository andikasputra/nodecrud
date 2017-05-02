# CRUD with NodeJS
I created this to learn to make website with nodejs. Actualy I use expressjs framework

# Dependencies
* [expressjs](https://expressjs.com/) for main / routing framework
* [sequelize](http://docs.sequelizejs.com/en/v3/) for ORM database
* [sequelize-cli](http://docs.sequelizejs.com/en/v3/docs/migrations/) for migration and generate db
* [mysql](https://expressjs.com/en/guide/database-integration.html#mysql) for mysql database driver
* [multer](https://github.com/expressjs/multer) for handle uploading file
* [method override](https://github.com/expressjs/method-override) to custom method request
* [handlebars](http://handlebarsjs.com/) for view engine

# Installation
* `npm install`
* install sequelize-cli globally
* create config.js inside config directory from config.example.js and fill with your database
* run `sequelize db:migrate`
* `npm start`
* http://localhost:3000/users

# License
This is under [MIT license](LICENSE)