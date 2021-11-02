/*
 * mp_canvas.js
 *
 * copyright; github.com@tkgwku, all rights reserved.
 */
 
 /*
 TODO:
  - 横長バッファ実装
  - SVG defs 使用
  - SVG 色追加
  - contextmenu 色指定, 座標・IDを表示
 */
 
const canvas = document.getElementById("MPcanvas")
const color_fill_list = ["#c8e1fb", "#dccbf8", "#f6d4e4", "#f4d3d6", "#ded5ef", "#fbe1cc", "#fbefc9", "#d0e9d6", "#cef0e6", "#cde8ed"]
const color_list = ["#007bff","#6610f2","#dc3545","#fd7e14","#e83e8c","#ffc107","#28a745","#20c997","#6f42c1","#17a2b8"]
var canvasWidth = 1000
var canvasHeight
var offset
var mp_radius = 2
var lineWidth = 1
var bound_tri_width = 40
var minx
var maxx
var miny
var maxy

function makeTriangle(x, y, width, dire, id){
	let pos1, pos2
	if (dire === "-y"){
		pos1 = new Pos(Math.round(x + width * 0.5), Math.round(y - width * 0.866))
		pos2 = new Pos(Math.round(x - width * 0.5), Math.round(y - width * 0.866))
	} else if (dire === "+y"){
		pos1 = new Pos(Math.round(x + width * 0.5), Math.round(y + width * 0.866))
		pos2 = new Pos(Math.round(x - width * 0.5), Math.round(y + width * 0.866))
	} else if (dire === "-x"){
		pos1 = new Pos(Math.round(x - width * 0.866), Math.round(y + width * 0.5))
		pos2 = new Pos(Math.round(x - width * 0.866), Math.round(y - width * 0.5))
	} else if (dire === "+x"){
		pos1 = new Pos(Math.round(x + width * 0.866), Math.round(y + width * 0.5))
		pos2 = new Pos(Math.round(x + width * 0.866), Math.round(y - width * 0.5))
	}
	let tri = makeSVG("polygon", {
		"points": x+","+y+" "+pos1.x+","+pos1.y+" "+pos2.x+","+pos2.y,
		"data-x": x,
		"data-y": y,
		"data-dir": dire,
		"title": "境界表示を反転",
		"data-toggle": "tooltip",
		"data-id": id
	})
	tri.onclick = on_triangle_click
	return tri
}

function makeTriLine(x, y, width, dire, id){
	let pos1, pos2
	if (dire === "-y"){
		pos1 = new Pos(Math.round(x + width * 0.8), Math.round(y - width * 1.2))
		pos2 = new Pos(Math.round(x - width * 0.8), Math.round(y - width * 1.2))
	} else if (dire === "+y"){                                           
		pos1 = new Pos(Math.round(x + width * 0.8), Math.round(y + width * 1.2))
		pos2 = new Pos(Math.round(x - width * 0.8), Math.round(y + width * 1.2))
	} else if (dire === "-x"){
		pos1 = new Pos(Math.round(x - width * 1.2), Math.round(y + width * 0.8))
		pos2 = new Pos(Math.round(x - width * 1.2), Math.round(y - width * 0.8))
	} else if (dire === "+x"){
		pos1 = new Pos(Math.round(x + width * 1.2), Math.round(y + width * 0.8))
		pos2 = new Pos(Math.round(x + width * 1.2), Math.round(y - width * 0.8))
	}
	let tri = makeSVG("line", {
		"x1": pos1.x,
		"y1": pos1.y,
		"x2": pos2.x,
		"y2": pos2.y,
		"stroke-width": Math.max(Math.round(0.16 * width), lineWidth),
		"stroke": "black",
		"data-x": x,
		"data-y": y,
		"data-dir": dire,
		"title": "境界表示を反転",
		"data-toggle": "tooltip",
		"data-id": id
	})
	tri.onclick = on_triangle_click
	return tri
}

