'use server';

import { revalidatePath } from 'next/cache';

export type RentSubmission = {
  desk: string | null;
  chair: string | null;
  accessories: string[];
  total: number;
  period: string;
};

export async function rentWorkspace(data: RentSubmission) {
  console.log('Rent submission received:', JSON.stringify(data, null, 2));
  revalidatePath('/');
  return { success: true };
}
