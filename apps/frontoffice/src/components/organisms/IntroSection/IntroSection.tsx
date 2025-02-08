import SectionContainer from '@/components/layout/SectionContainer';
import { Paragraph } from '@/components/molecules/Paragraph';
import { SectionTitle } from '@/components/molecules/SectionTitle';

export const IntroSection = () => {
  return (
    <SectionContainer className="justify-center py-10">
      <div className="flex flex-col gap-10">
        <SectionTitle weight="extrabold">EcoRide</SectionTitle>
        <div className="sm:grid sm:grid-cols-2 gap-10 sm:flex-none flex flex-col">
          <img src={'assets/driver.webp'} alt={''} className="h-full w-full object-cover rounded-xl shadow-2xl" />
          <img src={'assets/passenger.webp'} alt={''} className="h-full w-full object-cover rounded-xl shadow-2xl" />
        </div>
        <Paragraph title="Le covoiturage responsable et accessible à tous">
          Chez EcoRide, nous croyons en une mobilité plus intelligente, plus économique et plus respectueuse de l’environnement. Notre
          mission est simple : faciliter la mise en relation entre conducteurs et passagers pour optimiser les trajets, réduire les coûts et
          limiter l’impact écologique des déplacements quotidiens.
        </Paragraph>
        <div className="sm:grid sm:grid-cols-2 gap-10 sm:flex-none flex flex-col">
          <img src={'assets/team.webp'} alt={''} className="h-full w-full object-cover rounded-xl shadow-2xl" />
          <img src={'assets/office.webp'} alt={''} className="h-full w-full object-cover rounded-xl shadow-2xl" />
        </div>
        <Paragraph title="Qui sommes-nous ?">
          EcoRide est né d’un constat : chaque jour, des milliers de voitures circulent avec des sièges vides, tandis que d’autres cherchent
          des solutions de transport abordables et flexibles. Nous avons donc créé une plateforme intuitive et sécurisée permettant à chacun
          de partager ses trajets en toute simplicité.
        </Paragraph>
      </div>
    </SectionContainer>
  );
};
