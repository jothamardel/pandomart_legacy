import { useEffect } from "react";
import Loader from "@components/ui/loader/loader";
import { useLogoutMutation } from "@data/user/use-logout.mutation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAuthCredentials } from "@utils/auth-utils";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";

function SignOut() {
  const { t } = useTranslation();
  const { mutate: logout } = useLogoutMutation();
  const router = useRouter()

  useEffect(() => {
    logout();
  }, []);

  // if (!getAuthCredentials().token) return router.push(ROUTES.LOGIN);
  // router.replace(ROUTES.LOGIN);
  return <Loader text={t("common:signing-out-text")} />;
}

export default SignOut;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
