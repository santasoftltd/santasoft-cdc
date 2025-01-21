import { ip } from '../../../../../App'

export const API_Caller = async ({addMessageHandler}) => {
    try {
        const response = await fetch(ip + '/santasoft.services/api/pushUSDRate/', {
            method: 'Get',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Token'
            },
        });
        if (response.status === 200){
            addMessageHandler({
                title: 'Success',
                content: 'Rates pushed to OBDX successfully.',
                type: 3
            })
        }
        else{
            addMessageHandler({
                title: 'Failed',
                content: 'Rates not pushed to OBDX.',
                type: 4
            })
        }
        console.log(response.status)
    }
    catch (err) {
        console.log(err);
    }
}