import Form from './form'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const session = await getServerSession();
  if (session) {
    redirect('/')
  }

  return (
    <div className='h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-black p-4'>
      <Form />
    </div>
  )
}

export default Login