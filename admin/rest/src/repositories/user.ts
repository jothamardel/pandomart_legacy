import {
  UpdateUser,
  CreateUser,
  LoginInput,
  RegisterInput,
  ChangePasswordInput,
  ForgetPasswordInput,
  VerifyForgetPasswordTokenInput,
  ResetPasswordInput,
  MakeAdminInput,
  LoginOtpInput,
  GetRoles
} from "@ts-types/generated";
import http from "@utils/api/http";
import Base from "./base";

class User extends Base<CreateUser, UpdateUser> {
  me = async (url: string) => {
    return this.http(url, "get");
  };

  login = async (url: string, variables: LoginInput) => {
    // return this.http<LoginInput>(url, "post", variables);
    return this.http<LoginInput>('https://pandomart-bazaar.herokuapp.com/api/v1/auth/admin/login', "post", variables);
  };

  loginVendor = async (url: string, variables: LoginInput) => {
    // return this.http<LoginInput>(url, "post", variables);
    return this.http<LoginInput>('https://pandomart-bazaar.herokuapp.com/api/v1/auth/login', "post", variables);
  };

  loginOtp = async (url: string, variables: LoginOtpInput) => {
    return this.http<LoginInput>(`https://pandomart-bazaar.herokuapp.com/api/v1/auth/verify-admin/${variables.token}`, "get");
  };

  logout = async (url: string) => {
    return http.post(url);
  };

  register = async (url: string, variables: RegisterInput) => {
    return this.http<RegisterInput>(url, "post", variables);
  };

  changePassword = async (url: string, variables: ChangePasswordInput) => {
    return this.http<ChangePasswordInput>(url, "post", variables);
  };

  forgetPassword = async (url: string, variables: ForgetPasswordInput) => {
    return this.http<ForgetPasswordInput>(url, "post", variables);
  };

  verifyForgetPasswordToken = async (
    url: string,
    variables: VerifyForgetPasswordTokenInput
  ) => {
    return this.http<VerifyForgetPasswordTokenInput>(url, "post", variables);
  };

  resetPassword = async (url: string, variables: ResetPasswordInput) => {
    return this.http<ResetPasswordInput>(url, "post", variables);
  };

  getRoles = async () => {
    return this.http<GetRoles>('https://pandomart-bazaar.herokuapp.com/api/v1/role/list', "get");
  };
  makeAdmin = async (url: string, variables: MakeAdminInput) => {
    return this.http<MakeAdminInput>(url, "put", variables);
  };

  block = async (url: string, variables?: any) => {
    return this.http<{ id: number }>(url, "put", variables);
  };

  unblock = async (url: string, variables: { id: number }) => {
    return this.http<{ id: number }>(url, "post", variables);
  };
  addWalletPoints = async (
    url: string,
    variables: { customer_id: string; points: number }
  ) => {
    return this.http<{ customer_id: string; points: number }>(
      url,
      "post",
      variables
    );
  };
}

export default new User();
