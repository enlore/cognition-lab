const path = require("path")

const g = require("gulp")
const gp = require("gulp-load-plugins")(g)
const spawn = require("child_process").spawn

const src = g.src.bind(g)
const dest = g.dest.bind(g)
const watch = g.watch.bind(g)
const task = g.task.bind(g)

const paths = {}

const defaultTasks = []

task("ship kakashi", () => {
    console.log("ship kakashi")
})
