import SectionContainer from '@/components/layout/SectionContainer';
import { Card } from '@/components/molecules/Card';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { TbLeaf, TbLock, TbPigMoney, TbUsersGroup } from 'react-icons/tb';

export const ValuesSection = () => {
  return (
    <SectionContainer fluid className="justify-center py-10 bg-secondary-300">
      <div className="flex flex-col gap-10">
        <SectionTitle>Nos engagements</SectionTitle>
        <div className="sm:grid sm:grid-cols-2 gap-10 sm:flex-none flex flex-col">
          <Card
            title={'Un service économique'}
            description={
              'Réduisez vos frais de transport en partageant les coûts du trajet. Conducteurs et passagers y trouvent une solution simple et abordable.'
            }
            icon={TbPigMoney}
          />
          <Card
            title={'Une expérience conviviale'}
            description={
              'Voyagez autrement en rencontrant des personnes partageant vos trajets et vos valeurs. Chaque trajet devient un moment d’échange et de partage.'
            }
            icon={TbUsersGroup}
          />
          <Card
            title={'Un impact écologique positif'}
            description={
              'Moins de voitures sur la route, c’est moins de pollution. Avec EcoRide, chaque trajet contribue à réduire l’empreinte carbone et la congestion routière.'
            }
            icon={TbLeaf}
          />
          <Card
            title={'Une plateforme sécurisée'}
            description={
              'Profils vérifiés, avis, messagerie privée et paiement sécurisé : tout est mis en place pour garantir des trajets sereins et fiables.'
            }
            icon={TbLock}
          />
        </div>
      </div>
    </SectionContainer>
  );
};
