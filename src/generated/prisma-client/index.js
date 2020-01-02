"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Book",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Rent",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/library-graphql/library-graphQL/dev`
});
exports.prisma = new exports.Prisma();
