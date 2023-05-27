import express from 'express';
import { AuthController } from '../controllers';

export default express
  .Router()
  .get('/login', AuthController.login)
  .get('send-password-recovery-email', AuthController.sendPasswordRecoveryEmail)
  .get('email/confirm', AuthController.confirmEmail)
  .post('/signup', AuthController.signup)
  .put('/recover-password', AuthController.recoveredPassword);
