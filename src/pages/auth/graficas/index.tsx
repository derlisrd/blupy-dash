import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";

type DailyStars = {
  date: Date;
  stars: number;
};

type Series = {
  label: string;
  data: DailyStars[];
};

const data: Series[] = [
  {
    label: "React Charts",
    data: [
      {
        date: new Date(),
        stars: 40,
      },
      // ...
    ],
  },
  {
    label: "React Query",
    data: [
      {
        date: new Date(),
        stars: 30,
      },
      // ...
    ],
  },
];

function Graficas() {
  const primaryAxis = useMemo<AxisOptions<(typeof data)[number]["data"][number]>>(
    () => ({
      getValue: (datum) => datum.stars,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<(typeof data)[number]["data"][number]>[]>(
    () => [
      {
        getValue: (datum) => datum.stars,
      },
    ],
    []
  );

  return (
    <div>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
      <div style={{ minHeight: "80vh" }} />
    </div>
  );
}

export default Graficas;
