process.on('message', (msg) => {
    console.log(`Message from parent: ${msg.toString()}`);
    process.send("Hello from child");
});
