const express = require('express'); //modulo por defecto de la dependencia express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');
const {merge} = require('loadash');

const Usuario = require('./models/usuario')

mongoose.connect('mongodb+srv://sofiamanana:sofia56204@cluster0.ncfwni4.mongodb.net/bdwebmovil',{ userNewUrlParser: true, userUnifiedTopology: true});

//pk = object id
// !: se usa para indicar si es obligatorio o opcional el parámetro
const typeDefs = gql`
    type Usuario{
        id: ID!
        email: String!
        pass: String!
    }

    input UsuarioInput{
        email: String!
        pass: String!
    }

    type Alert{
        message: String
    }

    type Query{
        getUsuarios: [Usuario]
        getUsuario(id: ID!) : Usuario
    }

    type Mutation {
        addUsuario(input: UsuarioInput): Usuario
        updateUsuario(id: ID!, input: UsuarioInput): Usuario
        deleteUsuario(id: ID!): Alert
    }

`

//el que hace la pega

const resolvers = {
    Query: {
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        }
    }
};

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));