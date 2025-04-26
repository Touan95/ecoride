import { Header } from '@/components/molecules/Header';
import { FlowSection } from '@/components/organisms/FlowSection/FlowSection';
import { IntroSection } from '@/components/organisms/IntroSection';
import { ValuesSection } from '@/components/organisms/ValuesSection';

export default function Home() {
  return (
    <>
      <Header />
      <IntroSection />
      <ValuesSection />
      <FlowSection />
    </>
  );
}
