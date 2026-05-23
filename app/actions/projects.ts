'use server';

import { revalidatePath } from 'next/cache';

export async function addProject(formData: FormData) {
  const name = formData.get('name');
  const color = formData.get('color');

  const response = await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });

  if (!response.ok) {
    throw new Error('Failed to add project');
  }

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id');

  const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }

  revalidatePath('/dashboard');
}
