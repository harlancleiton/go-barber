import { registerRootComponent } from 'expo';
import React from 'react';

import GoBarber from './src/App';

const App = () => <GoBarber />;

registerRootComponent(App);
