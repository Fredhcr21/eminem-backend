import { getAuth } from 'firebase-admin/auth';
import firebaseApp from './initialize-firebase-app';

export async function validateFirebaseIDToken(token: string) {
  try {
    const user = await getAuth(firebaseApp).verifyIdToken(token);
    return user.uid;
  } catch (err) {
    const errorStr = String(err).toLowerCase();
    throw new Error(errorStr);
  }
}
