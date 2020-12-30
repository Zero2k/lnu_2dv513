import 'reflect-metadata';
import 'dotenv/config';
import next from 'next';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

import db from './db';
import { createSchema } from './utils/createSchema';

app
  .prepare()
  .then(async () => {
    const app = express();
    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    await db();

    const apolloServer = new ApolloServer({
      schema: await createSchema(),
      introspection: true,
      context: ({ req, res }: any) => ({
        url: req ? `${req.protocol}://${req.get('host')}` : '',
        req,
        res,
      }),
    });

    apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });

    app.all('*', (req, res) => {
      return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((error: any) => {
    console.error(error.stack);
    process.exit(1);
  });
