export async function onRequestGet(context) {
    const { request, env } = context;

    // 从 KV 获取值
    const value = await env.LOVE_KV.get("nums");

    // 返回 JSON 格式的响应
    return new Response(JSON.stringify({
        nums:value
    }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function onRequestPut(context) {
    const { request, env } = context;
    const body = await context.request.json();
    const { nums } = body;
    console.log('nums :', nums);

    if (!nums) {
        return new Response("Missing nums", { status: 400 });
    }

    // Use a prepared statement to update the record based on the provided id
    await env.LOVE_KV.put("nums", nums);

    return new Response("OK!");
}