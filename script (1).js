const popups = []; // Array to store references to opened pop-up windows

function createPopup() {
    const width = 300;
    const height = 200;
    const left = Math.random() * (window.screen.width - width);
    const top = Math.random() * (window.screen.height - height);

    const newWindow = window.open(
        'about:blank',
        '_blank',
        `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Chaotic Pop-up</title>
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        font-family: sans-serif;
                        background-color: #ffcccc;
                        border: 2px solid red;
                    }
                </style>
            </head>
            <body>
                <h1>You Really ARE an Idiot!</h1>
            </body>
            </html>
        `);

        popups.push(newWindow);

        // Periodically move the pop-up
        const moveInterval = setInterval(() => {
            if (newWindow.closed) {
                clearInterval(moveInterval);
                // Remove closed window from the array
                const index = popups.indexOf(newWindow);
                if (index > -1) {
                    popups.splice(index, 1);
                }
                // Create more pop-ups when one closes
                for (let i = 0; i < 2; i++) { // Spawns 2 new pop-ups
                    createPopup();
                }
                return;
            }

            const newLeft = Math.random() * (window.screen.width - width);
            const newTop = Math.random() * (window.screen.height - height);
            newWindow.moveTo(newLeft, newTop);
        }, 500); // Move every 500ms
    }
}