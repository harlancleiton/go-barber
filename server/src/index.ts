import 'reflect-metadata';
import { createConnection } from './shared/infra/typeorm';

createConnection();

import './shared/infra/http/server';
