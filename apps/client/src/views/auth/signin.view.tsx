import { Link } from 'react-router-dom';

import SignInForm from './components/forms/signin-form.component.tsx';

function SignIn() {

  return (
    <main className="flex flex-col items-center justify-between min-h-full">

      <div className={'w-full'}>
        <h3 className={'text-3xl font-bold mb-5'}>Login</h3>
        <SignInForm />
      </div>

      <span>
            don't have an account?
            <Link className={'link link-secondary'} to={'/auth/register'}>register</Link>
      </span>
    </main>
  );
}

export default SignIn;