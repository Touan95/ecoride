import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import { Energy } from '@/interfaces/car';
import { AccountCardField } from '../AccountCardField';
import { getEnergyLabel } from '@/utils/values';
import { TbLeaf } from 'react-icons/tb';
import { Button } from '../Button';

dayjs.locale('fr');
dayjs.extend(duration);

export interface CarCardProps {
  plateNumber: string;
  registrationDate: Date;
  color: string;
  brand: string;
  model: string;
  seats: number;
  energy: Energy;
  onEditClick?: () => void;
  onRemoveClick?: () => void;
  onSelectClick?: () => void;
  isSelected?: boolean;
}

export const CarCard = ({
  plateNumber,
  registrationDate,
  color,
  brand,
  model,
  seats,
  energy,
  isSelected = false,
  onEditClick,
  onRemoveClick,
  onSelectClick
}: CarCardProps) => {
  dayjs.locale('fr');
  dayjs.extend(duration);
  const formattedDate = dayjs(registrationDate).format('DD/MM/YY');
  const isGreen = energy === Energy.ELECTRIC;
  const bgColorClassname = isGreen ? 'bg-primary-300' : 'bg-primary-200';

  return (
    <div
      className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow gap-3', bgColorClassname, isSelected && 'ring-4 ring-secondary-600'])}
    >
      <div className="flex gap-10 md:flex-row flex-col">
        <div className="w-full flex flex-col md:gap-2 gap-4">
          <AccountCardField labelClassname="w-50" smallValue label="Marque">
            {brand}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Modèle">
            {model}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Couleur">
            {color}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Immatriculation">
            {plateNumber}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Date de mise en circulation">
            {formattedDate}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Energie">
            {getEnergyLabel(energy)}
          </AccountCardField>
          <AccountCardField labelClassname="w-50" smallValue label="Place(s) passager">
            {seats.toString()}
          </AccountCardField>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          {onSelectClick && (
            <Button onClick={onSelectClick} disabled={isSelected}>
              Choisir
            </Button>
          )}
          {onEditClick && <Button onClick={onEditClick}>Modifier</Button>}
          {onRemoveClick && (
            <Button color="secondary" onClick={onRemoveClick}>
              Supprimer
            </Button>
          )}
        </div>
      </div>
      {isGreen && (
        <div className="flex gap-2 items-center">
          <TbLeaf size={20} className="text-primary-900" />
          <Typography variant="cardTitleSm" weight="light">
            Ce véhicule sera mis en avant comme étant vert car son énergie est électrique
          </Typography>
        </div>
      )}
    </div>
  );
};
