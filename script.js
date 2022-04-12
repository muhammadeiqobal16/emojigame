// ELEMENT CATCHING
const playBtn = document.querySelector('.boxSpan .menu button');
const menu = document.querySelector('.boxSpan .menu');
const boxes = document.querySelectorAll('.box');
const container = document.getElementsByClassName('container')[0];
const timer = document.querySelector('.timer');
const timeLeft = document.querySelector('.timeleft');
const timerLtl = document.querySelector('.timerltl');
const timeLeftLtl = document.querySelector('.timeleftltl');



// DATA LIBRARIES
const emoji = ['😀', '😀', '😘', '😘', '😑', '😑', '🥰', '🥰', '😯', '😯', '😪', '😪', '😫', '😫', '😴', '😴'];

// MAIN FUNCTION
playBtn.addEventListener('click', function(){
    // 1.1 COUNT DOWN
    menu.textContent = 3;
    const countDown = setInterval(function(){
        if(menu.textContent>1){
            menu.textContent--
        } else{
            menu.textContent = 'GO!'
            clearInterval(countDown);
        }
    }, 1000)
    
    // 1.2 SHUFFLING
    const shuffling = setInterval(function(){
        const newEmoji = emoji.sort(()=> Math.random()-0.5)
        for(let i = 0; i<boxes.length; i++){
            boxes[i].innerHTML = `<span></span>${newEmoji[i]}`;
        }
    },100);
    
    // 2. GAME PROCESS
    setTimeout(function(){
        // A. STOP SHUFFLING
        clearInterval(shuffling);
        menu.parentElement.style.display = 'none';
        console.log(emoji);
    
        // B. CATCH SPAN ELEMENTS IN BOX CLASSES
        const spanBoxes = document.querySelectorAll('.box span');
        let tempVar;
    
        for(let spanBox of spanBoxes){
            spanBox.classList.add('clickable');
            spanBox.style.opacity = 1;
        }
    
        // C. GAME INTERACTION
        container.addEventListener('click', function(c){
            for(let i=0; i<spanBoxes.length; i++){
                if(spanBoxes[i].classList.contains('clicked')){
                    tempVar = spanBoxes[i].parentElement.textContent;
                    if(c.target.classList.contains('clickable')){
                        c.target.style.opacity = 0;
                        c.target.classList.remove('clickable');
                        c.target.classList.add('clicked');
                        if(c.target.parentElement.textContent==tempVar){
                            c.target.style.opacity = 0.5;
                            c.target.classList.remove('clicked');
                            c.target.classList.add('completed');
                            spanBoxes[i].style.opacity = 0.5;
                            spanBoxes[i].classList.remove('clicked');
                            spanBoxes[i].classList.add('completed');
                        } else if(c.target.parentElement.textContent!=tempVar){
                            c.target.style.opacity = 0;
                            setTimeout(function(){
                                c.target.style.opacity = 1;
                                c.target.classList.remove('clicked');
                                c.target.classList.add('clickable');
                            }, 300)
    
                            setTimeout(function(){
                                spanBoxes[i].style.opacity = 1;
                                spanBoxes[i].classList.remove('clicked');
                                spanBoxes[i].classList.add('clickable');
                            }, 300)
                        }

                    }
                } else if(i==spanBoxes.length-1){
                    if(c.target.classList.contains('clickable')){
                        c.target.style.opacity = 0;
                        c.target.classList.remove('clickable');
                        c.target.classList.add('clicked');
                    }
                }
            }
        })
    
        // GAME TIMER & RESULT DECISION PROCESS
        timer.textContent = 30;
        timerLtl.textContent = 30;
        timeLeft.textContent = 'Waktu Tersisa';
        timeLeftLtl.textContent = 'Waktu Tersisa:';

        const timeCount = setInterval(function(){
            if(timer.textContent>1){
                for(let i=0; i<spanBoxes.length; i++){
                    if(spanBoxes[i].classList.contains('clickable')){
                        if(timer.textContent<=11){
                            timer.style.color = 'red'
                            timerLtl.style.color = 'red'
                        }
                            timer.textContent--
                            timerLtl.textContent = timer.textContent;
                            return;
                    }else if(i==spanBoxes.length-1){
                        clearInterval(timeCount);
                        timer.textContent = 'GAME OVER';
                        timerLtl.textContent = 'GAME OVER';
                        menu.parentElement.style.display = 'inherit';
                        menu.style.width = `100%`;
                        menu.innerHTML = `<p><b>MENANG</b></p>
                        <p>Terima kasih sudah bermain ❤</p>
                        <div class="button">
                        <a class="endBtn" href="index.html">OK</a>
                        </div>`
                        return;
                    }
                }
            } else{
                clearInterval(timeCount);
                timer.textContent = 'GAME OVER';
                timerLtl.textContent = 'GAME OVER';
                menu.parentElement.style.display = 'inherit';
                menu.style.width = `100%`;
                menu.innerHTML = `<p><b>KALAH</b></p>
                <p>Ayo coba lagi, sayang ❤</p>
                <div class="button">
                <a class="endBtn" href="index.html">OK</a>
                </div>`
                return;
            }
        }, 1000)
    }, 3500);
})
