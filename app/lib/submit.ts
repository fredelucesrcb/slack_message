export default async function submit(message: string | null, minutes: number) {
    try {
        const res = await fetch("http://localhost:3000/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                "message": message,
                "minutes": minutes
            } )
        });

        if (res.status === 200) {
            
        }
    } catch (error) {
        console.error(error);
    }
}