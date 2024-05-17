export async function onRequestGet(context) {
    // Create a prepared statement with our query
    const ps = context.env.love.prepare('SELECT * from tb_log');
    const data = await ps.all();

    return Response.json(data);
}

export async function onRequestPost(context) {
    // return Response.json(context.request);
    const body = await context.request.json();
    // return Response.json(body);
    const { id, date, name, color} = body;

    await context.env.love.prepare(`INSERT INTO tb_log (id, date, name, color) VALUES (?, ?, ?, ?)`).bind(id, date, name, color).run()

    return new Response("OK!")

}