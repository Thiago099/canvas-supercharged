# Canvas supercharged


# Allows to create and interact with shapes from the html canvas

You can create many shapes:


```js
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

