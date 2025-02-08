import clsxm from '@/utils/clsxm';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  maxWidthClassname?: `max-w-${string}`;
}

export default function SectionContainer({
  children,
  className = 'p-4',
  fluid = false,
  maxWidthClassname = 'max-w-5xl'
}: SectionContainerProps) {
  const containerClassname = 'w-full flex px-10';
  if (fluid) {
    return (
      <div className={clsxm(['flex flex-col items-center', containerClassname, className])}>
        <div className={clsxm(['w-full', maxWidthClassname])}>{children}</div>
      </div>
    );
  }
  return <div className={clsxm([containerClassname, maxWidthClassname, className])}>{children}</div>;
}
