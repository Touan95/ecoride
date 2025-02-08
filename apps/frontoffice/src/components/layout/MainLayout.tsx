import { Footer } from '@/components/organisms/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-primary-100">
      {children}
      <Footer />
    </div>
  );
}
