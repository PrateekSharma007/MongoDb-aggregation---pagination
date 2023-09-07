// spawn -- creates new processes by commands arguments . 
const {exec,execFile,spawn,fork}  = require("child_process") ; 

//gives file in human readable format,small command
exec('dir /B', (error, stdout, stderr) => {
    if (error) {
        console.log(error);
        return;
    }
    if(stderr){
        console.log(stderr) ;
    }
    console.log(stdout);
});

// exec(" ",(error, stdout, stderr) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     if(stderr){
//         console.log(stderr) ;
//     }
//     console.log(stdout);}
// )

// const command = "cmd.exe";
// const args = ["/c", "dir", "/B"];


// const ls = spawn(command, args);


// ls.stdout.on("data", (data) => {
//     console.log(data.toString());
// });

// ls.stderr.on("data", (data) => {
//     console.error(data.toString());
// });


// ls.on("close", (code) => {
//     if (code === 0) {
//         console.log("Command completed successfully.");
//     } else {
//         console.error(`Command exited with code ${code}.`);
//     }
// });



// const child = fork("child.js");
// child.on("message", (message) => {
//     console.log(`Child sent: ${message}`);
// });
// child.send("Hello from parent!");





//fork is used for taking advantages for multi core processes. 
//built in messaging system


//execfile is safer but doesnt involve a shell

//spawn is used for long running processing it doenst buffer like exec