import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';

export interface ConfirmCarDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
}

export const ConfirmCarDeletionModal = ({ isOpen, onClose, onValidate }: ConfirmCarDeletionModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <Typography variant="cardTitleSm">Êtes-vous sur de vouloir supprimer ce véhicule ?</Typography>
        <div className="flex flex-row gap-5 justify-center">
          <Button onClick={onClose} className="w-30" color="secondary">
            Annuler
          </Button>
          <Button onClick={onValidate} className="w-30">
            Valider
          </Button>
        </div>
      </ContentContainer>
    </BaseModal>
  );
};
