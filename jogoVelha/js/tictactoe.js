const Tictactoe = () => {
    let canPlay = false, game = [], board;//array
    const texts = [
        "Aperte o play para jogar",
        "joga!",
        "venceu o jogo"
    ]
    const self = {
        bot: true,
        turn:"",
        text: texts[0],
        buttonLabel: "Jogar"
    };

    self.init = (elem) => {
        board = elem;
        //console.log(elem)
        elem.addEventListener("click", (e) => {
            //console.log("Clicou");
            switch(e.target.tagName){
                case "SPAN":
                    //console.log("celula");
                    //clickedBox(e.target);
                    if(clickedBox(e.target)) {
                        if(self.bot){
                            elem.style.pointerEvents = "none";

                            setTimeout(() => {
                                const emptyTiles = elem.querySelectorAll("span:empty");
                                const cell = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
                                //console.log(cell);
                                clickedBox(cell);
                                elem.style.pointerEvents = "";
                            }, 500);
                        }
                    }
                break;
                case "BUTTON":
                    //console.log("Botão");
                    play();
                break;
            }
        })
    }

    const play = () => {
        canPlay = true;
        self.turn = "x";
        self.text = texts[1];

        //esvaziando meu array
        game = [];

        //limpando  as celulas do tab
        const cells = board.querySelectorAll("span");
        //console.log(cells);
        for(let i = 0; i < cells.length; i++){
            cells[i].innerText = "";
        }

        self.buttonLabel = "Resetar"
    }

    const clickedBox = (element) => {
        const id = element.getAttribute("data-id");
        //console.log(id);
        if(!canPlay || game[id])
            return false;

        element.innerText = self.turn;
        game[id] = self.turn;

        if(self.turn == "x"){
            self.turn = "o";
        }else {
            self.turn = "x";
        }

        //funcao de vencedor
        const winner = checkMatching(1, 2, 3) ||
                        checkMatching(4, 5, 6) ||
                        checkMatching(7, 8, 9) ||
                        checkMatching(1, 4, 7) ||
                        checkMatching(2, 5, 8) ||
                        checkMatching(3, 6, 9) ||
                        checkMatching(1, 5, 9) ||
                        checkMatching(3, 5, 7);

        if(winner){
            self.turn = winner;
            self.text = texts[2];
            canPlay = false;
        }

        return true;
    }

    const checkMatching = (val1, val2, val3) => {
        if(game[val1] == game[val2] && game[val2] == game[val3]){
            return game[val1]
        }
    }

    const template = `
        <div>
            <h1>Jogo da Velha</h1>
            <p>
                Jogar contra o computador <input type="checkbox" checked  @bind="self.bot">
            </P>

            <div>
                <div class="gui">
                    <span class="gui__turn">{{self.turn}}</span>
                    <span>{{self.text}}</span>
                </div>

                <div class="board" @ready="self.init(this)">
                    <section class="board__column">
                        <span class="board__cell" data-id="1"></span>
                        <span class="board__cell" data-id="2"></span>
                        <span class="board__cell" data-id="3"></span>
                    </section>
                    
                    <section class="board__column">
                        <span class="board__cell" data-id="4"></span>
                        <span class="board__cell" data-id="5"></span>
                        <span class="board__cell" data-id="6"></span>
                    </section>

                    <section class="board__column">
                        <span class="board__cell" data-id="7"></span>
                        <span class="board__cell" data-id="8"></span>
                        <span class="board__cell" data-id="9"></span>
                    </section>
                    <button class="btn">{{self.buttonLabel}}</button>
                </div>
            </div>
        </div>
    `;
    
    return lemonade.element(template, self);
}
