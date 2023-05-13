import { Application } from 'express';
import { isLoggedIn } from './middlewares';
import UserRoutes from './routes/user.routes';
import propertyRoutes from './routes/property.routes';

export default function routes(app: Application): void {
  // Public
  app.use('/property', propertyRoutes);
  // Private : Token needed
  app.use('/user', isLoggedIn, UserRoutes);
}