function drawRect(){
	$("#save_buttons").addClass("hidden")
	const rangeval = parseInt($("#mpcanvas_width").val())
	$("#MPcanvas").css({
		"width": Math.ceil(rangeval*$("#MPcanvas-wrapper").width()/100)
	})
	clearCanvas()
	if (Object.keys(mptree).length === 0) return
	minx = getMinX()
	maxx = getMaxX()
	miny = getMinY()
	maxy = getMaxY()
	if (minx === maxx || miny === maxy) return
	canvasWidth = parseInt($("#svg_reso").val())
	if (isNaN(canvasWidth) || canvasWidth < 1) {
		push_alert("SVGのキャンパス横幅の値が不正です", 2, "canvasnan")
		canvasWidth = 1000
	}
	if ($("#auto_mp_rad").prop("checked")){
		let gw = parseFloat($("#pref_grid").val())
		if (!isNaN(gw) && gw > 0){
			mp_radius = Math.max(Math.round(0.08 * canvasWidth * gw / (maxx - minx)), 2)
		} else {
			push_alert("MP円の半径の値を自動で入力するためには「設定」で計算格子幅を入力する必要があります", 2, "nogridwr")
			mp_radius = 2
		}
	} else {
		mp_radius = parseInt($("#mp_radius").val())
		if (isNaN(mp_radius) || mp_radius < 0) {
			push_alert("MP円の半径の値が不正です", 2, "mprnan")
			mp_radius = 2
		}
	}
	if ($("#auto_line_width").prop("checked")){
		let gw = parseFloat($("#pref_grid").val())
		if (!isNaN(gw) && gw > 0){
			lineWidth = Math.max(Math.round(0.02 * canvasWidth * gw / (maxx - minx)), 1)
		} else {
			push_alert("境界線の太さを自動で入力するためには「設定」で計算格子幅を入力する必要があります", 2, "nogridwbw")
			lineWidth = 1
		}
	} else {
		lineWidth = parseInt($("#line_width").val())
		if (isNaN(lineWidth) || lineWidth < 1) {
			push_alert("境界線の太さの値が不正です", 2, "lwnan")
			lineWidth = 1
		}
	}
	let fontsize
	if ($("#auto_fontsize").prop("checked")){
		let gw = parseFloat($("#pref_grid").val())
		if (!isNaN(gw) && gw > 0){
			fontsize = Math.max(Math.round(0.2 * canvasWidth * gw / (maxx - minx)), 10)
		} else {
			push_alert("文字サイズを自動で入力するためには「設定」で計算格子幅を入力する必要があります", 2, "nogridwf")
			fontsize = 0
		}
	} else {
		fontsize = parseInt($("#svg_fontsize").val())
		if (isNaN(fontsize) || fontsize < 0) {
			push_alert("文字サイズの値が不正です", 2, "fsnan")
			fontsize = 0
		}
	}
	bound_tri_width = parseInt($("#svg_bound").val())
	if (isNaN(bound_tri_width) || bound_tri_width < 1) {
		push_alert("境界条件の三角の一辺の値が不正です", 2, "btnan")
		bound_tri_width = 40
	}
	let svg_width = parseInt($("#svg_width").val())
	if (isNaN(svg_width) || svg_width < 1) {
		push_alert("SVGの拡大倍率の値が不正です", 2, "svgmnan")
		svg_width = 100
	}
	canvasHeight = Math.ceil((maxy - miny) * canvasWidth / (maxx - minx))
	offset = Math.round(2*(mp_radius + lineWidth*2 + bound_tri_width*1.1))
	let viewBoxMinX = 0
	let viewBoxMinY = 0
	let viewBoxMaxX = 2*offset + canvasWidth
	let viewBoxMaxY = 2*offset + canvasHeight
	let svg = makeSVG("svg", {
		"stroke-width": lineWidth
	})
	svg.appendChild(makeSVG("rect", {
		"x": viewBoxMinX,
		"y": viewBoxMinY,
		"width": viewBoxMaxX,
		"height": viewBoxMaxY,
		"fill": "white"
	}))
	let mmcolormap = get_mat_color_index_map()
	let apdikeys = Object.keys(apditree)
	for (let i = 0;i < apdikeys.length;i++){
		let apdi = apditree[apdikeys[i]]
		let v1 = apdi.v1
		let v2 = apdi.v2
		let v3 = apdi.v3
		let v4 = apdi.v4
		let tv1x = translateX(v1.pos.x)
		let tv1y = translateY(v1.pos.y)
		let tv2x = translateX(v2.pos.x)
		let tv2y = translateY(v2.pos.y)
		let tv3x = translateX(v3.pos.x)
		let tv3y = translateY(v3.pos.y)
		let tv4x = translateX(v4.pos.x)
		let tv4y = translateY(v4.pos.y)
		let color_index = mmcolormap[apdi.mp.mm]
		let points = tv1x+","+tv1y+" "+tv2x+","+tv2y+" "+tv3x+","+tv3y+" "+tv4x+","+tv4y+" "
		let polygon = makeSVG("polygon", {
			"data-toggle":"tooltip",
			"points": points,
			"fill" : color_fill_list[color_index],
			"stroke": color_list[color_index]
		})
		svg.appendChild(polygon)
	}
	let mm_num = Object.keys(mmcolormap).length
	let mpkeys = Object.keys(mptree)
	if (mp_radius > 0){
		for (let i = 0; i < mpkeys.length;i++){
			let mp = mptree[mpkeys[i]]
			let pos = mp.pos
			let tx = translateX(pos.x)
			let ty = translateY(pos.y)
			let color_index = mmcolormap[mp.mm] + mm_num
			let circle = makeSVG("circle", {
				"cx": tx,
				"cy": ty,
				"r": mp_radius,
				"fill" : color_fill_list[color_index],
				"stroke": color_list[color_index]
			})
			svg.appendChild(circle)
		}
	}
	if (fontsize > 0) {
		if ($("#write_apdiid").prop("checked")){
			for (let i = 0;i < apdikeys.length;i++){
				let apdi = apditree[apdikeys[i]]
				let text = makeSVG("text", {
					"data-toggle":"tooltip",
					"title": apdi.id+apdi.mp.pos.toString(),
					"x": translateX(apdi.mp.pos.x),
					"y": translateY(apdi.mp.pos.y),
					"class": "purplesvg",
					"font-size": fontsize
				})
				text.textContent = apdi.id+""
				svg.appendChild(text)
			}
		}
		if ($("#write_vid").prop("checked")){
			let vertexkeys = Object.keys(vertextree)
			for (let i = 0;i < vertexkeys.length;i++){
				let v = vertextree[vertexkeys[i]]
				let tx = translateX(v.pos.x)
				let ty = translateY(v.pos.y)
				let text = makeSVG("text", {
					"data-toggle":"tooltip",
					"title": v.id+v.pos.toString(),
					"x": tx,
					"y": ty,
					"class": "purplesvg",
					"font-size": fontsize
				})
				text.textContent = v.id+""
				svg.appendChild(text)
			}
		}
		if ($("#write_mpid").prop("checked")) {
			for (let i = 0; i < mpkeys.length;i++){
				let mp = mptree[mpkeys[i]]
				let pos = mp.pos
				let tx = translateX(pos.x)
				let ty = translateY(pos.y)
				let text = makeSVG("text", {
					"data-toggle":"tooltip",
					"title": mp.id+mp.pos.toString(),
					"x": tx,
					"y": ty,
					"class": "purplesvg",
					"font-size": fontsize
				})
				text.textContent = mp.id+""
				svg.appendChild(text)
			}
		}
	}
	if (boundarray.length > 0){
		for (let i = 0;i < boundarray.length;i++){
			let bound = boundarray[i]
			let pos1 = bound.pos1
			let pos2 = bound.pos2
			let tx1 = translateX(pos1.x)
			let ty1 = translateY(pos1.y)
			let tx2 = translateX(pos2.x)
			let ty2 = translateY(pos2.y)
			let xfix = bound.xfix
			let yfix = bound.yfix
			let line = makeSVG("line", {
				"x1": tx1,
				"y1": ty1,
				"x2": tx2,
				"y2": ty2,
				"stroke": color_list[2*mm_num]
			})
			svg.appendChild(line)
			let p1x,p1y,p2x,p2y
			if (tx1 === tx2){
				p1x = tx1
				p1y = Math.max(Math.min(ty1, ty2), viewBoxMinY)
				p2x = tx1
				p2y = Math.min(Math.max(ty1, ty2), viewBoxMaxY)
			} else if (ty1 === ty2){
				p1x = Math.max(Math.min(tx1, tx2), viewBoxMinX)
				p1y = ty1
				p2x = Math.min(Math.max(tx1, tx2), viewBoxMaxX)
				p2y = ty1
			}
			let quarter1_point_x = Math.round(0.25*(3*p1x+p2x))
			let quarter1_point_y = Math.round(0.25*(3*p1y+p2y))
			let quarter3_point_x = Math.round(0.25*(p1x+3*p2x))
			let quarter3_point_y = Math.round(0.25*(p1y+3*p2y))
			let ls = localStorage.getItem("svg_bound_"+pos1.toString()+"-"+pos2.toString())
			let dire
			if (xfix && yfix){
				if (pos1.x === pos2.x){
					dire = ls === "-x" ? "-x" : "+x"
				} else {
					dire = ls === "-y" ? "-y" : "+y"
				}
			} else if (xfix){
				dire = ls === "-x" ? "-x" : "+x"
			} else {
				dire = ls === "-y" ? "-y" : "+y"
			}
			let triid = pos1.toString()+"-"+pos2.toString()
			let triangle1 = makeTriangle(quarter1_point_x, quarter1_point_y, bound_tri_width, dire, triid)
			let triangle3 = makeTriangle(quarter3_point_x, quarter3_point_y, bound_tri_width, dire, triid)
			
			svg.appendChild(triangle1)
			if ((xfix && !yfix) || (yfix && !xfix)) svg.appendChild(makeTriLine(quarter1_point_x, quarter1_point_y, bound_tri_width, dire, triid))
			svg.appendChild(triangle3)
			if ((xfix && !yfix) || (yfix && !xfix)) svg.appendChild(makeTriLine(quarter3_point_x, quarter3_point_y, bound_tri_width, dire, triid))
		}
	}
	svg.setAttribute("viewBox", viewBoxMinX+" "+viewBoxMinY+" "+viewBoxMaxX+" "+viewBoxMaxY)
	svg.setAttribute("width", svg_width+"%")
	canvas.appendChild(svg)
	$('[data-toggle="tooltip"]').tooltip()
	$("#save_buttons").removeClass("hidden")
	
	fileread_state = false
}

