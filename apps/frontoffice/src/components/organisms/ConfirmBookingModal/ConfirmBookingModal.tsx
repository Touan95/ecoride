import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';

export interface ConfirmBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  onValidate: () => void;
}

export const ConfirmBookingModal = ({ isOpen, onClose, price, onValidate }: ConfirmBookingModalProps) => {
  const onValidateClick = () => {
    onValidate();
    onClose();
  };
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <div>
          <Typography variant="cardTitle" tag="p" customClassName="mb-5">
            Nouvelle réservation
          </Typography>
          <Typography variant="cardTitleSm">Souhaitez-vous confirmer votre réservation?</Typography>
          <Typography variant="small">{`Après confirmation, vous serez débité de ${price} crédits`}</Typography>
        </div>
        <Button onClick={onValidateClick}>Confirmer</Button>
      </ContentContainer>
    </BaseModal>
  );
};
