import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { ROUTES } from '@/configs/routes';
import { useState } from 'react';

export interface ConfirmBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  onValidate: (emailShareAccepted: boolean) => void;
}

export const ConfirmBookingModal = ({ isOpen, onClose, price, onValidate }: ConfirmBookingModalProps) => {
  const [emailShareAccepted, setEmailShareAccepted] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setEmailShareAccepted(checked);
  };

  const onValidateClick = () => {
    onValidate(emailShareAccepted);
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
        <div className="h-10 items-center flex gap-4 mt-20">
          <Checkbox
            id="privacy-checkbox"
            aria-label="Accepter la politique de confidentialité"
            onCheckedChange={handleCheckboxChange}
            checked={emailShareAccepted}
          />
          <Typography variant="small" htmlFor="privacy-checkbox">
            J&apos;accepte que mon adresse e-mail soit transmise au conducteur pour organiser ce trajet. Voir la{' '}
            <Link href={ROUTES.PRIVACY_POLICY} className="underline" target="_blank">
              politique de confidentialité
            </Link>
          </Typography>
        </div>
        <Button onClick={onValidateClick} disabled={!emailShareAccepted}>
          Confirmer
        </Button>
      </ContentContainer>
    </BaseModal>
  );
};
