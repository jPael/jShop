window.onload = () => {
    const drawArea = document.getElementById("drawArea");
    const sock = io();

    setupBoard(drawArea, sock);
};

const setupBoard = (board, socket) => {
    if (window.innerHeight > window.innerWidth) {
        board.width = window.innerWidth;
        board.height = window.innerHeight * 0.5;
    } else {
        board.width = window.innerWidth * 0.5;
        board.height = window.innerHeight * 0.7;
    }

    const ctx = board.getContext("2d");
    const rect = board.getBoundingClientRect();
    const colors = document.querySelectorAll(".colors");
    const sizeSlider = document.querySelector("#size");
    const eraseAll = document.getElementById("eraser");
    const send = document.getElementById("send");

    //---- code for sending data to everyone connected to the board ----

    send.onclick = () => {
        // updateEveryone(ctx, socket);
        socket.emit("data", ctx);
        // socket.emit(
    };

    //---- code for the erase all button ----
    eraseAll.onclick = () => {
        ctx.clearRect(0, 0, board.width, board.height);
    };

    //----- code for getting the brush size from the range slider input ------
    sizeSlider.addEventListener("change", () => {
        brush_size = sizeSlider.value;
    });

    //---- code for getting the colors from the button  ----

    colors.forEach((color) => {
        color.addEventListener("click", () => {
            brush_color = color.getAttribute("id");
        });
    });

    //------ code for drawing on the board --------
    let drawing = false;

    let brush_size = 5;
    let brush_color = "black";

    board.addEventListener("mousedown", () => {
        drawing = true;
    });

    board.addEventListener("mouseup", () => {
        drawing = false;
    });

    board.addEventListener("mouseout", () => {
        drawing = false;
    });

    let x1 = 0;
    let y1 = 0;

    board.addEventListener("mousemove", (e) => {
        let x2 = e.clientX - rect.left;
        let y2 = e.clientY - rect.top;

        if (drawing) {
            socket.emit("data", {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                brush_color: brush_color,
                brush_size: brush_size,
            });
        }
        x1 = x2;
        y1 = y2;
    });

    socket.on("data", (data) => {
        // console.log(data);

        ctx.beginPath();
        ctx.strokeStyle = data.brush_color;
        ctx.moveTo(data.x1, data.y1);
        ctx.lineTo(data.x2, data.y2);
        ctx.lineWidth = data.brush_size;
        ctx.lineCap = "round";
        ctx.stroke();
    });
    // updateEveryone(ctx, socket);
};
