import { Typography } from '@/components/atoms/Typography';
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
        <Typography variant={'cardTitleSm'} weight={smallValue ? 'light' : undefined} color="primary">
          {children}
        </Typography>
      );
    }
    return children;
  };
  return (
    <div className="flex h-7 gap-5 items-center content-center justify-between">
      <div className="flex gap-2 relative">
        {Icon && <Icon size={30} className="text-primary-900 absolute -left-10" />}
        <Typography variant="cardTitleSm" color="primary" customClassName={labelClassname} ellipsis>
          {label}
        </Typography>
      </div>
      <div className="flex gap-1.5 items-center">
        <div className="flex justify-center items-center w-5">
          {onEdit && <TbEdit className="text-primary-900 cursor-pointer" size={30} onClick={onEdit} />}
        </div>
        {childrenComponent()}
      </div>
    </div>
  );
};
