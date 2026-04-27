import EmptyCard from '../../components/common/cards/empty-card.component.tsx';
import { Link } from 'react-router-dom';

export default function DashboardView() {
  return (
    <EmptyCard className={'h-96 text -z-10'}>
      <p>Welcome to Airbnb Clone! Search something to get started.</p>
      <p>or <Link className={'btn btn-outline ml-5'} to={'/hosting/become-a-host'}>Create your listing</Link></p>
    </EmptyCard>
  );
}