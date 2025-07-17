'use server';
import { auth, currentUser } from '@clerk/nextjs/server';

export const getUserId = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log('User not authenticated');
    }

    const client = await currentUser();
    if (!client) {
      console.log('No Clerk user found');
    }
    
    return client?.id;
  } catch (error) {
    console.log('Error fetching Clerk user data:', error);
    throw error;
  }
};
