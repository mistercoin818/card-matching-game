const colorArr = ['#008000', '#FE0000', '#FDFB00', '#A4292A', '#0029FD', '#FFBFCA', '#7E007D', '#FEA400'];
const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
const cards = document.getElementsByClassName('card')

function shuffle(array){
    array.sort(()=>Math.random() - 0.5)
}

function restart(){
    shuffle(numArr)
    console.log(numArr)

    for(let i = 0; i < 16; i++){
        document.getElementById("card-container").children[i].style.backgroundColor = colorArr[numArr[i]];
        document.getElementById("card-container").children[i].id = numArr[i];
    }

    setTimeout(()=>{
        for(let i = 0; i < 16; i++){
            document.getElementById("card-container").children[i].style.backgroundColor = 'white';
        }
    }, 3000)
}

let openCardColorArr = [-1, -1];
let openCardIndexArr = [-1, -1];
let numClick = 0;
let answer = 0;

async function flipCard(event){
    if(numClick >= 2){
        console.log("Wait!!!!!!")
    }
    else if(numClick === 1 && getIndex(event.target) === openCardIndexArr[0]){
        console.log("Click another card!!!!!!")
    }
    else{
        console.log(event.target.id)
        console.log(getIndex(event.target))
        if(event.target.style.backgroundColor !== 'white'){
            console.log("Please click another white card!!!!!")
        }
        else{
            let color = event.target.id
            openCardIndexArr[numClick] = getIndex(event.target)
            event.target.style.backgroundColor = colorArr[color];
            openCardColorArr[numClick] = color;
            numClick++;
            if(numClick === 2){
                if(openCardColorArr[0] === openCardColorArr[1]){
                    answer++;
                    console.log(answer);
                    openCardColorArr[0] = -1;
                    openCardColorArr[0] = -1;
                    openCardIndexArr[0] = -1;
                    openCardIndexArr[0] = -1;
                }
                else{
                    await sleep(500).then(()=>{
                        event.target.style.backgroundColor = 'white';
                        document.getElementById("card-container").children[Number(openCardIndexArr[0])].style.backgroundColor = 'white';
                        openCardColorArr[0] = -1;
                        openCardColorArr[0] = -1;
                        openCardIndexArr[0] = -1;
                        openCardIndexArr[0] = -1;
                    })
                }
                
                numClick = 0;
                if(answer === 8){
                    answer = 0;
                    setTimeout(()=>{
                        if(!confirm("게임 종료! 다시 시작하시겠습니까?")){
                            for(let i = 0; i < 16; i++){
                                document.getElementById("card-container").children[i].style.backgroundColor = 'white';
                            }
                        }
                        else{
                            restart();
                        }
                    }, 500)
                }
            }
        }

    }
}

function init(){
    for(let i = 0; i < 16; i++){
        cards[i].addEventListener("click", flipCard);
    }
}

function getIndex(element){
    return [].indexOf.call(element.parentNode.children, element);
}
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

init();