function on_triangle_click(e){
	$('[data-toggle="tooltip"]').tooltip("hide")
	let elem = e.target
	let ddire = elem.getAttribute("data-dir")
	let dx = elem.getAttribute("data-x")
	let dy = elem.getAttribute("data-y")
	let did = elem.getAttribute("data-id")
	let dir
	if (ddire === "+y"){
		dir = "-y"
	} else if (ddire === "-y"){
		dir = "+y"
	} else if (ddire === "+x"){
		dir = "-x"
	} else if (ddire === "-x"){
		dir = "+x"
	}
	
	$("#MPcanvas svg polygon[data-id='"+did+"']").each(function(i,el){
		let ddx = el.getAttribute("data-x")
		let ddy = el.getAttribute("data-y")
		let tri_swapped = makeTriangle(parseInt(ddx), parseInt(ddy), bound_tri_width, dir, did)
		el.remove()
		$("#MPcanvas svg")[0].appendChild(tri_swapped)
	})
	$("#MPcanvas svg line[data-id='"+did+"']").each(function(i,el){
		let ddx = el.getAttribute("data-x")
		let ddy = el.getAttribute("data-y")
		let triline_swapped = makeTriLine(parseInt(ddx), parseInt(ddy), bound_tri_width, dir, did)
		el.remove()
		$("#MPcanvas svg")[0].appendChild(triline_swapped)
	})
	$('[data-toggle="tooltip"]').tooltip()
	
	if (dir === "-y" || dir === "-x") {
		localStorage.setItem("svg_bound_"+elem.getAttribute("data-id"), dir)
	} else {
		localStorage.removeItem("svg_bound_"+elem.getAttribute("data-id"))
	}
}

