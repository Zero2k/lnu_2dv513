import 'reflect-metadata';
import 'dotenv/config';
import next from 'next';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

import db from './db';
import { redis } from './utils/redis';
import { createSchema } from './utils/createSchema';

const RedisStore = connectRedis(session);

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
        redis,
        url: req ? `${req.protocol}://${req.get('host')}` : '',
        req,
        res,
        session: req.session,
      }),
    });

    app.enable('trust proxy');
    app.use(
      session({
        store: new RedisStore({
          client: redis as any,
          prefix: 'sess:',
        }),
        name: 'qid',
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      })
    );

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
