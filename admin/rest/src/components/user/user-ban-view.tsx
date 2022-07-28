import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useBlockUserMutation } from "@data/user/use-user-block.mutation";
import { useUnblockUserMutation } from "@data/user/use-user-unblock.mutation";
import { BanUser } from "@components/icons/ban-user"
import { useState } from "react";
import { toast } from "react-toastify";


const CustomerBanView = () => {
  const [blockStatus, setBlockStatus] = useState('')

  const { mutate: blockUser, isLoading: loading } = useBlockUserMutation();
  const { mutate: unblockUser, isLoading: activeLoading } =
    useUnblockUserMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();

  async function handleDelete() {
    if (!blockStatus) return toast.info("Select block status");
    blockUser(data.id);
    // if (data?.type === "ban") {
    //   blockUser(data?.id);
    // } else {
    //   unblockUser(data?.id);
    // }
    closeModal();
  }
  
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnText={data?.type === "ban" ? "Block" : "Unblock"}
      title={data?.type === "ban" ? "Block Customer" : "Unblock Customer"}
      description="Are you sure you want to block this customer?"
      deleteBtnLoading={loading || activeLoading}
      icon={<BanUser width={80} color="red"/>}
      blockOptions={[
        { name: "Block user", status: true},
        { name: "Unblock user", status: false},
      ]}
      setBlockStatus={setBlockStatus}
    />
  );
};

export default CustomerBanView;
