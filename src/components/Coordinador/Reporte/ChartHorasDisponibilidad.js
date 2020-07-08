import React from "react";
import { Bar } from "react-chartjs-2";
import { Paper, makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  caja: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

const ChartHorasDisponibilidad = (props) => {
  const style = useStyle();

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Horas",
        data: props.data,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Disponibilidad registrada",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
          },
        },
      ],
    },
  };

  return (
    <Paper className={style.caja}>
      <Bar data={data} options={options} />
    </Paper>
  );
};

export default ChartHorasDisponibilidad;
