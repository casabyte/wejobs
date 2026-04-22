'use server'


export type ActionState<T = any> = {
    status: 'IDLE' | 'SUCCESS' | 'ERROR',
    errors?: Record<string, string[]>,
    message?: string,
    data?: T,
}


export async function registerAction (prevState: any, formData: FormData) : Promise<ActionState>
{
  const firstname = formData.get('firstname');
  const lastname = formData.get('lastname');
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:3040/auth/register', {
    method: 'POST',
    body: JSON.stringify({firstname, lastname, email, password}),
    headers: {'Content-Type': 'application/json'},
  })


  

  if (!res.ok)
    return {status: 'ERROR', message: 'Invalid credentials'};

  const data = await res.json();
  return {status: 'SUCCESS', data: data.access_token};
}