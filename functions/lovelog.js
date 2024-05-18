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

export async function onRequestPut(context){
    const body = await context.request.json();
    const { id, date, name, color } = body;

    if (!id) {
        return new Response("Missing id", { status: 400 });
    }

    // Use a prepared statement to update the record based on the provided id
    await context.env.love.prepare(`UPDATE tb_log SET date = ?, name = ?, color = ? WHERE id = ?`)
        .bind(date, name, color, id)
        .run();

    return new Response("OK!");
}

export async function onRequestDelete(context) {
    const body = await context.request.json();
    const { id } = body;

    if (!id) {
        return new Response("Missing id", { status: 400 });
    }

    // Use a prepared statement to delete the record based on the provided id
    await context.env.love.prepare(`DELETE FROM tb_log WHERE id = ?`)
        .bind(id)
        .run();

    return new Response("OK!");
}