import { z } from 'zod';

export const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'A fájl mérete nem lehet több, mint 5MB',
  })
  .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
    message: 'Csak JPEG vagy PNG formátumú fájlokat fogadunk el',
  });

export const createProjectSchema = z.object({
  projectName: z.string().min(1, 'The project name is required.'),
  projectDescription: z.string().optional(),
  projectImage: fileSchema,
  projectKey: z
    .string()
    .min(2, 'The project key is required.')
    .max(6, "The porject key can't be longer than 6 character."),
});
