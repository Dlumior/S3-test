import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import ImgTutor from "../../components/Tutor/tutor.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles((theme) => ({
    flechita: {
      margin: theme.spacing(1),
    },
    Mesesito: {
      marginRight: theme.spacing(1),
    },
  }));

const Calendario = () => {
    return (
        <div>
            <CabeceraPerfil titulo="Tutor" 
                            nombre="TORRES VERDES, Carlos Tomás"
                            imagen={ImgTutor}
            />
            <div>
                <ArrowBackIosRoundedIcon color="primary" className = "flechita"/>
                <h2 className = "Mesesito">MARZO</h2>
                <ArrowForwardIosRoundedIcon color="primary" className="flechita"/>
                <div>
                    <div class="month"> 
                        <ul>
                            <li class="prev">&#10094;</li>
                            <li class="next">&#10095;</li>
                            <li>August<br/><span>2017</span></li>
                        </ul>
                    </div>

                    <ul class="weekdays">
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                    <li>Su</li>
                    </ul>
                    </div>
                </div>
            </div>
    );
};

export default Calendario;