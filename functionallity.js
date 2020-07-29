
            let currentColor = "#000000";
            let drawingToggle = true;
            let eraseToggle = false;
            let currentPixel = null;
            let currentHeight = 10;
            let currentWidth = 10;
            let lastColor = null;

            //fill in color rows

            function switchToThis(e){
                if(lastColor){
                    lastColor.classList.remove("selectedColor");
                }
                currentColor = e.target.getAttribute('data-color');
                e.target.classList.add("selectedColor");
                lastColor = e.target;
            }
            let rowOneRef = document.querySelector("#rowOne").children;
            let rowTwoRef = document.querySelector("#rowTwo").children;

            for(i = 0; i < 8; i++){
                rowOneRef[i].style.backgroundColor = rowOneRef[i].getAttribute('data-color');
                rowOneRef[i].addEventListener("mousedown", switchToThis);
                rowTwoRef[i].style.backgroundColor = rowTwoRef[i].getAttribute('data-color');
                rowTwoRef[i].addEventListener("mousedown", switchToThis)
            }



            //custom color section
            let customColor = document.querySelector("#colorInput");
            customColor.addEventListener("change",switchColorCustom );

            function switchColorCustom(e){
                currentColor = e.target.value;
            }
            //custom color section


            //fil in color rows end

            //mouse down keep calling draw function area

            let canvas = document.querySelector("#canvas");
            var mousedownID = -1;  //Global ID of mouse down interval
            function mousedown(event) {
            if(mousedownID==-1)  //Prevent multimple loops!
                mousedownID = setInterval(whilemousedown, 10 /*execute every 100ms*/);


            }
            function mouseup(event) {
            if(mousedownID!=-1) {  //Only stop if exists
                clearInterval(mousedownID);
                mousedownID=-1;
            }

            }
            function whilemousedown() {
                action();
            }
            //Assign events
            canvas.addEventListener("mousedown", mousedown);
            canvas.addEventListener("mouseup", mouseup);

            //end of function to detect if mouse down to call draw
        

            function setCurrentPixel(e){
                currentPixel = e.target;

            }

            function action(){
                if(drawingToggle){
                    currentPixel.style.backgroundColor = currentColor;
                }
                if(eraseToggle){
                    currentPixel.style.backgroundColor = "";
                }
            }

            //buttons for draw and erase
            let drawButtonReference = document.querySelector("#drawToggleButton");
            let eraseButtonReference = document.querySelector("#eraseToggleButton")
            drawButtonReference.addEventListener("mousedown", drawToggleFunction);
            eraseButtonReference.addEventListener("mousedown", eraseToggleFunction);
            function drawToggleFunction(){
                drawingToggle = true;
                eraseToggle = false;

                drawButtonReference.classList.add("toggledButton");
                eraseButtonReference.classList.remove("toggledButton");

            }

            function eraseToggleFunction(){
                eraseToggle = true;
                drawingToggle = false;

                eraseButtonReference.classList.add("toggledButton");
                drawButtonReference.classList.remove("toggledButton");


            }

            //end toggle area
            

            //create canvas area



            function createBoard(height, width) {

                if(isNaN(height) || isNaN(width)){
                    console.log(typeof height);
                    alert("Please enter numbers.");
                    return;
                }

                if(height <= 0 || height >=41 || width <= 0 || width >= 41){
                    alert("Please only enter numbers from 1-40");
                    return;
                }

                currentHeight = height;
                currentWidth = width;



                const parentDiv = document.querySelector('#canvas');
                parentDiv.innerHTML = '';
                const heightPercent = 100/height + "%";
                const widthPercent = 100/width + "%";


                //create height rows
                for(i = 0; i < height; i++){
                    let currentRow = document.createElement("div");
                    currentRow.classList.add("row");
                    currentRow.style.height = heightPercent;

                    for(j = 0; j< width; j++){
                        let pixel = document.createElement("div");
                        pixel.classList.add("pixel");
                        pixel.style.width = widthPercent;
                        pixel.style.transitionDuration = "0.12s";
                        currentRow.appendChild(pixel);
                        pixel.addEventListener("mouseover", setCurrentPixel);
                    }
                    parentDiv.appendChild(currentRow);

                }

            }


            let widthInputReference = document.querySelector("#inputWidth");
            let heightInputRefrence = document.querySelector("#inputHeight");
            let createCanvasButtonReference = document.querySelector("#createCanvas");

            createCanvasButtonReference.addEventListener("mousedown", function(){createBoard(widthInputReference.value, heightInputRefrence.value)});


            //end create canvas area


            let clearButtonReference = document.querySelector("#clearButton");
            clearButtonReference.addEventListener("mousedown", clearBoard);


            function clearBoard(){
                createBoard(currentWidth, currentHeight);

            }

            //color selector area




            //default createboard
            createBoard(10,10);