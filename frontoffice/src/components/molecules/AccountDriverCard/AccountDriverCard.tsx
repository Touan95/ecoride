import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { AccountCardField } from '../AccountCardField';
import { TbCircleDotFilled, TbSteeringWheel } from 'react-icons/tb';
import { booleanToYesNo } from '@/utils/values';
import { Button } from '../Button';
import { DriverPreferencesFormSchemaType } from '@/schemas/user';

export interface AccountDriverCardProps {
  values: DriverPreferencesFormSchemaType;
  onEditClick?: () => void;
}

export const AccountDriverCard = ({ values, onEditClick }: AccountDriverCardProps) => {
  const Preferences = () => {
    if (values.customRules.length === 0) {
      return (
        <AccountCardField labelClassname="w-54" label="Vous avez des préférences ?">
          Non
        </AccountCardField>
      );
    }

    return (
      <div>
        <Typography variant="cardTitleSm" color="primary">
          Vos préférences personnalisées
        </Typography>
        <ul>
          {values.customRules.map((value, index) => {
            return (
              <li key={index} className="flex gap-2 items-center">
                <TbCircleDotFilled size={10} className="mx-2 text-primary-900" />
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-5 items-center'])}>
      <Typography align="center" variant="cardTitle" color="primary">
        Vos préférences conducteur
      </Typography>
      <TbSteeringWheel size={50} className="text-primary-900" />
      <div className="flex items-center">
        <div className="flex flex-col gap-3">
          <AccountCardField labelClassname="w-54" label="Vous acceptez les fumeurs ?">
            {booleanToYesNo(values.acceptsSmoking)}
          </AccountCardField>
          <AccountCardField labelClassname="w-54" label="Vous acceptez les animaux ?">
            {booleanToYesNo(values.acceptsPets)}
          </AccountCardField>
          {Preferences()}
        </div>
      </div>
      <Button onClick={onEditClick}>Modifier</Button>
    </div>
  );
};
