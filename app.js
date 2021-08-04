const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const eraser = document.getElementById("jsErase");
const clear = document.getElementById("jsClear");
const colorpicker = document.getElementById("color_picker");
const colorpick = document.getElementById("color_pick");
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
let filling = false;

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
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true ;
        mode.innerText = "Paint";
    }
}
function handleClear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}
function handleColorPicker(){
    colorpick.click()
}
function handleColorPick(event){
    const PickedColor = event.target.value;
    colorpicker.style.backgroundColor = PickedColor;
    ctx.strokeStyle = PickedColor;
    ctx.fillStyle = PickedColor;
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleEraser(event){
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = ctx.fillStyle;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

if(canvas){
    canvas.addEventListener("mousemove", mouseOnMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

range.addEventListener("input", handleRangeChange);
mode.addEventListener("click", handleModeClick);
clear.addEventListener("click", handleClear);
save.addEventListener("click", handleSave);
colorpicker.addEventListener("click", handleColorPicker);
colorpick.addEventListener("change", handleColorPick);
eraser.addEventListener("click", handleEraser);