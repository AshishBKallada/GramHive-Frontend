import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const chartConfig = {
  type: "pie",
  width: 400, // Increased width
  height: 400, // Increased height
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#FFFFFF", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"], // Change first color to white
    legend: {
      show: false,
    },
  },
};

export default function ChartTwo() {
  return (
    <Card className="bg-gray-900 w-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-black p-5 text-white">
        <center>
            <i className="fa fa-trash h-6 w-6 text-white"></i>
          </center>        </div>
        <div>
          <Typography variant="h6" color="white">
            Pie Chart
          </Typography>
          <Typography
            variant="small"
            className="max-w-sm font-normal text-gray-400"
          >
            Visualize your data in a simple way using the
            @material-tailwind/react chart plugin.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
