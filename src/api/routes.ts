import { Application } from 'express';
import { isLoggedIn } from './middlewares';
import UserRoutes from './routes/user.routes';
import PropertyRoutes from './routes/property.routes';
import AuthRoutes from './routes/auth.routes';
import HealthRoutes from './routes/health.routes';
import HooksRoutes from './routes/hooks.routes';
import AppointmentRoutes from './routes/appointment.routes';

export default function routes(app: Application): void {
  // Public
  app.use('/health', HealthRoutes);
  app.use('/hooks', HooksRoutes);
  app.use('/auth', AuthRoutes);
  app.use('/property', PropertyRoutes);
  // Private : Token needed
  app.use('/user', isLoggedIn, UserRoutes);
  app.use('/appointment', isLoggedIn, AppointmentRoutes);
}
