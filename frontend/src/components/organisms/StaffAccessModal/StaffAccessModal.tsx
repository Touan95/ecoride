import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';

export interface StaffAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
  email: string;
}

export const StaffAccessModal = ({ isOpen, onClose, onValidate, email }: StaffAccessModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <Typography variant="cardTitle">Un utilisateur avec cet adresse email existe déjà</Typography>
        <Typography variant="cardTitleSm">{"Voulez-vous accorder les droits d'accès à cet utilisateur ?"}</Typography>
        <Typography variant="cardTitleSm" align="center" weight="bold">
          {email}
        </Typography>
        <Button onClick={onValidate}>Oui</Button>
        <Button color="secondary" onClick={onClose}>
          Non
        </Button>
      </ContentContainer>
    </BaseModal>
  );
};
