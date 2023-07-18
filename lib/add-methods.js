import { Reactive } from "./reactive"
import { drawImage, drawShape, drawLine, drawText,drawSurface } from "./basic-functionality"
import { UseEllipse } from "../shapes/ellipse"
import { useRect } from "../shapes/round-rect"
import { useLine } from "../shapes/line"
import { useCurve } from "../shapes/curve"
import { useShape } from "../shapes/shape"
import { useText } from "../shapes/text"

export { addShape, addSurface,addImage }


const shapeDict = {
    rect: useRect(),
    ellipse: UseEllipse(),
    shape: useShape(),
}
const lineDict = {
    line: useLine(),
    curve: useCurve()
}

const text = useText()


function addImage(children,ctx,data, update,offset)
{
    if(data.w == null)
    {
        data.w = data.image.width
    }
    if(data.h == null)
    {
        data.h = data.image.height
    }
    function draw()
    {
        drawImage(ctx, data)
    }

    const drawElement = {draw, layer:data.layer}

    function remove()
    {
        const index = children.indexOf(drawElement);
        if (index > -1) {
            children.splice(index, 1);
        }
        update()
    }

    function getProps({x,y})
    {
        return {px:(x-offset.x)*offset.w,py:(y-offset.y)*offset.h,...data}
    }

    function pointOnShape(props)
    {
        return pointOnSquare(getProps(props))
    }
    data.pointOnShape = pointOnShape

    children.push(drawElement)

    return Reactive(update, data)
}
function pointOnSquare({px, py,x,y,w,h}){
    return px >= x && px <= x + w && py >= y && py <= y + h
  }


function addSurface(children, ctx,data, {properties:{w, h},update})
{
    const { surface:child, w:cw, h:ch, x, y } = data
    if(cw != null && ch != null)
    {
        child.properties.offset.w = child.properties.w / cw
        child.properties.offset.h = child.properties.h / ch
    }
    child.properties.offset.x = x
    child.properties.offset.y = y
    child.properties.parents.push(update)

    function draw()
    {
        drawSurface(ctx, data)
    }

    const drawElement = {draw, layer:data.layer}

    function remove()
    {
        const index = children.indexOf(drawElement);
        if (index > -1) {
            children.splice(index, 1);
        }
        update()
    }

    children.push(drawElement)

    return { remove }
}

function addShape(children,ctx,data, update,offset)
{
    let entity
    if(data.type == "text")
    {
        data.ctx = ctx
        entity = useDrawText(ctx, data)
    }
    else if(data.type in shapeDict)
    {
        entity = useDrawShape(ctx,data)
    }
    else
    {
        entity = useDrawLine(ctx, data)
    }

    const drawElement = {draw:entity.draw, layer:data.layer}
    children.push(drawElement)

    function getProps({x,y})
    {
        return {px:(x-offset.x)*offset.w,py:(y-offset.y)*offset.h,...data}
    }

    function pointOnShape(props)
    {
        return entity.shape.pointOnShape(getProps(props))
    }
    function getClosestPoint(props)
    {
        return entity.shape.getClosestPoint(getProps(props))
    }
    function remove()
    {
        const index = children.indexOf(drawElement);
        if (index > -1) {
            children.splice(index, 1);
        }
        update()
    }
    data.pointOnShape = pointOnShape
    data.getClosestPoint = getClosestPoint
    data.remove = remove

    return Reactive(update, data)
}


function useDrawShape(ctx, data)
{
    const shape = shapeDict[data.type]
    function draw()
    {
        const dt = {...data}
        if(dt.cx != null)
        {
            dt.x -= dt.cx
        }
        if(dt.cy != null)
        {
            dt.y -= dt.cy
        }
        drawShape(ctx, dt, shape.draw)
    }
    return {draw,shape}
}

function useDrawText(ctx, data)
{
    function draw()
    {
        const dt = {...data}
        if(dt.cx != null)
        {
            dt.x -= dt.cx
        }
        if(dt.cy != null)
        {
            dt.y -= dt.cy
        }
        drawText(ctx, dt, text.draw)
    }
    return {draw, shape:text}
}


function useDrawLine(ctx, data)
{
    const shape = lineDict[data.type]
    function draw()
    {
        drawLine(ctx, data, shape.draw)
    }
    return {draw,shape}
}