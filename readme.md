# Super canvas
This is a lightweight extension of the html canvas, that allow you to draw and interact with shapes in a intuitive way.

## features: 
- draw shapes that update the canvas automatically when its properties are changed
- check if a point is over the shape
- get the closest point to the corner of the shape

[interactive example](https://thiago099.github.io/super-canvas-example/)

[example source code](https://github.com/Thiago099/super-canvas-example)


## how to use: 
```js
import { Surface } from "super-canvas"

const surface = Surface({w:800,h:600, canvas:myCanvas}) // The canvas parameter is optional, if it is not passed
                                                        // a new canvas will be created and available trough
                                                        // surface.canvas

var centerX = 800 / 2;
var centerY = 600 / 2;

const circle = surface.add({
    // mandatory
    type: "ellipse", // shape type (the required parameters vary for every shape type, most of the optional are valid to all shape types)
    x: centerX, // X coordinate
    y: centerY, // Y coordinate
    w: 100, // width
    h: 100, // height
    // optional
    backgroundColor: "#ffc", // background color
    border: { // a border around the shape, just like the css border
        thickness: 1, // thickness of the border
        color: "#ccc" // color of the border
    },
    layer: 2, // setting the layer property will tell which order the elements should be rendered
})
```

![image](https://github.com/Thiago099/super-canvas/assets/66787043/9e8a5e59-a646-49f4-8259-6c39f31fecd0)


You can remove the element by calling;
```js
circle.remove()
```

All properties of the element, are available on the result object,
and changing them will result on a canvas updated.
```js
circle.x = 200
```

Each time you add or change a element will result in a canvas redraw, but you can instead use transaction, so when
modifying or adding multiple things at once result on a single redraw.
```js
surface.beguinTransaction()
// add or update shapes here
surface.endTransaction()
```

With any shape you can call this function to get if a point intersects with it.
```js
circle.pointOnShape({x:mouseX,y:mouseY})
```

You can also call this function to get the closest point to the edge of this shape.
```js
const {x,y} = element.getClosestPoint({x:mouseX,y:mouseY})
```
## More shapes

```js
const text = surface.add({
    // mandatory
    type: "text", // shape type
    text: "hello",  // text
    x:100, // X coordinate
    y:200, // Y coordinate
    // optional
    font: "Arial", // font
    fontSize: 50, // font size (pt)
    verticalAlign: "center",  // top | center | bottom
    horizontalAlign: "center", // start | center | end
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc",
    },
})
```
![image](https://github.com/Thiago099/super-canvas/assets/66787043/9e2e318b-f982-4b9c-a2d1-064bca54586a)

```js
const square = surface.add({
    // mandatory
    type: "rect", // shape type
    x: centerX-120, // X coordinate
    y: centerY, // Y coordinate
    w: 100, // width
    h: 100, // height
    // optional
    backgroundColor: "#ffc", // background color
    border: { // border
        thickness: 1, // border thickness
        color: "#ccc", // border color
        radius:10, // border radius just like the css border radius
    },
})
```
![image](https://github.com/Thiago099/super-canvas/assets/66787043/3dcca37d-6e3d-4ef8-aaff-62ca39b5a1f6)

```js
const shape = surface.add({
    // mandatory
    type: "shape", // shape type
    segments:[ // segments of the polygon
        {
            x: 300,
            y: 20,
        },
        {
            x: 400,
            y: 100,
        },
        {
            x: 500,
            y: 20,
        }
        ,
        {
            x: 400,
            y: 50,
        }
    ],
    // optional
    backgroundColor: "#ffc", //background color
    border: { // border
        thickness: 1, // border thickness
        color: "#ccc", // border color
    },
})
```
![image](https://github.com/Thiago099/super-canvas/assets/66787043/f84891bb-a7b0-4af2-a587-d40d87103387)
```js
const line = surface.add({
    // mandatory
    type: "line", // shape type
    segments:[ // line segments
        {
            x: 300,
            y: 100,
        },
        {
            x: 400,
            y: 200,
        },
        {
            x: 500,
            y: 100,
        }
    ],
    // optional
    cap: "round",// line ends cap (square | round) default square
    w:10 // width of the line
    backgroundColor: "#ffc", // background color
    border: { // border
        thickness: 1, // border thickness
        color: "#ccc", // border color
    },
})
```
![image](https://github.com/Thiago099/super-canvas/assets/66787043/c47fc6a9-7157-4ddb-8bd7-2b45129971c6)

```js
const curve = surface.add({
    // mandatory
    type: "curve", // shape type
    segments:[ // segments of the bezier curve
        {
            x: 20, // X coordinate
            y: 20, // Y coordinate
            hx: 100, // helper X coordinate
            hy: 20, // helper Y coordinate
        },
        {
            x: 100, // ...
            y: 100,
            hx: 100,
            hy: 100,
        }
    ],
    // optional
    cap: "round",// line ends cap (square | round) default square
    w:10 // with of the line
    backgroundColor: "#ffc", // background color
    border: { // border
        thickness: 1, // border thickness
        color: "#ccc", // border color
    },
})
```

![image](https://github.com/Thiago099/super-canvas/assets/66787043/5620f0eb-91bb-4bb2-85dd-4ac0677626a2)

you can also draw a surface on another surface
```js
const surface2 = Surface({w:800,h:600})

surface2.add({
    surface, // surface object
    // mandatory
    x:100, // X coordinate
    y:100, // Y coordinate
    // optional
    w:800, // width
    h:600 // height
})

```
