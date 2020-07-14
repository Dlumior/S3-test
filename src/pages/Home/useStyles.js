import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    //backgroundImage:
      //"url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    // webkitTransform: "scaleX(-1)",
    // transform: "scaleX(-1)",
    background: 
    'linear-gradient(to right,'+
    ' rgba(212, 207, 202, 0.849)'
    +',rgba(0, 61, 46, 0)'
    +' ),'+
    ' url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
  },
  fullscreen: {
    height: "95vh",
  },
  t1: {
    fontWeight: "bold",
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
      marginBottom: theme.spacing(0),
    },
  },
  t2: {
    marginBottom: theme.spacing(35),
    marginLeft: theme.spacing(10),
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
      marginBottom: theme.spacing(0),
    },
  },
}));

export default useStyles;
