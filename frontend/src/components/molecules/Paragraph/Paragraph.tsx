import { Typography } from '@/components/atoms/Typography';

interface ParagraphProps {
  title: string;
  children: React.ReactNode;
}

export const Paragraph = ({ title, children }: ParagraphProps) => {
  const childrenContent =
    typeof children === 'string' ? (
      <Typography align="center" variant="paragraph" color="primary">
        {children}
      </Typography>
    ) : (
      children
    );
  return (
    <div className="flex flex-col gap-5">
      <Typography align="center" variant="h3" color="primary" weight="bold">
        {title}
      </Typography>
      {childrenContent}
    </div>
  );
};
