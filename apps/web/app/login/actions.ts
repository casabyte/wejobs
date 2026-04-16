'use server'


export type ActionState<T = any> = {
    status: 'IDLE' | 'SUCCESS' | 'ERROR',
    errors?: Record<string, string[]>,
    message?: string,
    data?: T,
}


export async function loginAction (prevState: any, formData: FormData) : Promise<ActionState>
{
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:3040/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'application/json'},
  })

  if (!res.ok)
    return {status: 'ERROR', message: 'Invalid credentials'};

  const data = await res.json();
  return {status: 'SUCCESS', data: data.access_token};
}