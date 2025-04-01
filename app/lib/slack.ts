
import { NextResponse } from "next/server";

export async function sendMessageToSlack(payload: { message: string, slackUrl: string }): Promise<NextResponse>{

    const { message, slackUrl  } = payload;
    
    const pay = {
        "text": `From Roy's Slack Bot: ${message}`
    }

    try {
      const res = await fetch(slackUrl, {
        method: "POST",
        body: JSON.stringify(pay)
      })

    //   console.log(res.status)

      if(res.status === 200){
        console.log('here 200')
        return NextResponse.json({"message": "success", status:200}, {status: 200})
      } else {
        console.log('here 404')
        return NextResponse.json({"message": "something went wrong", status:500}, {status: 500});
      }
    } catch (error) {
        console.error('Error sending message to Slack:', error);
        return NextResponse.json({"message": "something went wrong", status:500}, {status: 500});
    }

  }