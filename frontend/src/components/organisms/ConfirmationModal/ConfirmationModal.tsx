import { BaseModal } from '@/components/molecules/BaseModal';
import { ContentContainer } from '@/components/molecules/BaseModal/ContentContainer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/molecules/Button';

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate: () => void;
  onCancel?: () => void;
  title: string;
  content?: string | React.ReactNode;
  validateLabel?: string;
  cancelLabel?: string;
}

const getContentElement = (content: string | React.ReactNode) => {
  if (typeof content === 'string') {
    return (
      <Typography variant="cardTitleSm" align="center">
        {content}
      </Typography>
    );
  }
  return content;
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  content,
  onValidate,
  onCancel,
  title,
  validateLabel = 'Confirmer',
  cancelLabel = 'Annuler'
}: ConfirmationModalProps) => {
  const contentElement = getContentElement(content);

  return (
    <BaseModal isOpen={isOpen} onCloseClick={onClose}>
      <ContentContainer>
        <div>
          <Typography variant="cardTitle" tag="p" customClassName="mb-5" align="center">
            {title}
          </Typography>
          {content && <div className="my-10">{contentElement}</div>}
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-center">
          <Button onClick={onValidate} className="md:min-w-32">
            {validateLabel}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} color="secondary" className="md:min-w-32">
              {cancelLabel}
            </Button>
          )}
        </div>
      </ContentContainer>
    </BaseModal>
  );
};
