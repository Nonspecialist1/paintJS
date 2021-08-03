const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");

const CANVAS_SIZE = 800;
const INITIAL_COLOR = "2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function mouseOnMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleContextMenu(event){
    event.preventDefault();
}
if(canvas){
    canvas.addEventListener("mousemove", mouseOnMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
if(range){
    range.addEventListener("input", handleRangeChange);
}

let filling = false;
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true ;
        mode.innerText = "Paint";
    }
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}

function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}
if(save){
    save.addEventListener("click", handleSave);
}

function handleClear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
clear.addEventListener("click", handleClear);