const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');            //canvas에 해당하는 context는 https://developer.mozilla.org/ko/docs/Web/HTML/Canvas 해당 사이트에서 API를 참조!
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

let painting = false;
let filing = false;

//pixel size를 준다.
canvas.width = 650;
canvas.height = 550;

//default
//const DEFAULT_COLOR = "black";

//ctx.strokeStyle = DEFAULT_COLOR;
//ctx.linkWidth = 2.5;

//ctx.fillStyle = DEFAULT_COLOR;
//ctx.fillRect(50,50,50,50);

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    //console.log(event);
    //mouse의 x,y좌표
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){      //click을 누르지 않았을때.. 임의의 가상의 선들일 존재.
        ctx.beginPath();
        ctx.moveTo(x,y);
        //얘네가 없으면. 모든 line들이 한 줄로 연결됌.
    }
    else{
        ctx.lineTo(x,y);    //click을 눌렸을 때! 움직이는 마우스에 따라 stroke!
        ctx.stroke();
    }
//console.log(x,y);
}

function onMouseDown(event){
    startPainting();        //마우스가 눌린 상태에서 이동중이면, 그림
}

function onMouseUp(event){
    stopPainting();       //마우스 클릭이 해제되면 그림X
}

function changeColor(event){
    //console.log(event);       //event를 출력하여 event 세부 정보를 확인
    //console.log(event.toElement.style.backgroundColor);
    const color = event.toElement.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    //stroke와 fill 색상 적용
}

function changeRange(event){
    //console.log(event);
    console.log(event.target.value);
    const size = event.target.value;

    ctx.lineWidth = size;       //range의 변화에 따라 줄 굵기 변화 적용
}

function changeMode(){
    //paint btn click시, fill로
    if(filing===true){
        filing = false;
        mode.innerText = "Fill";
    }
    //fill btn cilck시, paint로
    else{
        filing = true;
        mode.innerText = "Paint";
    }
}

function canvasClick(){
    if(filing){     //filing이 true이면, canvas 전체를 fill.
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function changeContextMenu(event){
    event.preventDefault();     //우클릭 방지
}

function saveClicked(){
    const image = canvas.toDataURL();       //canvasAPI를 통해 image file로 변환. -default는 png 파일
    //console.log(image);
    const link = document.createElement("a");       //html file에서 a 태그를 주는것과 동일.
    //html file에서 a태그를 의미하는 link에 href와 download 속성을 추가.
    link.href = image;
    link.download = "paintJS";
    link.click();
    //console.log  (link);
}

if(canvas){         //canvas 내에서!
    canvas.addEventListener("mousemove",onMouseMove);       //mouse의 이동
    canvas.addEventListener("mousedown", startPainting);      //mouse의 클릭 상태
    canvas.addEventListener("mouseup",stopPainting);           //mouse의 클릭 해제
    canvas.addEventListener("mouseleave",stopPainting);     //mouse가 canvas에서 벗어나면!
    canvas.addEventListener("click",canvasClick);           //paint,fill 버튼 처리
    canvas.addEventListener("contextmenu",changeContextMenu);       //우클릭 처리
}  

//console.log(Array.from(colors));
Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
//colors요소들을 from을 통해 배열으로 만든 후, forEach를 통해 배열의 color 요소들에 전부 이벤트를 적용! -> 해당 색상과 동일한 filling, painting 색 적용

if(range){
    range.addEventListener("input",changeRange);
}

if(mode){
    mode.addEventListener("click",changeMode);
}

if(save){
    save.addEventListener("click",saveClicked);
}