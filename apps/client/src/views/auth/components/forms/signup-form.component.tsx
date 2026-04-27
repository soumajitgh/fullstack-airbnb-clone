import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../../api/auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { extractApiError } from '../../../../utils/error/extractApiError.ts';
import { AxiosError } from 'axios';

type SignUpInputs = {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      navigate('/auth/login');
    },
    onError: (err) => {
      toast.error(extractApiError(err as AxiosError));
    },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    if (data.password != data.confirmPassword) {
      toast.error('Passwords don\'t match');
      return;
    }

    signUpMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <form className={'flex flex-col gap-2 w-full'} onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input type="email" placeholder="Email"
               className="input input-bordered w-full" {...register('email', { required: true })} />
        {errors.email && <span className={'text-error text-sm'}>email is required</span>}
      </div>

      <div>
        <input type="password" placeholder="Password"
               className="input input-bordered w-full" {...register('password', { required: true })} />
        {errors.password && <span className={'text-error text-sm'}>password is required</span>}
      </div>

      <input type="text" placeholder="Confirm Password"
             className="input input-bordered w-full" {...register('confirmPassword', { required: true })} />

      <button className={'btn btn-primary mt-2 w-full'}>Register</button>
    </form>
  );
}

export default SignUpForm;