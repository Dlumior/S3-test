/**
 * Each method connects to the backend in the specific HTTP request
 */

/**
 *  @param props objeto que contiene url y request
 *  @param props.servicio URL del endpoint al cual se conectara
 * 
 *  @returns metodo GET/ un objeto json que el endpoint en el backend devuelve 
 */
export async function GET(props) {
    console.log(">>> GET");
    try {
        let response = await fetch(props.servicio,
            {
            method: 'GET',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let responseJson = await response.json();
        console.log(">>> GET succesful");
        return responseJson;  
    } catch (error) {
        console.log(">>> GET failed");
        console.log(">>> ", error.message);
        return null;
    }
}
/**
 *  @param props objeto que contiene url y request
 *  @param props.endpoint URL del endpoint al cual se conectara
 *  @param props.request el objeto que requiere el endpoint 
 * 
 *  @returns metodo POST/ un objeto json que el endpoint en el backend devuelve 
 */
export async function POST(props) {
    console.log(">>> POST", props);
    console.log(">>> POST", props.request);
    console.log(">>> POST", props.servicio);
    try {
        let response = await fetch(props.servicio,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( props.request )
        });
        let responseJson = await response.json();
        console.log(">>> YEEEE");
        return responseJson;  
    } catch (error) {
        console.log("dead:", error.message);
        return null;
    }
}