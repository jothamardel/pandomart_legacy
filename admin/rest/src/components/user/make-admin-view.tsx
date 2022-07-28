import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useMakeOrRevokeAdminMutation } from "@data/user/use-make-revoke-admin-mutation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AdminIcon } from "@components/icons/admin-icon"
import { UserIcon } from "@components/icons/user-icon"

const CustomerBanView = () => {
  const [roleId, setRoleId] = useState('')
  const { mutate: makeOrRevokeAdmin, isLoading: loading } =
    useMakeOrRevokeAdminMutation();
  const  { data } = useModalState();
  console.log(data)

  const { closeModal } = useModalAction();
  async function handleMakeAdmin() {
    if (!roleId) return toast.info('Please select user role.')
    makeOrRevokeAdmin({ userId: data?.userId, roleId});
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleMakeAdmin}
      deleteBtnText="text-yes"
      title="text-make-admin"
      description="text-description-make-admin"
      deleteBtnLoading={loading}
      roles={data.roles}
      setRoleId={setRoleId}
      icon={<UserIcon width={200} color="rgb(0, 159, 127)"/>}
    />
  );
};

export default CustomerBanView;
