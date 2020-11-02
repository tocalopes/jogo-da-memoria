var images = [
    "teste.jpeg",
    "tiririca.jpg",
    "tony-ramos.jpeg",
    "bob-esponja.jpg"
]
var delay=1000;

class card{
    constructor(width,height,posx,posy,imgUrl,isRight){
        this.width = width;
        this.height = height;
        this.posx = posx;
        this.posy = posy;
        this.imgUrl = imgUrl;
        this.isRight = isRight;
    }
}

window.onload = function (){

    var card1 = null;
    var card2 = null;
    var indexCard1 = null;
    var indexCard2 = null;

    var deck = [];
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("click",printMousePos);
    var ctx = canvas.getContext("2d");

    loadDeck();   
    
    function loadDeck(){
        var posx = 10;
        var posy = 10;
        var width = 150;
        var height = 150;
        var margin = 55;
        for (var i = 0; i < images.length; i++){
            if(deck.length == 4){
                posx = 10;
                posy = 200;
            }
            deck.push(new card(width,height,posx,posy,images[i],0));
            posx += width + margin;
            deck.push(new card(width,height,posx,posy,images[i],0));
            posx += width + margin;
            
        }

        for(var i = 0; i < deck.length; i++ ){
            drawCard(deck[i]);
        }

    }

    function drawCard(card){
        console.log("desenhando card");
        setTimeout(
            function(){
                ctx.fillStyle = "#FF0";
                ctx.fillRect(card.posx,card.posy,card.width,card.height);
            },
            delay
        )
        
    }

    function drawImage(card){
        var image = new Image(card.width,card.height);
        image.onload = function (){
            ctx.drawImage(image, card.posx, card.posy, card.width, card.height);
        }
        image.src = card.imgUrl;
        
    }

    function printMousePos(event) {
       clickX = event.clientX;
       clickY = event.clientY;
       console.log(clickX);
       console.log(clickY);
        for (var i = 0; i < deck.length; i ++){
            var card = deck[i];
            //console.log(card);
            if(clickX >= card.posx && 
                clickX <= card.posx + card.width && 
                clickY >= card.posy &&
                clickY <= card.posy + card.height){
                if(card.isRight == 0){
                    if(card1 == null){
                        card1 = card;
                        indexCard1 = i;
                        drawImage(card1);
                    }else if(card2 == null){
                        card2 = card;
                        drawImage(card2);
                        indexCard2 = i;
                        if (card1.imgUrl == card2.imgUrl){
                            console.log("acertou mizeravel");
                            deck[indexCard1].isRight = 1;
                            deck[indexCard2].isRight = 1;
                            card1 = null;
                            card2 = null;
                            indexCard1 = null;
                            indexCard2 = null;
                            console.log(card1);
                            console.log(card2);
                        }else{
                            console.log(card1);
                            console.log(card2);
                            drawCard(card1);
                            drawCard(card2);
                            card1 = null;
                            card2 = null;
                            indexCard1 = null;
                            indexCard2 = null;
                        }
                    }else{
                        console.log(card1);
                        console.log(card2);
                        drawCard(card1);
                        drawCard(card2);
                        card1 = null;
                        card2 = null;
                        indexCard1 = null;
                        indexCard2 = null;
                    }
                }
                
            }
        }

      }


}