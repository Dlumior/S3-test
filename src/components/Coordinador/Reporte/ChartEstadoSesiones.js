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

const ChartEstadoSesiones = (props) => {
  const style = useStyle();

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Porcentajes",
        data: props.data,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Estados de una sesión",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100
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

export default ChartEstadoSesiones;
