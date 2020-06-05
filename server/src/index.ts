import 'reflect-metadata';

import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

/* eslint-disable-next-line import/first */
import './server';
