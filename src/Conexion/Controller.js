
import {getUser} from "../Sesion/Sesion";
/**
 * Como llamar a GET: "...... GET ( {servicio: "/servico?query=valorQuery"} )"
 * @param {string} props.servicio ruta del endpoint en el backend
 * @param {Object} props 
 */
export async function GET(props) {
    
    try {
        console.log(">>> GET props",props);
        let response = await fetch(props.servicio,
            {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        console.log(">>> entre al GET response",response);
        let responseJson = await response.json();
        console.log("*>>> entre al GET response",responseJson);
        
        return responseJson;  

    } catch (error) {
        console.log(">>> GET failed");
        console.log(">>> ", error.message);
        return null;
    }
}
/**
 * Como llamar a POST: ".... POST( {servicio: "/servico?query=valorQuery" , request: {objeto} } )"
 * 
 *  @param props objeto que contiene url y request
 *  @param {string} props.servicio URL del endpoint al cual se conectara
 *  @param {JSON} props.request el objeto que requiere el endpoint 
 * 
 *  @returns metodo POST/ un objeto json que el endpoint en el backend devuelve 
 */
export async function POST(props) {
    console.log("POST->",props);
    try {
        let response = await fetch(props.servicio,
        {
            limits:{fileSize: '10mb'},
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( props.request )

        });
        
        console.log(">>> POST pre succesful",response );
        
        let responseJson = await response.json();
        let hoy=new Date();
        let dia=(hoy.getDay()+"-"+hoy.getMonth()+"-"+hoy.getFullYear());
        console.log("DIA",dia);

        let auditoria = await fetch("/api/auditoria/",
        {
            limits:{fileSize: '10mb'},
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({auditoria:
                {usuario:getUser().usuario.CODIGO+"_"+getUser().usuario.NOMBRE+"_",dia,
                transaccion:props.request}}
                )
        });
            
        console.log(">>> POST succesful",responseJson);
        console.log(">>> POST succesful",responseJson);
        console.log(">>> POST auditoria",await auditoria.json());
        console.log(">>> POST auditoria",await auditoria);


        //Para la auditoria:        
        //WriteDemo(nombre,JSON.stringify( props.request));

        return responseJson;  
    } catch (error) {

        console.log(">>> POST failed");
        console.log(">>> ", error.message);
/*
        let auditoria = await fetch("/api/auditoria/",
        {
            limits:{fileSize: '10mb'},
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({auditoria:
                {usuario:getUser().usuario.CODIGO+"_"+getUser().usuario.NOMBRE+"_"+getUser().usuario.APELLIDOS,
                transaccion:responseJson}}
                )
        });
*/
        return null;
    }
}

/*
function WriteDemo(nombre,body) 
{
 let fso, f, r;
 let ForReading = 1, ForWriting = 2;
 let dia=new Date();
 fso = new ActiveXObject("Scripting.FileSystemObject"); 
 f = fso.OpenTextFile(path.join("..","Auditoria"+dia.getDay()+"-"+dia.getMonth()+"-"+dia.getFullYear()+"-"+".txt", ForWriting, true));
 
 f.Write(nombre+"   "+body);
 f.Close();
 //f = fso.OpenTextFile("c:\\testfile.txt", ForReading);
 //r = f.ReadLine();
 //return(r);
}*/