document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10;

    // Tetronimoes 
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2], 
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width * 2 + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


    let currentPosition = 4
    let currentRotation = 0

    // Select a Tetrominoe randomly and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]


    // draw the Tetromino
    function draw() {
        current.forEach(idx => {
            squares[currentPosition + idx].classList.add('tetromino')
        })
    }

    // undraw the Tetromino
    function undraw() {
        current.forEach(idx => {
            squares[currentPosition + idx].classList.remove('tetromino')
        })
    }


    // make Tetrominoes move downward every second
    timerId = setInterval(moveDown, 1000)

    function moveDown() {
        undraw();
        currentPosition += width
        draw();
        freeze();
    }

    //freeze function
    function freeze() {
        if (current.some(idx => squares[currentPosition + idx + width].classList.contains('taken'))) {
           current.forEach(idx => squares[currentPosition + idx].classList.add('taken')) 
           // start a new tetromino falling
           random = Math.floor(Math.random() * theTetrominoes.length)
           current = theTetrominoes[random][currentRotation]
           currentPosition = 4
           draw();
        }
    }

    // move the tetrominoe left, unless it is at the edge or there is a blockage
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(idx => (currentPosition + idx) % width === 0)

        if (!isAtLeftEdge) currentPosition -= 1

        if (current.some(idx => squares[currentPosition + idx].classList.contains('taken'))) {
            currentPosition += 1
        }
        
        draw();
    }

})