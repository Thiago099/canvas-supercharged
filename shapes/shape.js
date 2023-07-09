import { closestPointOnLine, calculateDistance } from "./lib/helper"
export { useShape }
function useShape()
{
    function draw(ctx, {x,y,segments})
    {
      if(x == null) x = 0
      if(y == null) y = 0
        ctx.moveTo(segments[0].x+x,segments[0].y+y)
        for(var i = 1; i < segments.length; i++)
        {
          const {x:sx,y:sy} = segments[i]
          ctx.lineTo(x+sx,y+sy)
        }
        ctx.closePath()
    }

    function pointOnShape({px, py,x,y, segments})  
    {
      if(x == null) x = 0
      if(y == null) y = 0
      let isInside = false;

      for (let i = 0, j = segments.length - 1; i < segments.length; j = i++) {
        const xi = segments[i].x+x;
        const yi = segments[i].y+y;
        const xj = segments[j].x+x;
        const yj = segments[j].y+y;

        const intersect =
          yi > py !== yj > py &&
          px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

        if (intersect) {
          isInside = !isInside;
        }
      }

      return isInside;
    }

    
    function getClosestPoint({px, py, x,y,segments})
    {
      if(x == null) x = 0
      if(y == null) y = 0

      let minDistance = Infinity;
      let closestPoint = null;
      segments.push(segments[0])
      
      for (let i = 0; i < segments.length-1; i+=1) {
        let {x:x1,y:y1} = segments[i]
        let {x:x2,y:y2} = segments[i+1]
        x1+=x
        y1+=y
        x2+=x
        y2+=y
        const point = closestPointOnLine(px,py,x1,y1,x2,y2);
        const distance = calculateDistance(px,py,point.x,point.y)
      
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      }

      return closestPoint
      
    }

    return { draw, pointOnShape, getClosestPoint }
}
