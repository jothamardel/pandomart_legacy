import { useMutation, useQueryClient } from "react-query";
import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { toast } from "react-toastify";

export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (userId: string) => User.block(`https://pandomart-bazaar.herokuapp.com/api/v1/user/${userId}/suspend`, {}),
    {
      // Always refetch after error or success:
      onSuccess: ({data}) => {
        console.log(data);
        toast.success(`${data.message}`)
      },
      onError: (err: {}) => {
        console.log(err?.response.data)
        toast.error(`${err.response.data.message}`)
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.USERS);
        queryClient.invalidateQueries(API_ENDPOINTS.STAFFS);
      },
    }
  );
};
