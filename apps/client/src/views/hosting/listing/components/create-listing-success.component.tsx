import partyEmoji from '../../../../assets/emojis/party.svg';
import { Link } from 'react-router-dom';

export default function CreateListingSuccessComponent() {
  return (
    <div
      className={'border-4 border-success border-dashed rounded-xl p-16 bg-green-100 text-success-content flex gap-16 animate-fade-in'}>
      <img src={partyEmoji} alt={'success-emoji'} className={'aspect-square h-32'} />

      <div className="flex flex-col gap-4">
        <h1 className={'font-bold text-3xl text-success-content'}>Hurray! Your listing is now live.</h1>

        <p className={'text-xl text-success-content'}>
          We're excited to welcome guests to your cozy space and share the unique charm. Get ready to start earning and
          creating unforgettable experiences!
        </p>

        <Link className={'btn btn-success max-w-xs'} to={'/hosting/listings'}>View Listings</Link>
      </div>
    </div>
  );
}
