import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { UserPaginator, SortOrder } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";

type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
  roles: [];
};
const CustomerList = ({ customers, onPagination, onSort, onOrder, roles }: IProps) => {
  const { users, pagination } = customers!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: any | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: any | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );

      onOrder(column);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

 

  const columns = [
    {
      title: t("table:table-item-avatar"),
      dataIndex: "profile_picture",
      key: "profile_picture",
      align: "center",
      width: 74,
      render: (profile_picture: any, record: any) => {
        return(
        <Image
          src={!profile_picture ? siteSettings.avatar.placeholder : profile_picture}
          alt={record?.fullname}
          layout="fixed"
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      )},
    },
    {
      title: "fullname",
      dataIndex: "fullname",
      key: "fullname",
      align: alignLeft,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      align: alignLeft,
    },
    {
      title: "roles",
      dataIndex: "roles",
      key: "roles",
      align: "center",
      render: (roles: any, record: any) => {
        return (
          <div>
            {roles?.map(({ name }: { name: string }) => name).join(", ")}
          </div>
        );
      },
    },
    // {
    //   title: t("table:table-item-available_wallet_points"),
    //   dataIndex: ["wallet", "available_points"],
    //   key: "available_wallet_points",
    //   align: "center",
    // },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-status")}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === "is_active"
          }
          isActive={sortingObj.column === "is_active"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      onHeaderCell: () => onHeaderClick("is_active"),
      render: (is_active: boolean) => (is_active ? "Active" : "Inactive"),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render:  (id: string, { is_active }: any) => {

        return (
          <>
            <ActionButtons
              id={id}
              data={{userId: id, roles }}
              userStatus={true}
              isUserActive={is_active}
              // showAddWalletPoints={true}
              view={true}
              showMakeAdminButton={true}
              suspend={true}
            />
          </>
        );
      },
    },
  ];



  // console.log(users)
  // console.log(pagination)

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          // @ts-ignore
          columns={columns }
          emptyText={t("table:empty-table-data")}
          data={users}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {/* {pagination && !!pagination.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={pagination.total}
            current={pagination.currentPage}
            pageSize={pagination.perPage}
            onChange={onPagination}
          /> 
        </div>
      )} */}
    </>
  );
};

export default CustomerList;
