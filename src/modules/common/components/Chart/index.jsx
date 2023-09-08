import Plot from 'react-plotly.js';
import { TYPE_CHART } from '../../constants/index';

export const Chart = ({ dataX, dataY, title, hole, type }) => {
  console.log(dataX, dataY, title, hole, type);
  const isPie = type === TYPE_CHART.PIE;
  const isBar = type === TYPE_CHART.BAR;

  return (
    <Plot
      data={[
        {
          type,
          ...(isPie && { values: dataY, labels: dataX }),
          ...(isBar && { x: dataX, y: dataY }),
          ...(hole && { hole }),
        },
      ]}
      layout={{ width: '100%', height: '100%', title: title }}
    />
  );
};
export default Chart;
