import ProfileAddressGrid from '@/components/profile/profile-address';
import Card from '@/components/ui/cards/card';
import { useTranslation } from 'next-i18next';
import ProfileForm from '@/components/profile/profile-form';
import ProfileContact from '@/components/profile/profile-contact';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import { useUserContext } from '@/contexts/user.context'
import DashboardLayout from '@/layouts/_dashboard';
export { getStaticProps } from '@/framework/general.ssr';

const ProfilePage = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();
  const userContext = useUserContext()
  // console.log('me:', me);
  if (!me) return null;

 const user = JSON.parse(window.localStorage.getItem("user"));
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="w-full px-1 pb-1 overflow-hidden">
        <div className="mb-8">
          <ProfileForm user={{...me, ...user}} />
          <ProfileContact
            userId={me.id}
            profileId={me.profile?.id}
            contact={me.profile?.contact}
            user={user}
          />
        </div>

        <Card className="w-full">
          <ProfileAddressGrid
            userId={me.id}
            //@ts-ignore
            addresses={me.address}
            label={t('text-addresses')}
          />
        </Card>
      </div>
    </>
  );
};

ProfilePage.authenticationRequired = true;

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ProfilePage;
