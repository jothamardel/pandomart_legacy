import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import CustomerList from "@components/user/user-list";
import LinkButton from "@components/ui/link-button";
import { useEffect, useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useUsersQuery } from "@data/user/use-users.query";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import Select from "@components/ui/select/select";
import Button from "@components/ui/button";
import { useGetRoles } from "@data/user/use-add-staff.mutation";




export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected_role, setSelectedRole] = useState("625c7ba9c4c1b16967dd8309");
  const [selected_status, setSelectedStatus] = useState("true");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
    refetch
  } = useUsersQuery({
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
    is_active: Boolean(selected_status), 
    role: selected_role
  });

  const { data: roles} = useGetRoles();

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }

  function runFilter() {
    console.log("Refetching.....")
    refetch();
  }

  


  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("Vendors")}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex items-center ms-auto">
          {/* <Search onSearch={handleSearch} /> */}
          {/* <LinkButton
            href={`${ROUTES.USERS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span>+ {t("form:button-label-add-customer")}</span>
          </LinkButton> */}
          <select defaultValue={selected_role} onChange={e => setSelectedRole(e.currentTarget.value)} className="border border-border-base mr-4 focus:border-accent px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0">
            <option>Select role</option>
            {
              roles?.data.data.map((item: { name: string; _id: string; }) => (
                <option key={item._id} value={item._id}>{item.name}</option>
              ))
            }
          </select>
          <select defaultValue={selected_status} onChange={e => setSelectedStatus(e.currentTarget.value)} className=" border border-border-base mr-4 focus:border-accent px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0">
            <option>Select status</option>
            <option value={"true"}>Active</option>
            <option value={""}>Inactive</option>
          </select>
          <Button onClick={runFilter}>Filter</Button>
        </div>
      </Card>

      {loading ? null : (
        <CustomerList
          customers={data.data}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
          roles={roles?.data.data}
        />
      )}
    </>
  );
}

Customers.authenticate = {
  permissions: adminOnly,
};
Customers.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {


  return ({
    props: {
      ...(await serverSideTranslations(locale, ["table", "common", "form"])),
    },
  })
};
