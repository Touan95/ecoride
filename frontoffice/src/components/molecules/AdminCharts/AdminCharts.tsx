import { DailyStatistics } from '@/interfaces/ride';
import 'dayjs/locale/fr';
import { XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

export interface AdminChartsProps {
  data: DailyStatistics[];
}

export const AdminCharts = ({ data }: AdminChartsProps) => {
  const ridesValues = data.map((d) => Number(d.rides));
  const creditsValues = data.map((d) => Number(d.credits));

  const maxRides = Math.max(...ridesValues);
  const maxCredits = Math.max(...creditsValues);

  const roundUp = (num: number, step: number) => Math.ceil(num / step) * step;

  const ridesDomain = [0, roundUp(maxRides, 5)];
  const creditsDomain = [0, roundUp(maxCredits, 20)];

  return (
    <div className="flex flex-col gap-20">
      <ResponsiveContainer width="100%" height={400} className="pr-16">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} />
          <YAxis yAxisId="left" domain={ridesDomain} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rides" stroke="#8884d8" name="Covoiturages" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={400} className="pr-16">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} />
          <YAxis yAxisId="left" domain={creditsDomain} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="credits" stroke="#82ca9d" name="Crédits" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })} />
          <YAxis yAxisId="left" domain={ridesDomain} />
          <YAxis yAxisId="right" domain={creditsDomain} orientation="right" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rides" stroke="#8884d8" name="Covoiturages" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="left" />
          <Line type="monotone" dataKey="credits" stroke="#82ca9d" name="Crédits" dot={{ r: 3 }} activeDot={{ r: 5 }} yAxisId="right" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
