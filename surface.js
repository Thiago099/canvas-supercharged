import { addShape,addSurface,addImage } from "./lib/add-methods"

export { Surface }

function Surface({w,h, canvas = null, sampling = true})
{
    if(canvas == null)
    {
        canvas = document.createElement("canvas")
    }
    
    else
    
    if(w != null)
    {
        canvas.width = w
    }
    else
    {
        w = canvas.width
    }

    if(h != null)
    {
        canvas.height = h
    }
    else
    {
        h = canvas.width
    }
    

    const ctx = canvas.getContext("2d");
    
    if(!sampling)
    {
        ctx.imageSmoothingEnabled = false;
    }


    const offset = {w:1, h:1, x:0, y:0}

    const children = []
    const parents = []

    var obj = {canvas, ctx, add, update, clear, beginTransaction, endTransaction, properties:{parents,w,h,offset}}

    var isOnTransaction = false
    var doesTransactionDraw = false

    function beginTransaction()
    {
        isOnTransaction = true;
        doesTransactionDraw = false
    }

    function endTransaction()
    {
        isOnTransaction = false
        if(doesTransactionDraw)
        {
            update()
        }
        doesTransactionDraw = false
    }

    function add(data)
    {
        let result

        if(!data.layer) data.layer = 0
        if(data.image)
        {
            result = addImage(children, ctx, data, update, offset)
            update()
            return result
        }
        if(data.surface)
        {
            result = addSurface(children, ctx, data, obj, update)
            update()
            return result
        }
        result = addShape(children, ctx, data, update, offset)
        update()
        return result
    }

    function update()
    {
        if(isOnTransaction){
            doesTransactionDraw = true
            return
        }
        ctx.clearRect(0,0,w,h)
        for(const shape of children.sort((a,b)=> a.layer - b.layer))
        {
            shape.draw()
        }
        for(const surface of parents)
        {
            surface()
        }
    }
    function clear()
    {
        children.splice(0, children.length)
        update()
    }
    return obj
}


