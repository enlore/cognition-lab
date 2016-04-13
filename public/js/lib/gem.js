
d3.svg.gem = function() {

    var topLeft = d3_svg_gem_top_left,
        topRight = d3_svg_gem_top_right,
        bottomLeft = d3_svg_gem_bottom_left,
        bottomRight = d3_svg_gem_bottom_right,
        width =   d3_svg_gem_width,
        height =  d3_svg_gem_height;

    function gem() {

        var tl = topLeft.apply(this, arguments),
            tr = topRight.apply(this, arguments),
            bl = bottomLeft.apply(this, arguments),
            br = bottomRight.apply(this, arguments),
            w = width.apply(this, arguments),
            h = height.apply(this, arguments);

            var r = tl; // RM hack

            var p  = "M" + tl + ",0";
            p += "h" + (w - tl - tr);
            if (tr) { p += "a" + tr + "," + tr + " 0 0 1 " + tr + "," + tr; }
            else { p += "h" + tr; p += "v" + tr; }
            p += "v" + (h - tr - br);
            if (br) { p += "a" + br + "," + br + " 0 0 1 " + -br + "," + br; }
            else { p += "v" + br; p += "h" + -br; }
            p += "h" + (br + bl - w);
            if (bl) { p += "a" + bl + "," + bl + " 0 0 1 " + -bl + "," + -bl; }
            else { p += "h" + -bl; p += "v" + -bl; }
            p += "v" + (tl + bl - h);
            if (tl) { p += "a" + tl + "," + tl + " 0 0 1 " + tl + "," + -tl; }
            else { p += "v" + -tl; p += "h" + tl; }
            p += "z";

            return p;

    }


    gem.topLeft = function(v) {
        if (!arguments.length) return topLeft;
        topLeft = d3.functor(v);
        return gem;
    };

    gem.topRight = function(v) {
        if (!arguments.length) return topRight;
        topRight = d3.functor(v);
        return gem;
    };

    gem.bottomLeft = function(v) {
        if (!arguments.length) return bottomLeft;
        bottomLeft = d3.functor(v);
        return gem;
    };

    gem.bottomRight = function(v) {
        if (!arguments.length) return bottomRight;
        bottomRight = d3.functor(v);
        return gem;
    };

    gem.width = function(v) {
        if (!arguments.length) return width;
        width = d3.functor(v);
        return gem;
    };

    gem.height = function(v) {
        if (!arguments.length) return height;
        height = d3.functor(v);
        return gem;
    };

    return gem;
};



function d3_svg_gem_top_left(d) {
    return d.topLeft;
}

function d3_svg_gem_top_right(d) {
    return d.topRight;
}

function d3_svg_gem_bottom_left(d) {
    return d.bottomLeft;
}

function d3_svg_gem_bottom_right(d) {
    return d.bottomRight;
}

function d3_svg_gem_width(d) {
    return d.width;
}

function d3_svg_gem_height(d) {
    return d.height;
}