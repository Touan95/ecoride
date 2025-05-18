import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useState } from 'react';
import { ROUTES } from '@/configs/routes';
import { Button } from '@/components/molecules/Button';
export interface AcceptTermsModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onValidate: () => void;
  isInvitationPending?: boolean;
}

export const AcceptTermsModal = ({ isOpen, onCancel, onValidate, isInvitationPending = false }: AcceptTermsModalProps) => {
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const title = isInvitationPending ? 'Bienvenue dans l’équipe EcoRide' : "Vous n'avez pas encore accepté les conditions d'utilisation";
  const message = isInvitationPending
    ? 'Vous avez été invité à rejoindre l’espace staff de la plateforme. Avant d’accéder à votre tableau de bord, nous vous demandons de lire et accepter les Conditions Générales d’Utilisation ainsi que la Politique de confidentialité.'
    : 'Pour continuer à utiliser la plateforme EcoRide, vous devez accepter les Conditions Générales d’Utilisation et la Politique de confidentialité.';

  const handleCheckboxChange = (checked: boolean) => {
    setPrivacyChecked(checked);
  };
  return (
    <BaseModal isOpen={isOpen}>
      <ContentContainer>
        <Typography variant="title">{title}</Typography>
        <Typography variant="cardTitleSm">{message}</Typography>
        <div className="h-10 items-center flex gap-4">
          <Checkbox
            id="terms-checkbox"
            aria-label="Accepter la politique de confidentialité"
            onCheckedChange={handleCheckboxChange}
            checked={privacyChecked}
          />
          <Typography variant="small" htmlFor="terms-checkbox">
            J&apos;ai lu et j&apos;accepte les{' '}
            <Link href={ROUTES.TERMS_OF_USE} className="underline" target="_blank">
              Conditions Générales d&apos;Utilisation
            </Link>{' '}
            et la{' '}
            <Link href={ROUTES.PRIVACY_POLICY} className="underline" target="_blank">
              politique de confidentialité
            </Link>
            .
          </Typography>
        </div>
        <Button onClick={onValidate} color="primary" disabled={!privacyChecked}>
          Valider
        </Button>
        <Button onClick={onCancel} color="secondary">
          Se déconnecter
        </Button>
      </ContentContainer>
    </BaseModal>
  );
};
