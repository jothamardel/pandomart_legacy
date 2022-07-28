import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useLoginOTPMutation } from "@data/user/use-login.mutation";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@components/ui/link";
import { allowedRoles, hasAccess, setAuthCredentials, setUserCredentials } from "@utils/auth-utils";


type FormValues = {
  token: string;
};
const loginFormSchema = yup.object().shape({
  token: yup
    .string()
    .required("Please enter token"),
});
const defaultValues = {
  token: ""
};

const LoginOtpForm = () => {
  const { mutate: loginOtp, isLoading: loading } = useLoginOTPMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });
  const router = useRouter();

  function onSubmit({ token }: FormValues) {
    loginOtp(
      {
        variables: {
          token
        },
      },
      {
        onSuccess: ({ data: res }) => {
        
          const { data } = res;
          let token = data.token.split(' ')[1];
          if (data?.token) {
            if (hasAccess(data?.user.roles)) {
              setAuthCredentials(token, data?.user.roles);
              setUserCredentials(data.user);
              router.push(ROUTES.DASHBOARD);
              return;
            }
            setErrorMsg("form:error-enough-permission");
          } else {
            }
          },
          onError: (err) => {
            setErrorMsg("form:error-credential-wrong");
            console.log(err.response)
        },
      }
    );
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
          label={t("Enter token")}
          {...register("token")}
          variant="outline"
          className="mb-4"
          error={t(errors?.token?.message!)}
        />
        <Button className="w-full" loading={loading} disabled={loading}>
          {t("confirm")}
        </Button>

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

export default LoginOtpForm;
