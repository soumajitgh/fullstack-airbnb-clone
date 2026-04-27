import { User } from '../../../../types/user/user.type.ts';
import avatarSVG from '../../../../assets/images/avatar.svg';

const ListingHostCard = ({ host }: { host: User }) => {
  return (
    <div className={'flex gap-4'}>
      <img className={'h-14 aspect-square'} src={avatarSVG} />
      <div className={''}>
        <h4 className={'font-semibold text-xl'}>Hosted by {host.email.split('@')[0]}</h4>
        <p className={'text-gray-500'}>{host.email}</p>
      </div>
    </div>

  );
};

export default ListingHostCard;