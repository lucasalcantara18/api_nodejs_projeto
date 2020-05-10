"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHTTP = require("express-graphql");
const models_1 = require("./models");
const schema_1 = require("./graphql/schema");
const extract_jwt_middleware_1 = require("./middlewares/extract-jwt.middleware");
const DataLoaderFactory_1 = require("./graphql/dataloaders/DataLoaderFactory");
const RequestedFields_1 = require("./graphql/ast/RequestedFields");
class App {
    constructor() {
        this.express = express();
        this.init();
    }
    init() {
        this.requestedFields = new RequestedFields_1.RequestedFields();
        this.dataLoaderFactory = new DataLoaderFactory_1.DataLoaderFactory(models_1.default, this.requestedFields);
        this.middleware();
    }
    middleware() {
        process.env.NODE_ENV = 'development';
        process.env.JWT_SECRET = 'thor';
        this.express.use('/graphql', extract_jwt_middleware_1.extractJwtMiddleware(), (req, res, next) => {
            req['context']['db'] = models_1.default;
            req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders();
            req['context']['requestedFields'] = this.requestedFields;
            next();
        }, graphqlHTTP((req) => ({
            schema: schema_1.default,
            graphiql: process.env.NODE_ENV === 'development',
            context: req['context']
        })));
    }
}
exports.default = new App().express;
