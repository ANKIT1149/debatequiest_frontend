'use server';
import { auth, currentUser } from '@clerk/nextjs/server';
import axios from 'axios';

export const getClerkUser = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const client = await currentUser();
    if (!client) {
      throw new Error('No Clerk user found');
    }

    const userData = {
      clerk_id: client.id || '', 
      username: client.username || '', 
      email: client.emailAddresses?.[0]?.emailAddress || '',
      password: '',
      imageUrl: client.imageUrl || '',
    };

    return userData;
  } catch (error) {
    console.error('Error fetching Clerk user data:', error);
    throw error;
  }
};

export const registerUser = async (grade: string) => {
  try {
    const client = await getClerkUser();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_DB_URL}/register`,
      {
        ...client,
         grade
      }
    );

    if (response.status === 201) {
      console.log(response.data.data);
      console.log('User Registered SuccessFully');
    }
  } catch (error) {
    console.log('Registration Failed', error);
  }
};

