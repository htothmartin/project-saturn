'use server';

import { createProjectSchema } from '@/lib/schemas';
import { z } from 'zod';

type Inputs = z.infer<typeof createProjectSchema>;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function CreateNewProjectAction(data: Inputs) {
  const result = createProjectSchema.safeParse(data);
  await delay(20000000000);
  if (!result.error) {
    fetch('http://localhost:8080/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(result),
    });
    //console.log(await protectedApi.post('/projects/create', { ...result }));
    return result.success;
  } else {
    return result.error;
  }
}
