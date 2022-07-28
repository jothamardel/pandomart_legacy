import TrashIcon from "@components/icons/trash";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import cn from "classnames";

type ConfirmationCardProps = {
  onCancel: () => void;
  onDelete: () => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  deleteBtnClassName?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  cancelBtnLoading?: boolean;
  deleteBtnLoading?: boolean;
  roles?:[];
  setRoleId?: (e: any) => void;
  blockOptions?:object[];
  setBlockStatus?: (e: any) => void;
};

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  onCancel,
  onDelete,
  icon,
  title = "button-delete",
  description = "delete-item-confirm",
  cancelBtnText = "button-cancel",
  deleteBtnText = "button-delete",
  cancelBtnClassName,
  deleteBtnClassName,
  cancelBtnLoading,
  deleteBtnLoading,
  roles,
  setRoleId = () => {},
  blockOptions,
  setBlockStatus = (item: string) => {}
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="p-4 pb-6 bg-light m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-center">
            {icon ? (
              icon
            ) : (
              <TrashIcon className="mt-4 w-12 h-12 m-auto text-accent" />
            )}
          </div>
          <p className="text-heading text-xl font-bold mt-4">{t(title)}</p>
          <p className="text-body-dark dark:text-muted leading-relaxed py-2 px-6">
            {t(description)}
          </p>
          {
            roles?.length && 
            <select onChange={e => setRoleId(e.currentTarget.value)} className=" border border-border-base mr-4 focus:border-accent px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0">
              <option>Select role</option>
                {
                  roles?.map((item: {name: string; _id: string;} )=> (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                }
              </select>
          }
          {
            blockOptions?.length && 
            <select onChange={e => setBlockStatus(e.currentTarget.value)} className=" border border-border-base mr-4 focus:border-accent px-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0">
              <option>Select role</option>
                {
                  blockOptions?.map((item: any, idx )=> (
                    <option key={idx.toString()} value={`${item.status}`}>{item.name}</option>
                  ))
                }
              </select>
          }
          <div className="flex items-center justify-between space-s-4 w-full mt-8">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  "w-full py-2 px-4 bg-accent focus:outline-none hover:bg-accent-hover focus:bg-accent-hover text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  cancelBtnClassName
                )}
              >
                {t(cancelBtnText)}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={onDelete}
                loading={deleteBtnLoading}
                disabled={deleteBtnLoading}
                variant="custom"
                className={cn(
                  "w-full py-2 px-4 bg-red-600 focus:outline-none hover:bg-red-700 focus:bg-red-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md",
                  deleteBtnClassName
                )}
              >
                {t(deleteBtnText)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
