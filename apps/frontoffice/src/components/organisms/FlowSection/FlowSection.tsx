import SectionContainer from '@/components/layout/SectionContainer';
import { Card } from '@/components/molecules/Card';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { TbMapSearch, TbMessage2, TbRoad } from 'react-icons/tb';

export const FlowSection = () => {
  return (
    <SectionContainer className="justify-center py-10">
      <div className="flex flex-col gap-10">
        <SectionTitle>Comment ça marche ?</SectionTitle>
        <div className="sm:grid-cols-3 sm:grid gap-10 sm:flex-none flex flex-col">
          <Card
            title={'Trouvez ou proposez un trajet'}
            description={'Recherchez un trajet disponible ou publiez le vôtre en quelques clics, selon votre destination et vos horaires.'}
            icon={TbMapSearch}
            bgColorClassname="bg-primary-300"
          />
          <Card
            title={'Échangez et réservez'}
            description={
              'Discutez avec les autres utilisateurs via la messagerie sécurisée, consultez les avis et réservez votre place en toute confiance.'
            }
            icon={TbMessage2}
            bgColorClassname="bg-primary-300"
          />
          <Card
            title={'Voyagez sereinement'}
            description={
              'Partagez la route, divisez les frais et profitez d’un trajet convivial tout en contribuant à une mobilité plus responsable.'
            }
            icon={TbRoad}
            bgColorClassname="bg-primary-300"
          />
        </div>
      </div>
    </SectionContainer>
  );
};
