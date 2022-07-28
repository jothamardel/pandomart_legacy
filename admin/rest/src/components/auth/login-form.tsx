import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useLoginMutation, useVendorLoginMutation } from "@data/user/use-login.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@components/ui/link";
import { allowedRoles, hasAccess, setAuthCredentials,setUserCredentials, getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import Checkbox from "@components/ui/checkbox/checkbox";
import Radio from "@components/ui/radio/radio";
import SwitchInput from "@components/ui/switch-input";
import { toast } from "react-toastify";


type FormValues = {
  email: string;
  password: string;
  id?: string;
};
const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    // .email("form:error-email-format")
    .required("form:error-email-required"),
  password: yup.string().required("form:error-password-required"),
});
const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = (props: any) => {
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const { mutate: loginVendor,  } = useVendorLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const { t } = useTranslation();
  // const { token, permissions } = getAuthCredentials();
  
  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });
  
  const router = useRouter();
  // if (isAuthenticated({ token, permissions })) {
  //   router.replace(ROUTES.DASHBOARD);
  // }

  function onSubmit({ email, password }: FormValues) {
    console.log(isAdmin)
    if (isAdmin){
      login(
        {
          variables: {
            id: email,
            password,
          },
        },
        {
          onSuccess: ({ data: res }) => {
            // toast.success(data.message);
            console.log(res)
            props.setPage('loginOtp');
            // const { data } = res;
            // let token = data.token.split(' ')[1];
            if ("data?.token") {
              // if (hasAccess(data?.user.roles)) {
              //   setAuthCredentials(token, data?.user.roles);
              //   setUserCredentials(data.user);
              //   // router.push(ROUTES.DASHBOARD);
              //   return;
              // }
              // setErrorMsg("form:error-enough-permission");
            } else {
              }
            },
            onError: (err) => {
              setErrorMsg("form:error-credential-wrong");
              setErrorMsg(err.response.data.message);
              console.log(err.response)
          },
        }
      );
      return;
    }

    loginVendor(
      {
        variables: {
          id: email,
          password,
        },
      },
      {
        onSuccess: ({ data: res }) => {
          const { data } = res;
          let token = data.token.split(' ')[1];
          if (data?.token) {
            if (hasAccess(data?.user.roles)) {
              console.log(data)
              setAuthCredentials(token, data?.user.roles);
              setUserCredentials(data.user);
              router.push(ROUTES.SHOPS);
              return;
            }
            console.log("Has role: ", hasAccess(data?.user.roles))
            setErrorMsg("form:error-enough-permission");
          } else {
            }
          },
          onError: (err: any) => {
            setErrorMsg("form:error-credential-wrong");
            console.log(err.response)
        },
      }
    )

  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {errorMsg ? (
            <Alert
              message={t(errorMsg)}
              variant="error"
              closeable={true}
              className="mt-5 mb-4"
              onClose={() => setErrorMsg("")}
            />
          ) : null}
        <Input
          label={t("form:input-label-email")}
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t("form:input-label-password")}
          forgotPassHelpText={t("form:input-forgot-password-label")}
          {...register("password")}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          forgotPageLink="/forgot-password"
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t("form:button-label-login")}
        </Button>

        <div className="mt-4 flex items-center">
          <Checkbox name="isAdmin" label="login as super admin" onChange={e => setIsAdmin(e.target.checked)}/>
        </div>


        <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
          <hr className="w-full" />
          <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
            {t("common:text-or")}
          </span>
        </div>

        <div className="text-sm sm:text-base text-body text-center">
          {t("form:text-no-account")}{" "}
          <Link
            href="/register"
            className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
          >
            {t("form:link-register-shop-owner")}
          </Link>
        </div>

        
      </form>
    </>
  );
};

export default LoginForm;
