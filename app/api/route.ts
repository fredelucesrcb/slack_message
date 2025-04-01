import { NextResponse } from "next/server";
import { sendMessageToSlack } from "../lib/slack";

export async function GET() {
    return Response.json(process.env.SLACK_WEBHOOK_URL);
}

export async function POST(request: Request) {

    const req = await request.json();

    const res = await sendMessageToSlack(req);

    if (res.status === 200){
        return NextResponse.json({"message": "success"},{status: 200});
    } else {
        return NextResponse.json({"error": "Internal Server Error"}, {status: 404});
    }
    
};