// app/utils/authUtils.ts
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signOut } from '@/services/firebase';

export const useAuth = () => {
  const router = useRouter();

  const login = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        router.push('/chats');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      // You might want to handle specific errors here or show them to the user
    }
  };

  const logout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { login, logout };
};