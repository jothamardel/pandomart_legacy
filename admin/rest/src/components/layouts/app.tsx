import { ADMIN, SUPER_ADMIN } from "@utils/constants";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("@components/layouts/admin"));
const OwnerLayout = dynamic(() => import("@components/layouts/owner"));

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: object[];
}) {
  if (userPermissions?.filter(item => (item.name.includes(ADMIN))).length > 0) {
    return <AdminLayout {...props} userPermissions={userPermissions}/>;
  }
  return <OwnerLayout {...props} userPermissions={userPermissions}/>;
}
