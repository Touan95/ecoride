import { Typography } from '@/components/atoms/Typography';
import 'dayjs/locale/fr';
import { TbEdit } from 'react-icons/tb';

export interface AccountCardFieldProps {
  label: string,
  children: string | React.ReactNode,
  onEdit?: () => void
  labelWidthClasname?: `w-${number}`
}

export const AccountCardField = ({label, children, onEdit, labelWidthClasname= 'w-30'} : AccountCardFieldProps) => {
  const childrenComponent = ():React.ReactNode => {
    if (typeof children === 'string') {
      return (
        <Typography variant="cardTitleSm" color="primary">
          {children}
        </Typography>
      )
    }
    return children
  } 

  return (
    <div className='flex h-7 gap-5 items-center content-center'>
      <Typography variant="cardTitleSm" color="primary" customClassName={labelWidthClasname}>
          {label}
      </Typography>
      <div className='flex gap-1.5 items-center'>
        <div className='flex justify-center items-center w-5'>
        {onEdit && <TbEdit className='text-primary-900 cursor-pointer' size={30} onClick={onEdit}/>}
        </div>
        {childrenComponent()}
      </div>
    </div>
  )
}
