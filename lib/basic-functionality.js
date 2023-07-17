export {drawSurface, drawShape, drawLine, drawText,drawImage}

function drawSurface(ctx, {surface,x=0,y=0,w=null,h=null})
{
    if(w != null && h != null)
    {
        ctx.drawImage(surface.canvas,x,y,w,h);
    }
    else
    {
        ctx.drawImage(surface.canvas,x,y);
    }
}

function drawImage(ctx, {image,x=0,y=0,w=null,h=null})
{
    if(w != null && h != null)
    {
        ctx.drawImage(image,x,y,w,h);
    }
    else
    {
        ctx.drawImage(image,x,y);
    }
}

function drawShape(ctx, data, callback)
{
    ctx.beginPath()
    callback(ctx, data)

    const { backgroundColor } = data
    const { border } = data 



    if(border != null)
    {
        const {thickness, color} = border
        if(thickness != null)
        {
            ctx.lineWidth = thickness * 2;
        }
        else
        {
            ctx.lineWidth = 2;
        }

        if(color != null)
        {
            ctx.strokeStyle = color;
        }
        else
        {
            ctx.strokeStyle = "black"
        }

        ctx.stroke()
    }
    if(backgroundColor != null)
    {
        ctx.fillStyle = backgroundColor
        ctx.fill()
    }
}

function drawText(ctx, data, callback)
{
    ctx.beginPath()

    const {fill,stroke} = callback(ctx, data)

    const { backgroundColor } = data
    const { border } = data 



    if(border != null)
    {
        const {thickness, color} = border
        if(thickness != null)
        {
            ctx.lineWidth = thickness * 2;
        }
        else
        {
            ctx.lineWidth = 2;
        }

        if(color != null)
        {
            ctx.strokeStyle = color;
        }
        else
        {
            ctx.strokeStyle = "black"
        }

        stroke()
    }
    if(backgroundColor != null)
    {
        ctx.fillStyle = backgroundColor
        fill()
    }

}

function drawLine(ctx, data, callback)
{
    ctx.beginPath()
    callback(ctx, data)
    let { cap } = data
    const { backgroundColor } = data
    const { border } = data 
    let { w } = data

    if(cap == null)
    {
        cap = "square"
    }

    if(w == null)
    {
        w = 1
    }

    ctx.lineCap = cap;

    if(border != null)
    {
        const { thickness, color } = border

        if(thickness != null)
        {
            ctx.lineWidth = thickness * 2 + w;
        }
        else
        {
            ctx.lineWidth = 1 + w;
        }

        if(color != null)
        {
            ctx.strokeStyle = color;
        }
        else
        {
            ctx.strokeStyle = "black"
        }
        ctx.stroke()
    }

    if(backgroundColor != null)
    {
        ctx.lineWidth = w;
        ctx.strokeStyle = backgroundColor
        ctx.stroke()
    }

}