function translateX(x){
	return offset + Math.round((x - minx) * canvasWidth / (maxx - minx))
}

function translateY(y){
	return offset + canvasHeight - Math.round((y - miny) * canvasHeight / (maxy - miny))
}

function getMaxX(){
	let max = -1000000
	let vertexkeys = Object.keys(vertextree)
	for (let i = 0;i < vertexkeys.length;i++){
		let x = vertextree[vertexkeys[i]].pos.x
		max = Math.max(max, x)
	}
	let mpkeys = Object.keys(mptree)
	for (let i = 0; i < mpkeys.length;i++){
		let x = mptree[mpkeys[i]].pos.x
		max = Math.max(max, x)
	}
	for (let i = 0; i < boundarray.length;i++){
		max = Math.max(max, boundarray[i].pos1.x)
		max = Math.max(max, boundarray[i].pos2.x)
	}
	return max
}
function getMinX(){
	let min = 1000000
	let vertexkeys = Object.keys(vertextree)
	for (let i = 0;i < vertexkeys.length;i++){
		let x = vertextree[vertexkeys[i]].pos.x
		min = Math.min(min, x)
	}
	let mpkeys = Object.keys(mptree)
	for (let i = 0; i < mpkeys.length;i++){
		let x = mptree[mpkeys[i]].pos.x
		min = Math.min(min, x)
	}
	for (let i = 0; i < boundarray.length;i++){
		min = Math.min(min, boundarray[i].pos1.x)
		min = Math.min(min, boundarray[i].pos2.x)
	}
	return min
}
function getMaxY(){
	let max = -1000000
	let vertexkeys = Object.keys(vertextree)
	for (let i = 0;i<vertexkeys.length;i++){
		let y = vertextree[vertexkeys[i]].pos.y
		max = Math.max(max, y)
	}
	let mpkeys = Object.keys(mptree)
	for (let i = 0; i < mpkeys.length;i++){
		let y = mptree[mpkeys[i]].pos.y
		max = Math.max(max, y)
	}
	for (let i = 0; i < boundarray.length;i++){
		max = Math.max(max, boundarray[i].pos1.y)
		max = Math.max(max, boundarray[i].pos2.y)
	}
	return max
}
function getMinY(){
	let min = 1000000
	let vertexkeys = Object.keys(vertextree)
	for (let i = 0;i<vertexkeys.length;i++){
		let y = vertextree[vertexkeys[i]].pos.y
		min = Math.min(min, y)
	}
	let mpkeys = Object.keys(mptree)
	for (let i = 0; i < mpkeys.length;i++){
		let y = mptree[mpkeys[i]].pos.y
		min = Math.min(min, y)
	}
	for (let i = 0; i < boundarray.length;i++){
		min = Math.min(min, boundarray[i].pos1.y)
		min = Math.min(min, boundarray[i].pos2.y)
	}
	return min
}

function get_mat_color_index_map(){
	let map = {}
	let index = 0
	let mpkeys = Object.keys(mptree)
	for (let i = 0; i < mpkeys.length;i++){
		let mm = mptree[mpkeys[i]].mm
		if (!map.hasOwnProperty(mm)){
			map[mm] = index
			index++
		}
	}
	return map
}
	
function clearCanvas(){
	used_xy_px_for_every_x = {}
	used_xy_px_for_every_y = {}
     $(canvas).html("")
}