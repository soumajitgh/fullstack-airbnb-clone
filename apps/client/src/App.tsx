import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from './routes/root.route.tsx';
import EmptyCard from './components/common/cards/empty-card.component.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className={'font-sans max-lg:hidden'}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer position={'bottom-center'} />
        </QueryClientProvider>
      </div>
      <EmptyCard className={'h-96 lg:hidden container mx-auto mt-10'}>
        <p>This site is best viewed in a large screen.</p>
      </EmptyCard>
    </>
  );
}

export default App;
