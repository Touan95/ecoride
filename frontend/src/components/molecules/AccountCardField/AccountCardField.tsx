import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { IconType } from 'react-icons';
import { TbEdit } from 'react-icons/tb';

export interface AccountCardFieldProps {
  label: string;
  children: string | React.ReactNode;
  onEdit?: () => void;
  labelClassname?: string;
  smallValue?: boolean;
  icon?: IconType;
}

export const AccountCardField = ({ icon: Icon, label, children, onEdit, labelClassname, smallValue = false }: AccountCardFieldProps) => {
  const childrenComponent = (): React.ReactNode => {
    if (typeof children === 'string') {
      return (
        <Typography variant="paragraph" weight={smallValue ? 'light' : undefined} color="primary">
          {children}
        </Typography>
      );
    }
    return children;
  };
  return (
    <div className="flex md:h-7 md:gap-5 gap-1 items-center content-center justify-between md:flex-row flex-col">
      <div className="flex gap-2 relative md:flex-row flex-col items-center">
        {Icon && <Icon size={30} className="text-primary-900 md:absolute md:-left-10" />}
        <Typography variant="cardTitleSm" color="primary" customClassName={clsxm(labelClassname, 'md:text-left text-center')} ellipsis>
          {label}
        </Typography>
      </div>
      <div className="flex gap-1.5 items-center">
        {childrenComponent()}
        {onEdit && (
          <button className="flex justify-center items-center w-5 md:w-auto" onClick={onEdit} type="button" aria-label="Modifier">
            <TbEdit className="text-primary-900 cursor-pointer" size={30} />
          </button>
        )}
      </div>
    </div>
  );
};
