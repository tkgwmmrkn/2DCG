/*
 * utils.js
 *
 * copyright; github.com@tkgwku, all rights reserved.
 */
 
var darkmode = false

function toggle_darkmode(){
	$("body").toggleClass("darkmode")
	darkmode = $("body").hasClass("darkmode")
}

function nume(str){
	let str2 = str.toLowerCase()//1.0E+02 => 1.0e+02
	return parseFloat(str2)
}

function makeSVG(tag, attrs) {
	let el= document.createElementNS('http://www.w3.org/2000/svg', tag)
	for (let k in attrs){
		el.setAttribute(k, attrs[k])
	}
	return el
}

function push_alert(msg, lvl, id){
	let style = "primary"
	if (lvl < 0){
		style = "secondary"
	} else if(lvl === 0) {
		style = "primary"
	} else if (lvl === 1) { 
		style = "success"
	} else if (lvl === 2) {
		style = "warning"
	} else if (lvl >= 3) {
		style = "danger"
	}
	let found = false
	$("#alertbox .alert-"+style).each(function(i, elem){
		if ($(elem).attr("data-id") === id){
			let c = parseInt($(elem).attr("data-count"))
			if (c === 1){
				$(elem).attr("data-count", "2").append($("<span>", {
					"class": "ml-2 badge badge-"+style
				}).text("2"))
			} else {
				$(elem).attr("data-count", (c+1)+"").find(".badge").text((c+1)+"")
			}
			found = true
		}
	})
	if (!found){
		$("<div>", {
			"data-id": id,
			"data-count": "1",
			"class": "alert alert-"+style+" alert-dismissible fade show"
		}).html(msg).append($("<button>", {
			"type": "button",
			"class": "close", 
			"data-dismiss": "alert"
		}).html("&times;")).appendTo("#alertbox")
	}
}

function toggle_pastinput(e){
	$(e.target).toggleClass("disabled")
	refresh_pastinput()
}

function refresh_pastinput(){
	apditree = {}
	vertextree = {}
	mptree = {}
	boundarray = []
	$("[data-inputs]").each(function(i,elem){
		if ($(elem).hasClass("disabled")) return
		let _s = $(elem).attr("data-inputs").split(",")
		let dict = {}
		for (let i=0;i<_s.length;i++){
			let _a = _s[i].split("=")
			dict[_a[0]] = _a[1]
		}
		let kind = $(elem).attr("data-kind")
		if (kind === "boundary"){
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let fix = dict["fix"]
			addNCOND(x1,y1,x2,y2,fix)
		} else if (kind === "mp-fromxy"){
			let mm = parseInt(dict["mm"])
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let interval = parseFloat(dict["interval"])
			addMP_fromXY(mm,x1,y1,x2,y2,interval)
		} else if (kind === "mp-fromgrid"){
			let mm = parseInt(dict["mm"])
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let gridWidth = parseFloat(dict["gridWidth"])
			let numInGrid = parseInt(dict["numInGrid"])
			let is_lb_tri = dict["is_lb_tri"] === "1"
			let is_rb_tri = dict["is_rb_tri"] === "1"
			addMP_fromGrid(mm,x1,y1,x2,y2,gridWidth,numInGrid,is_lb_tri,is_rb_tri)
		} else if (kind === "apdi"){
			let mm = parseInt(dict["mm"])
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let gridWidth = parseFloat(dict["gridWidth"])
			addSquareAPDI(mm, x1,y1,x2,y2,gridWidth)
		} else if (kind === "apdivb"){
			let mm = parseInt(dict["mm"])
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let width_left = parseFloat(dict["width_left"])
			let width_right = parseFloat(dict["width_right"])
			addVerticalAPDIBuffer(mm,x1,y1,x2,y2,width_left,width_right)
		} else if (kind === "apdihb"){
			let mm = parseInt(dict["mm"])
			let x1 = parseFloat(dict["x1"])
			let y1 = parseFloat(dict["y1"])
			let x2 = parseFloat(dict["x2"])
			let y2 = parseFloat(dict["y2"])
			let width_top = parseFloat(dict["width_top"])
			let width_bottom = parseFloat(dict["width_bottom"])
			addHorizontalAPDIBuffer(mm,x1,y1,x2,y2,width_top,width_bottom)
		}
	})
	convertMP()
	convertInputAPDI()
	convertNcond()
	drawRect()
}

function getHighlightRGB(rgb){
	let [r,g,b] = rgb.substring(4,rgb.length-1).split(",").map(s => parseInt(s))
	r = Math.max(parseInt(r*0.5), 0)
	g = Math.max(parseInt(g*0.5), 0)
	b = Math.max(parseInt(b*0.5), 0)
	return "rgb("+r+","+g+","+b+")"
}