import { calculateDistance } from "./lib/helper";
import closestPoint from "closest-point-on-bezier";
export { useCurve }
function useCurve()
{
    function draw(ctx, {segments,x,y})
    {
        if(x == null) x = 0
        if(y == null) y = 0
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        ctx.moveTo(p1x+x, p1y+y);
        ctx.bezierCurveTo(h1x+x, h1y+y, h2x+x, h2y+y, p2x+x, p2y+y);
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            ctx.moveTo(cx+x, cy+y);
            const {x:sx,y:sy} = reverse(cx, cy,chx, chy)
            ctx.bezierCurveTo(sx+x, sy+y, nhx+x, nhy+y, nx+x, ny+y);
        }
            
    }

    function pointOnShape({px,py,x,y,segments, w}) {
        if(x == null) x = 0
        if(y == null) y = 0
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        const {relative_position, absolute_point:{x:xx,y:yy}} = closestPoint(
            [
                {x:p1x+x,y:p1y+y},
                {x:h1x+x,y:h1y+y},
                {x:h2x+x,y:h2y+y},
                {x:p2x+x,y:p2y+y},
            ],
            {x:px,y:py}
        )
        if(calculateDistance(xx,yy,px,py) < w / 2)
        {
            return true
        }
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            const {x:zx,y:zy} = reverse(cx, cy,chx, chy)
            const {relative_position, absolute_point:{x:xx,y:yy}} = closestPoint(
                [
                    {x:cx,y:cy},
                    {x:zx,y:zy},
                    {x:nhx,y:nhy},
                    {x:nx,y:ny},
                ],
                {x:px,y:py}
            )
            if(calculateDistance(xx,yy,px,py) < w / 2)
            {
                return true
            }
        }
    }

    function getClosestPoint({px,py,segments,x,y, w})
    {
        if(x == null) x = 0
        if(y == null) y = 0
        const {x:p1x, y:p1y, hx:h1x, hy:h1y} = segments[0]
        const {x:p2x, y:p2y, hx:h2x, hy:h2y} = segments[1]
        let { absolute_point } = closestPoint(
            [
                {x:p1x+x,y:p1y+y},
                {x:h1x+x,y:h1y+y},
                {x:h2x+x,y:h2y+y},
                {x:p2x+x,y:p2y+y},
            ],
            {x:px,y:py}
        )
        let dist = calculateDistance(absolute_point.x,absolute_point.y,px,py)
        for(var i = 1; i < segments.length-1; i ++)
        {
            const {x:cx,y:cy,hx:chx,hy:chy} = segments[i]
            const {x:nx,y:ny,hx:nhx,hy:nhy} = segments[i+1]
            const {x:zx,y:zy} = reverse(cx, cy,chx, chy)
            const {absolute_point:newPoint} = closestPoint(
                [
                    {x:cx+x,y:cy+y},
                    {x:zx+x,y:zy+y},
                    {x:nhx+x,y:nhy+y},
                    {x:nx+x,y:ny+y},
                ],
                {x:px,y:py}
            )
            const newDist = calculateDistance(newPoint.x,newPoint.y,px,py)
            if(newDist < dist)
            {
                dist = newDist
                absolute_point = newPoint
            }
        }
        return absolute_point
    }

    return { draw, pointOnShape, getClosestPoint }
}
