import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { CarDetailsForm } from '../CarDetailsForm';
import { Car } from '@/interfaces/car';

export interface CarDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
  userId?: string;
  car?: Car;
}

export const CarDetailsModal = ({ isOpen, onClose, car, onValidate, userId }: CarDetailsModalProps) => {
  const onValidateClick = () => {
    onValidate();
    onClose();
  };
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <div>
          <CarDetailsForm />
        </div>
      </ContentContainer>
    </BaseModal>
  );
};
