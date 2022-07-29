import Navbar from "@components/layouts/navigation/top-navbar";
import OwnerInformation from "@components/user/user-details";
import MobileNavigation from "@components/layouts/navigation/mobile-navigation";
import SidebarItem from "@components/layouts/navigation/sidebar-item";
import { siteSettings } from "@settings/site.settings";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { hasAccess } from "@utils/auth-utils";
import { ADMIN } from "@utils/constants";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

const OwnerLayout: React.FC = ({ children, userPermissions }) => {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("Side bar::::::::>", router.query)
  const isAdmin =  userPermissions?.filter(item => item.name.includes(ADMIN)).length
  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => {
        if (!isAdmin && (href === '/shops')) {
          return (
             <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
             )
            } else {
              
              return <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
        }
      })}
    </Fragment>
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <OwnerInformation />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="shadow w-72 xl:w-76 hidden lg:block overflow-y-auto bg-white px-4 fixed start-0 bottom-0 h-full pt-22">
        <div className="flex flex-col space-y-6 py-3">

        {/* {
          ((router.asPath === "/profile-update") || (router.asPath === "/shops/create")) &&
          <OwnerInformation />
        } */}
        <div className=" " style={{ paddingLeft: '30%'}}>
          <SidebarItemMap />
        </div>
        </div>
        </aside>
        <main className="w-full lg:ps-72 xl:ps-76">
          <div className="p-5 md:p-8 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default OwnerLayout;
