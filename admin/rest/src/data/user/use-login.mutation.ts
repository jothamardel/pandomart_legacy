import { LoginInput, LoginOtpInput } from "@ts-types/generated";
import { useMutation } from "react-query";
import User from "@repositories/user";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export interface ILoginVariables {
  variables: LoginInput;
}
export interface ILoginOtpVariables {
  variables?: LoginOtpInput;
}

export const useLoginMutation = () => {
  return useMutation(({ variables }: ILoginVariables) =>
    User.login(API_ENDPOINTS.TOKEN, variables)
  );
};

export const useVendorLoginMutation = () => {
  return useMutation(({ variables }: ILoginVariables) =>
    User.loginVendor(API_ENDPOINTS.TOKEN, variables)
  );
};


export const useLoginOTPMutation = () => {
  return useMutation(({ variables }: ILoginOtpVariables) =>
    User.loginOtp(API_ENDPOINTS.TOKEN, variables)
  );
};


