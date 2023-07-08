# Super canvas
# A html canvas wrapper with added functionality

features: 
- draw shapes that can be updated automatically
- check if a point(ex: mouse position) is over the shape
- get the closest point in the corner to some point (ex: mouse position)

![image](https://github.com/Thiago099/super-canvas/assets/66787043/27b6b849-233c-4cba-8f76-727aaeff4282)

[interactive example](https://thiago099.github.io/super-canvas-example/)

```js

const surface = Surface({w:800,h:600}) // optionally you can pass a canvas as parameter

var centerX = 800 / 2;
var centerY = 600 / 2;

const circle = surface.add({
    type: "ellipse",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc"
    },
    x: centerX,
    y: centerY,
    w: 100,
    h: 100,
})
```

you can remove the element by calling
```js
circle.remove()
```

all values that are passed as parameter to the add function, are available on the result object,
and changing them from it will result on a canvas updated
```js
circle.x = 200
```

each add or change will result in a canvas redraw, but you can instead use transaction, so when
modifying or adding multiple things at once result on a single redraw
```js
surface.beguinTransaction()
// add or update shapes here
surface.endTransaction()
```

with any shape you can call this function to get if a point intersects with it
```js
circle.pointOnShape({x:mouseX,y:mouseY})
```

you can also call this function to get the closest point to the edge of this shape
```js
const {x,y} = element.getClosestPoint({x:mouseX,y:mouseY})
```
## More shapes

![image](https://github.com/Thiago099/canvas-supercharged/assets/66787043/fce29c44-bf00-4fe2-86a0-94da624a726f)
```js
const square = surface.add({
    type: "rect",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc",
        radius:10,
    },
    x: centerX-120,
    y: centerY,
    w: 100,
    h: 100,
})
```
![image](https://github.com/Thiago099/canvas-supercharged/assets/66787043/190e9961-2bb7-41ac-8ed1-4b7cfc183f78)
```js
const shape = surface.add({
    type: "shape",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc",
    },
    segments:[
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
    w:10
})
```
![image](https://github.com/Thiago099/canvas-supercharged/assets/66787043/62125939-4c48-438f-99a0-ab729a432189)
```js
const line = surface.add({
    type: "line",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc",
    },
    segments:[
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
    w:10
})
```
![image](https://github.com/Thiago099/canvas-supercharged/assets/66787043/2190c782-6fb5-4745-b419-2a9a966fb3a0)
```js
const curve = surface.add({
    type: "curve",
    backgroundColor: "#ffc",
    border: {
        thickness: 1,
        color: "#ccc",
    },
    segments:[
        {
            x: 20,
            y: 20,
            hx: 100,
            hy: 20,
        },
        {
            x: 100,
            y: 100,
            hx: 100,
            hy: 100,
        }
    ],
    w:10
})
```
![image](https://github.com/Thiago099/canvas-supercharged/assets/66787043/629fa4dd-f591-4bbd-aa35-0ec9f55c6876)

you can also draw a surface on another surface
```js
const surface2 = Surface({w:800,h:600, canvas:myCanvas})

surface2.add({
    surface,
    x:100,
    y:100,
})

```
