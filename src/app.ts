import express from 'express';
import { routes } from './routes/index';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import firebase from 'firebase-admin';
import serviceAccountCredentials from './config/serviceAccountCredentials.json';
require('dotenv').config();

const serviceAccount = serviceAccountCredentials as firebase.ServiceAccount;

const FirebaseStore = require('connect-session-firebase')(session);

const ref = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const app: express.Application = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.TOKEN_SECRET!,
    cookie: { secure: false, maxAge: 3600000 },
    resave: true,
    saveUninitialized: true,
    store: new FirebaseStore({
      database: ref.database(),
    }),
  })
);
app.use(morgan('tiny'));
app.get('/', (req, res) => {
  res.redirect('/home');
});
app.use('/auth', routes.authRouter);
app.use('/home', routes.homeRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`🚀 Server running`);
});
