import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */

var server = require('http').Server(app);

server.listen(app.get("port"), () => {

    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

app.use(errorHandler());


export default server;
// module.exports=io;

