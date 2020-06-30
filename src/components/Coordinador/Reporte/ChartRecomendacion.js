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

const ChartRecomendacion = (props) => {
  const style = useStyle();

  let dataNo = [];
  if (props.dataSi !== []) {
    dataNo = props.dataSi.map((item, i) => props.cant[i] - item);
  }
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Si",
        backgroundColor: "rgb(14,115,56, 0.7)",
        data: props.dataSi,
      },
      {
        label: "No",
        backgroundColor: "rgb(253,45,80, 0.7)",
        data: dataNo,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "¿Recomendaria el programa de tutoria?",
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
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

export default ChartRecomendacion;
