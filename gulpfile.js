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
    //debug: true,
    port: process.env.PORT || 3000
}

function spawner (cwd) {
    const shipper = spawn("release-it", ["--config=./.release.json", "-e"], {
        cwd: path.resolve(cwd)
    })

    shipper.stdout.on("data", (data) => { console.log(data.toString()) })
    shipper.stderr.on("data", (data) => { console.error(data.toString()) })

    return shipper
}

function serve () {
    console.log("serving")
    gp.connect.server(serverConfig)
}

function shipKakashi () {
    const sheep = spawner("src/app/lib/kakashi")
}

function shipVash () {
    const sheep = spawner("src/app/lib/vash")
}

function shipOhmu () {
    const sheep = spawner("src/app/lib/ohmu")
}

function shipRei () {
    const sheep = spawner("src/app/lib/rei")
}

function shipSeele () {
    const sheep = spawner("src/app/lib/seele")
}

function shipCatbus () {
    const sheep = spawner("src/app/lib/catbus")
}

function shipCognition () {}
