function openApp(app) {
    document.getElementById(`window-${app}`).classList.remove("hidden");
}

function closeApp(app) {
    document.getElementById(`window-${app}`).classList.add("hidden");
}

// Terminal
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

input?.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value;
        handleCommand(cmd);
        input.value = "";
    }
});

function handleCommand(cmd) {
    let response = "";

    if (cmd === "help") response = "Commands: ls, clear, help";
    else if (cmd === "ls") response = "file1.txt file2.txt";
    else if (cmd === "clear") output.innerHTML = "";
    else response = "Unknown command";

    output.innerHTML += `<div>> ${cmd}</div><div>${response}</div>`;
}

// AI Chat (dummy)
document.getElementById("chat-input")?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const msg = e.target.value;

        document.getElementById("chat-box").innerHTML += `<div>You: ${msg}</div>`;

        const res = await fetch("http://localhost:5000/ai", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: msg})
        });

        const data = await res.json();

        document.getElementById("chat-box").innerHTML += `<div>AI: ${data.reply}</div>`;
        e.target.value = "";
    }
});
