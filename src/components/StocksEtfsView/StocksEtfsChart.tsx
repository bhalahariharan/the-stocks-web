import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { StocksEtfsChartContainer } from '../styles';
import { formatDate } from '../../utils/helpers';

interface IProps {
  data: [string, number][];
}

function StocksEtfsChart(props: IProps) {
  function getData() {
    let max = 0;
    const data = props.data.map((d) => {
      if (d[1] > max) {
        max = d[1];
      }
      return {
        name: formatDate(d[0]),
        price: d[1].toFixed(2),
      };
    });
    return { data, domain: [0, Math.ceil(max / 100) * 100] };
  }

  const { data, domain } = getData();
  return (
    <StocksEtfsChartContainer>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" tick={false} reversed />
          <YAxis type="number" domain={domain} hide={true} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6259BE"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StocksEtfsChartContainer>
  );
}

export default StocksEtfsChart;
