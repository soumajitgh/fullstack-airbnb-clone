import fullLogo from '../../../assets/logo/airbnb-full-logo.svg';
import { Link } from 'react-router-dom';

export default function NavbarLogo() {
  return (
    <Link to={'/'}>
      <img src={fullLogo} alt={'airbnb-logo'} className={'w-28'} />
    </Link>
  );
}