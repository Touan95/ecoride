import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { CarDetailsForm } from '../CarDetailsForm';
import { Car } from '@/interfaces/car';
import { AddCarParams } from '@/api/lib/user';

export interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: Omit<AddCarParams, 'userId'>) => void;
  car?: Car;
}

export const CarDetailsModal = ({ isOpen, onClose, car, onSubmit }: CarDetailsModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <CarDetailsForm onSubmit={onSubmit} initialValues={car} editMode={!!car} />
      </ContentContainer>
    </BaseModal>
  );
};
