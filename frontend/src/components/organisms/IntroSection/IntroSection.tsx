import SectionContainer from '@/components/layout/SectionContainer';
import { Paragraph } from '@/components/molecules/Paragraph';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import Image from 'next/image';

export const IntroSection = () => {
  return (
    <SectionContainer className="justify-center py-10">
      <div className="flex flex-col gap-10">
        <SectionTitle weight="extrabold">EcoRide</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 overflow-hidden">
          <Image
            src={'/assets/driver.webp'}
            alt={'Conducteur au volant discutant avec une personne par la fenêtre'}
            className="w-full object-cover max-h-[80vh] aspect-[3/2] rounded-xl"
            width={450}
            height={300}
          />
          <Image
            src={'/assets/passenger.webp'}
            alt={'Passager regardant le paysage par la fenêtre du véhicule'}
            className="w-full object-cover max-h-[80vh] aspect-[3/2] rounded-xl"
            width={450}
            height={300}
          />
        </div>
        <Paragraph title="Le covoiturage responsable et accessible à tous">
          Chez EcoRide, nous croyons en une mobilité plus intelligente, plus économique et plus respectueuse de l’environnement. Notre
          mission est simple : faciliter la mise en relation entre conducteurs et passagers pour optimiser les trajets, réduire les coûts et
          limiter l’impact écologique des déplacements quotidiens.
        </Paragraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 overflow-hidden">
          <Image
            src={'/assets/team.webp'}
            alt={'Équipe Ecoride dans leurs locaux'}
            className="w-full object-cover max-h-[80vh] aspect-[3/2] rounded-xl"
            width={450}
            height={460}
          />
          <Image
            src={'/assets/office.webp'}
            alt={"Bureau de l'entreprise Ecoride dans une ambiance écologique"}
            className="w-full object-cover max-h-[80vh] aspect-[3/2] rounded-xl"
            width={450}
            height={460}
          />
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
