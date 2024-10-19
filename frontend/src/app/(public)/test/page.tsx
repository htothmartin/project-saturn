import { publicApi } from '@/api/axios';

export default async function Test() {
  const { data } = await publicApi.post('auth/login', {
    email: 'test@test.com',
    password: 'Test12345!',
  });
  console.log(data);

  return <div>Hello</div>;
}
