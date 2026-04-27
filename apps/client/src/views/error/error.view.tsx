import { Link, useRouteError } from 'react-router-dom';

function ErrorView() {
  const error = useRouteError();

  console.error(error);

  return (
    <div
      className={'container mx-auto mt-10 bg-red-100 border-2 border-error border-dashed h-96 rounded-xl flex flex-col justify-center items-center gap-8'}>
      <h1 className={'font-bold text-2xl text-error'}>Puff.. Some Error Occurred</h1>

      <p className={'text-md text-gray-500'}>We are sorry for the inconvenience, please try again later</p>

      <Link to={'/'} className={'btn btn-error btn-outline'}>Go to Home</Link>
    </div>
  );
}

export default ErrorView;