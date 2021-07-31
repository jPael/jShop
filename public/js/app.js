window.onload = () => {
    const drawArea = document.getElementById("drawArea");

    setupBoard(drawArea);
};

const setupBoard = (board) => {
    if (window.innerHeight > window.innerWidth) {
        board.width = window.innerWidth;
        board.height = window.innerHeight * 0.5;
    } else {
        board.width = window.innerWidth * 0.5;
        board.height = window.innerHeight * 0.7;
    }
};

// async function submit(data) {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     };

//     const response = await fetch("/api", options);
//     const json = await response.json();
//     console.log(json);
// }
