export {drawImage, drawShape, drawLine, drawText}

function drawImage(ctx, {surface,x=0,y=0,w=null,h=null})
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
    else
    {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over';
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
    else
    {
        ctx.globalCompositeOperation = 'destination-out';
        fill()
        ctx.globalCompositeOperation = 'source-over';
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
    else
    {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = w;
        ctx.stroke()
        ctx.globalCompositeOperation = 'source-over';
    }
}