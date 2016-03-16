const path = require("path")

const g = require("gulp")
const gp = require("gulp-load-plugins")(g)
const spawn = require("child_process").spawn

const src = g.src.bind(g)
const dest = g.dest.bind(g)
const watch = g.watch.bind(g)
const task = g.task.bind(g)

const paths = {}

const defaultTasks = [
    "serve"
]

task("default", defaultTasks)

task("serve", serve)

task("ship-all", ships)

task("ship-kakashi", shipKakashi)
task("ship-vash", shipVash)
task("ship-ohmu", shipOhmu)
task("ship-rei", shipRei)
task("ship-catbus", shipCatbus)
task("ship-seele", shipSeele)
task("ship-cognition", shipCognition)

const ships = [
    "ship-kakashi",
    "ship-vash",
    "ship-ohmu",
    "ship-rei",
    "ship-catbus",
    "ship-seele",
    "ship-cognition"
]

const serverConfig = {
    //root: path.join(__dirname, "src"),
    root: "src",
    //fallback: path.join(__dirname, "src", "index.html"),
    //fallback: "index.html",
    debug: true,
    port: process.env.PORT || 3000
}

function serve () {
    console.log("serving")
    gp.connect.server(serverConfig)
}

function shipKakashi () {
    console.log("woo")
}

function shipVash () {}

function shipOhmu () {}

function shipRei () {}

function shipSeele () {}

function shipCatbus () {}

function shipCognition () {}
