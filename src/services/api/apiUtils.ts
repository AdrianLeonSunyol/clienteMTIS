export async function handleResponse(response: any) {
    if (response.ok) {
        return response.json(); //send token if login
    }
    if (response.status === 400) {
        //So, a server-side validation error occurred.
        //Server side validation returns a string 
        //errir message, so parse as text instead of json.
        const error = await response.test();
        throw new Error(error);
    }
    throw new Error("Network response was not ok");
}

//In a real app, would likely call an error loggin service
export function handleError (error: Error) {
    //eslint-disable-next-line no-console
    console.error("Api call failed. " + error);
    throw error;
}