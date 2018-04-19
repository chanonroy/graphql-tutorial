const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const chalk = require('chalk');
const emoji = require('node-emoji');

require('dotenv').config();
const app = express();

// Connect to mlab database
mongoose.connect(`mongodb://${process.env.DB_NAME}:${process.env.DB_PASS}@ds147589.mlab.com:47589/chanon-gql`);
mongoose.connection.once('open', () => {
    console.log(emoji.get('key') + chalk.blue("  Connected to Database"));
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log(chalk.whiteBright('Listening for requests on Port 4000...'));
});