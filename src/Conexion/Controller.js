

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
        console.log(">>> POST succesful",responseJson );
        return responseJson;  
    } catch (error) {
        console.log(">>> POST failed");
        console.log(">>> ", error.message);
        return null;
    }
}