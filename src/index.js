const { GraphQLServer } = require('graphql-yoga');
const Query = require("./resolvers/Query");
const Book = require("./resolvers/Book");
const Comment = require("./resolvers/Comment");
const User = require("./resolvers/User");
const Rent = require("./resolvers/Rent");
// const { prisma } = require('./generated/prisma-clientnpm');



const resolvers = {
    Query,
    Book,
    Comment,
    User,
    Rent,

};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            // prisma,
        }
    },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));