import { calculateDistance, closestPointOnLine } from "./lib/helper"
export { useLine }
function useLine()
{
    function draw(ctx, {x,y,segments})
    {
      if(x == null) x = 0
      if(y == null) y = 0
        ctx.moveTo(segments[0].x+x,segments[0].y+y)
        for(var i = 1; i < segments.length; i++)
        {
          const {x:sx,y:sy} = segments[i]
          ctx.lineTo(sx+x,sy+y)
        }
    }

    function pointOnShape({px, py, segments,x,y, w}) {
      if(x == null) x = 0
      if(y == null) y = 0
      for(var i = 0; i < segments.length-1; i+=1)
      {
        const {x:x1,y:y1} = segments[i]
        const {x:x2,y:y2} = segments[i+1]
        const point = closestPointOnLine(px,py,x1+x,y1+y,x2+x,y2+y)
        if(calculateDistance(point.x, point.y, px, py)< w/2)
        {
          return true
        }
      }
      return false
    }
    
    function getClosestPoint({px, py, segments,x,y})
    {
      if(x == null) x = 0
      if(y == null) y = 0
      let point = null
      let distance = null
      for(var i = 0; i < segments.length-1; i+=1)
      {
        const {x:x1,y:y1} = segments[i]
        const {x:x2,y:y2} = segments[i+1]
        const currentPoint = closestPointOnLine(px,py,x1+x,y1+y,x2+x,y2+y)
        const currentDistance = calculateDistance(currentPoint.x, currentPoint.y, px, py);

        if(distance == null || currentDistance < distance)
        {
          point = currentPoint
          distance = currentDistance
        }
      }
      return point
    }

    return { draw, pointOnShape, getClosestPoint }
}


