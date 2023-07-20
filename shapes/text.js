export { useText }
function useText()
{
    function draw(ctx, {text,x,y,font,fontSize,verticalAlign, horizontalAlign})
    {
       let lines = text.split('\n').map(x=>{
        const m = ctx.measureText(x)
        const height = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + 5
        return {text:x,height}
       })

      if(text == null)
      {
        text = ""
      }
      if(fontSize != null)
      {
        fontSize += "pt"
      }
      ctx.font = `${fontSize} ${font}`;
      ctx.textAlign = horizontalAlign
      const h = lines.reduce((acc, curr) => acc + curr.height, 0);

      if(verticalAlign == "center")
      {
        y -=h/2
      } 
      if(verticalAlign != "end" && verticalAlign != "top")
      {
        y += h
      }

      function fill()
      {
        let height = 0
        for (const {text,height:h} of lines) {
          ctx.fillText(text, x, y - height)
          height+=h
        }
      }

      function stroke()
      {
        ctx.strokeText(text,x,y)
      }
      
      return {fill, stroke}
    }

    function pointOnShape({px, py,text, x,y,font,fontSize,verticalAlign, horizontalAlign,ctx})  
    {
      ctx.font = `${fontSize}pt ${font}`;
      const metrics = ctx.measureText(text)
      const {width:w} = metrics
      const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

      if(horizontalAlign == "center")
      {
        x -= w / 2
      }else if(horizontalAlign == "right" || horizontalAlign == "end")
      {
        x-= w
      }

      if(verticalAlign == "center")
      {
        y -= h / 2
      } else if(verticalAlign == "end" || verticalAlign == "top")
      {
        y -= h
      }

      return px >= x && px <= x + w && py >= y && py <= y + fontSize
    }

    
    function getClosestPoint({px, py,text, x,y,font,fontSize,verticalAlign, horizontalAlign,ctx})
    {
      ctx.font = `${fontSize}pt ${font}`;
      const metrics = ctx.measureText(text)
      const {width:w} = metrics
      const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

      if(horizontalAlign == "center")
      {
        x -= w / 2
      }else if(horizontalAlign == "right" || horizontalAlign == "end")
      {
        x-= w
      }

      if(verticalAlign == "center")
      {
        y -= h / 2
      } else if(verticalAlign == "end" || verticalAlign == "top")
      {
        y -= h
      }

      if (px >= x && px <= x + w && py >= y && py <= y + h) {
        const leftDistance = px - x;
        const rightDistance = x + w - px;
        const topDistance = py - y;
        const bottomDistance = y + h - py;
    
        const minDistance = Math.min(leftDistance, rightDistance, topDistance, bottomDistance);
    
        if (minDistance === leftDistance) {
          return { x: x, y: py }; // Closest point on the left edge
        } else if (minDistance === rightDistance) {
          return { x: x + w, y: py }; // Closest point on the right edge
        } else if (minDistance === topDistance) {
          return { x: px, y: y }; // Closest point on the top edge
        } else {
          return { x: px, y: y + h }; // Closest point on the bottom edge
        }
      }
    
      // Find the closest x-coordinate on the edge
      let closestX;
      if (px < x) {
        closestX = x; // Closest x-coordinate on the left edge
      } else if (px > x + w) {
        closestX = x + w; // Closest x-coordinate on the right edge
      } else {
        closestX = px; // Closest x-coordinate
      }
    
      // Find the closest y-coordinate on the edge
      let closestY;
      if (py < y) {
        closestY = y; // Closest y-coordinate on the top edge
      } else if (py > y + h) {
        closestY = y + h; // Closest y-coordinate on the bottom edge
      } else {
        closestY = py; // Closest y-coordinate
      }
    
      return { x: closestX, y: closestY };
    }


    return { draw, pointOnShape, getClosestPoint }
}
