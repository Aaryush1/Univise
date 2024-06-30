import { useParams, useRouter } from 'next/navigation';

export function useChatRouting() {
  const params = useParams();
  const router = useRouter();
  
  // Assuming your dynamic route is /chats/[chatId]
  const chatId = params?.chatId as string | undefined;

  const navigateToChatList = () => router.push('/chats');

  return { chatId, navigateToChatList };
}