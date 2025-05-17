import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import 'dayjs/locale/fr';
import { TbCar } from 'react-icons/tb';
import { CarCard } from '../CarCard';
import { Car } from '@/interfaces/car';
import { Button } from '../Button';

export interface AccountCarsCardProps {
  cars: Car[];
  onAddCar: () => void;
  onEditCar?: (carId: string) => void;
  onRemoveCar?: (carId: string) => void;
  onSelectCar?: (carId: string) => void;
  selectedCarIds?: string[];
  error?: string;
}

export const AccountCarsCard = ({ cars, onAddCar, onEditCar, onRemoveCar, onSelectCar, selectedCarIds, error }: AccountCarsCardProps) => {
  const handleEditCar = (carId: string) => () => {
    if (onEditCar) {
      onEditCar(carId);
    }
  };
  const handleRemoveCar = (carId: string) => () => {
    if (onRemoveCar) {
      onRemoveCar(carId);
    }
  };
  const handleSelectCar = (carId: string) => () => {
    if (onSelectCar) {
      onSelectCar(carId);
    }
  };
  const List = () => {
    if (cars.length > 0) {
      return cars.map((car) => {
        return (
          <CarCard
            key={car.id}
            {...car}
            onEditClick={onEditCar ? handleEditCar(car.id) : undefined}
            onRemoveClick={onRemoveCar ? handleRemoveCar(car.id) : undefined}
            onSelectClick={onSelectCar ? handleSelectCar(car.id) : undefined}
            isSelected={selectedCarIds?.includes(car.id)}
          />
        );
      });
    }
    return (
      <div className="py-20">
        <Typography align="center" variant="cardTitle">
          {"Vous n'avez pas encore de véhicules"}
        </Typography>
      </div>
    );
  };

  return (
    <div className={clsxm(['w-full rounded-xl flex flex-col p-5 shadow bg-primary-50 gap-5 items-center'])}>
      <div className="flex relative justify-center items-center w-full md:flex-row flex-col">
        <Typography align="center" variant="cardTitle" color="primary">
          Vos véhicules
        </Typography>
        <Button className="md:absolute md:right-0 w-40 md:w-auto md:mt-0 mt-4" onClick={onAddCar}>
          Ajouter
        </Button>
      </div>
      <TbCar size={50} className="text-primary-900 md:flex hidden" />
      <div className="w-full flex flex-col gap-4">
        <>
          <div className="h-4">
            {error && (
              <Typography variant="extraSmall" color="red">
                {error}
              </Typography>
            )}
          </div>
          {List()}
        </>
      </div>
      <Typography variant="extraSmall" customClassName="w-full">
        Ces informations sont utilisées pour proposer des trajets aux autres utilisateurs. Elles ne seront jamais partagées en dehors de la
        plateforme.
      </Typography>
    </div>
  );
};
