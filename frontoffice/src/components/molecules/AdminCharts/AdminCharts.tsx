import { Typography } from '@/components/atoms/Typography';
import { DailyStatistics } from '@/interfaces/ride';
import 'dayjs/locale/fr';
import { XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TbCar, TbPigMoney } from 'react-icons/tb';
export interface AdminChartsProps {
  chartsData: DailyStatistics[];
  totalRides: number;
  totalCredits: number;
}

export const AdminCharts = ({ chartsData, totalRides = 0, totalCredits }: AdminChartsProps) => {
  const ridesValues = chartsData.map((d) => Number(d.rides));
  const creditsValues = chartsData.map((d) => Number(d.credits));

  const maxRides = Math.max(...ridesValues);
  const maxCredits = Math.max(...creditsValues);

  const roundUp = (num: number, step: number) => Math.ceil(num / step) * step;

  const ridesDomain = [0, roundUp(maxRides, 5)];
  const creditsDomain = [0, roundUp(maxCredits, 20)];

  return (
    <div className="flex flex-col gap-10">
      <Typography variant="title" color="primary" align="center">
        EcoRide Charts
      </Typography>
      <div className="flex flex-col gap-10">
        <Typography variant="cardTitle" color="primary" align="center">
          {"Depuis la création de l'application"}
        </Typography>
        <div className="flex justify-evenly gap-2">
          <div className="flex flex-col gap-2 border items-center justify-center p-5 rounded-xl border-primary-900">
            <TbCar size={30} className="text-primary-900" />
            <Typography variant="cardTitleSm" color="primary">
              {`${totalRides} trajet(s) en covoiturage réalisé(s)`}
            </Typography>
          </div>
          <div className="flex flex-col gap-2 border items-center justify-center p-5 rounded-xl border-primary-900">
            <TbPigMoney size={30} className="text-primary-900" />
            <Typography variant="cardTitleSm" color="primary">
              {`${totalCredits} crédit(s) généré(s) pour la plateforme`}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20">
        <ResponsiveContainer width="100%" height={400} className="pr-16">
          <LineChart data={chartsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            />
            <YAxis yAxisId="left" domain={ridesDomain} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rides" stroke="#8884d8" name="Covoiturages" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400} className="pr-16">
          <LineChart data={chartsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            />
            <YAxis yAxisId="left" domain={creditsDomain} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="credits" stroke="#82ca9d" name="Crédits" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            />
            <YAxis yAxisId="left" domain={ridesDomain} />
            <YAxis yAxisId="right" domain={creditsDomain} orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rides" stroke="#8884d8" name="Covoiturages" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
            <Line type="monotone" dataKey="credits" stroke="#82ca9d" name="Crédits" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="right" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
