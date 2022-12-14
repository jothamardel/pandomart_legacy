import Navbar from "@components/layouts/navigation/top-navbar";
import { Fragment } from "react";
import MobileNavigation from "@components/layouts/navigation/mobile-navigation";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import SidebarItem from "@components/layouts/navigation/sidebar-item";
import { ADMIN } from "@utils/constants";
import { getUserCredentials } from "@utils/auth-utils";
import { useRouter } from "next/router";


const AdminLayout: React.FC = ({ children, userPermissions }) => {
  const { t } = useTranslation();
  const { user } = getUserCredentials();
  const router = useRouter();
  
  const isAdmin =  user.roles?.filter(item => item.name.includes(ADMIN)).length
  
  const SidebarItemMap = () => (
    <Fragment>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => {
        console.log("Side bar::::::::>", router.query)
        if (!isAdmin && (href === '/shops')) {
          return (
             <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
             )
            } 
        if (isAdmin > 0) {
          return  <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
        }
          
      })}
    </Fragment>
  );

  // const SidebarItemMap = () => (
  //   <Fragment>
  //     {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
  //       <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
  //     ))}
  //   </Fragment>
  // );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-colors duration-150">
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="shadow w-72 xl:w-76 hidden lg:block overflow-y-auto bg-white px-4 fixed start-0 bottom-0 h-full pt-22">
          <div className="flex flex-col space-y-6 py-3">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="w-full lg:ps-72 xl:ps-76">
          <div className="p-5 md:p-8 h-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
