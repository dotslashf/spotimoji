import express from 'express';
import { routes } from './routes/index';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

require('dotenv').config();

const app: express.Application = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.TOKEN_SECRET!,
    cookie: { secure: false, maxAge: 3600000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(morgan('tiny'));
app.use('/auth', routes.authRouter);
app.use('/home', routes.homeRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`🚀 Server running`);
});
