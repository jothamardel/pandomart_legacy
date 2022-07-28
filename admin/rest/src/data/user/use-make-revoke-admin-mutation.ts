import { MakeAdminInput } from "@ts-types/generated";
import User from "@repositories/user";
import { useMutation, useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

export interface IMakeAdminVariables {
  userId: String;
  roleId: string
}

export const useMakeOrRevokeAdminMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ userId, roleId }: IMakeAdminVariables) =>
      User.makeAdmin(`https://pandomart-bazaar.herokuapp.com/api/v1/user/${userId}/update-role`, { roleId }),
    {
      onSuccess: ({ data }) => {
        // toast.success(t("common:successfully-updated"));
        toast.success(`${data?.status} ${data?.message.toLowerCase()}`);
      },
      // Always refetch after error or success:
      onError: ({response}) => {
        toast.error(`${response?.data.status} ${response?.data.message.toLowerCase()}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
      },
    }
  );
};
