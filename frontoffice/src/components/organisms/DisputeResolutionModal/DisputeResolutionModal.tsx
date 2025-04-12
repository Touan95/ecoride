import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { DisputeResolutionForm } from '../DisputeResolutionForm';
import { DisputeResolutionActionFormSchemaType } from '@/schemas/user';

export interface DisputeResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: (params: DisputeResolutionActionFormSchemaType) => void;
}

export const DisputeResolutionModal = ({ isOpen, onClose, onValidate }: DisputeResolutionModalProps) => {
  const onValidateClick = (params: DisputeResolutionActionFormSchemaType) => {
    onValidate(params);
    onClose();
  };
  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <DisputeResolutionForm onSubmit={onValidateClick} />
      </ContentContainer>
    </BaseModal>
  );
};
