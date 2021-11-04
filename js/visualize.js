
var vsvg
var vwidth = 5000
var vheight
var vxoffset
var vyoffset
var vmp_radius
var vlenx
var vleny
var visu_mode = "black"
var visu_fontcolor
var visu_num_steps
var visu_status = "ready"
var effval_min = 0
var effval_max = 300
var visu_linewidth = 2
var blockbyte, vpos_blockbyte

var legend_x = 500
var legend_y = 800//
var legend_width = 400//
var legend_height = 4000//
var lg_font_size = 160//
var visu_autoplay = false

var time = 0
var path_file = {}
var file_select_phase = "none"

const folderSVG = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"/><path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"/></svg>'
const folderopenSVG = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-folder2-open" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/></svg>'
const filetextSVG = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/><path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/></svg>'
const checkedSVG = '<span class="mr-2"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg></span>'
const uncheckedSVG = '<span class="mr-2"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/></svg></span>'

var v_config_file = null
var v_vpos_file = null
var v_output_file = null

var vconfig = {}
var vinvalid_config = []
var vmpvpos = {}

var autoplay_dt = 1
var autoplay_timeout = 10

function vtrx(x){
	return vxoffset + Math.round(x * vwidth / vlenx)
}

function vtry(y){
	return vyoffset + vheight - Math.round(y * vheight / vleny)
}

function get_lg(val){
	return "rgb("+ linear_grad_rgb(val, effval_max, effval_min).join(",") +")"
}

function get_lg_whiter(val, bal){
	let rgbval = linear_grad_rgb(val, effval_max, effval_min)
	return "rgb("+ rgbval.map(s => Math.round(bal*s + 255*(1-bal))).join(",") +")"
}

function get_lg_darker(val, bal){
	let rgbval = linear_grad_rgb(val, effval_max, effval_min)
	return "rgb("+ rgbval.map(s => Math.round(bal*s)).join(",") +")"
}

function get_lg_poly(val){
	return visu_mode === "white" ? get_lg_whiter(val, 0.5) : get_lg_darker(val, 0.85)
}

function get_lg_poly_stroke(val){
	return get_lg_darker(val, 0.5)
}

function linear_grad_rgb(val, maxval, minval){
	let r = 4*(val-minval)/(maxval-minval)
	if (r < 0){
		return [0,0,255]
	} else if (r < 1) {
		return [0,Math.round(r*255),255]
	} else if (r < 2) {
		return [0,255,Math.round(255-(r-1)*255)]
	} else if (r < 3) {
		return [Math.round((r-2)*255),255,0]
	} else if (r < 4) {
		return [255,Math.round(255-(r-3)*255),0]
	} else if (r < 5) {
		if (visu_mode === "white"){
			return [255,0,Math.round((r-4)*255)]
		} else {
			return [255,Math.round((r-4)*255),Math.round((r-4)*255)]
		}
	} else {
		if (visu_mode === "white"){
			return [255,0,255]
		} else {
			return [255,255,255]
		}
	}
}

function legend(){
	let len = parseInt($("#legend_len").val(), 10)
	if ($("#legend_e").prop("checked")){
		if (len < 6) {
			len = 6
		}
	}
	let defs = makeSVG("defs")
	let lg = makeSVG("linearGradient", {
		"id": "legend_grad",
		"x1": "0%",
		"y1": "0%",
		"x2": "0%",
		"y2": "100%"
	})
	let g1 = makeSVG("stop", {
		"offset": "0%",
		"stop-color": "rgb("+ linear_grad_rgb(5, 4, 0).join(",") +")" 
	})
	let g2 = makeSVG("stop", {
		"offset": "20%",
		"stop-color": "rgb("+ linear_grad_rgb(4, 4, 0)
	})
	let g3 = makeSVG("stop", {
		"offset": "40%",
		"stop-color": "rgb("+ linear_grad_rgb(3, 4, 0).join(",") +")" 
	})
	let g4 = makeSVG("stop", {
		"offset": "60%",
		"stop-color": "rgb("+ linear_grad_rgb(2, 4, 0).join(",") +")" 
	})
	let g5 = makeSVG("stop", {
		"offset": "80%",
		"stop-color": "rgb("+ linear_grad_rgb(1, 4, 0).join(",") +")" 
	})
	let g6 = makeSVG("stop", {
		"offset": "100%",
		"stop-color": "rgb("+ linear_grad_rgb(0, 4, 0).join(",") +")" 
	})
	let bg = makeSVG("rect", {
		"x": "0",
		"y": "0",
		"width": vxoffset+vwidth+160,
		"height": 2*vyoffset+vheight,
		"fill": visu_mode,
		"data-remove": "background"
	})
	let rect = makeSVG("rect", {
		"x": legend_x,
		"y": legend_y,
		"width": legend_width,
		"height": legend_height,
		"fill": "url(#legend_grad)"
	})
	
	lg.appendChild(g1)
	lg.appendChild(g2)
	lg.appendChild(g3)
	lg.appendChild(g4)
	lg.appendChild(g5)
	lg.appendChild(g6)
	defs.appendChild(lg)
	vsvg.appendChild(defs)
	vsvg.appendChild(bg)
	vsvg.appendChild(rect)
	
	for (let i = 0;i < 6;i++){
		let t0 = makeSVG("text", {
			"x": legend_x-100,
			"y": legend_y+Math.round(lg_font_size/2-2+legend_height*i/5),
			"font-size": lg_font_size,
			"fill": visu_fontcolor,
			"text-anchor": "end"
		})
		let value = effval_min+(effval_max-effval_min)*0.25*(5-i)
		if ($("#legend_e").prop("checked")){
			let expo = value.toExponential(len-5).toUpperCase()
			if (len < expo.length) {
				let n = len-expo.split("E")[1].length
				value = Math.round(value*10**n)/10**n
				expo = value.toExponential(len-5).toUpperCase()
			}
			t0.textContent = expo
		} else {
			let floatstr = value+""
			if (len < floatstr.length) {
				value = Math.round(value*10**(len-2))/10**(len-2)
				floatstr = value+""
			}
			t0.textContent = floatstr
		}
		vsvg.appendChild(t0)
	}
}

function read_config(){
	const reader = new FileReader()
	
	reader.addEventListener('load', (e) => {
		try {
			vconfig = {}
			vinvalid_config = []
			let str = Encoding.convert(e.target.result, 'UNICODE', 'SJIS')
			let lines = str.split("\n")
			let readerror = false
			
			for (let i = 0;i < lines.length;i++){
				const line = lines[i]
				const sl = line.split("#")
				if (sl.length !== 1) {
					const disc = sl[1]
					const value = sl[0]
					if (disc.startsWith(" 固相マテリアルポイントの数")){
						vconfig["smps"] = parseInt(value)
					} else if (disc.startsWith(" APDIを用いる")) {
						vconfig["use_apdi"] = value.startsWith("y")
					} else if (disc.startsWith(" X方向背景計算格子長さ")){
						vconfig["xlen"] = parseFloat(value)
					} else if (disc.startsWith(" Y方向背景計算格子長さ")){
						vconfig["ylen"] = parseFloat(value)
					} else if (disc.startsWith(" 計算格子幅")){
						vconfig["gridw"] = parseFloat(value)
					} else if (disc.startsWith(" MPM初期粒子支配領域の幅") || disc.startsWith(" 初期粒子支配領域の幅")){
						vconfig["doc"] = parseFloat(value)
					}
				}
			}
			readerror = config_input_confirm("smps") || readerror
			readerror = config_input_confirm("xlen") || readerror
			readerror = config_input_confirm("ylen") || readerror
			readerror = config_input_confirm("gridw") || readerror
			readerror = config_input_confirm("doc") || readerror
			
			if (!vconfig.hasOwnProperty("use_apdi")){
				vconfig["use_apdi"] = false
			}
		
			time = 1
			if (readerror) {
				push_alert("configファイルの読み込みに失敗. 手動で入力してください", 2, "readconfigerror")
				$("#visu_config_error").removeClass("hidden")
			} else {
				vconfig["tnd"] = Math.round((vconfig["xlen"]/vconfig["gridw"] + 1)*(vconfig["ylen"]/vconfig["gridw"] + 1))
				read_vpos()
			}
		} catch (e) {
			push_alert(e.toString(), 3, "resulterror")
		}
	})
	
	reader.onerror = function(){
		push_alert("configファイルの読み込みに失敗. プロセスが使用中であるか，読み込み後に内容が変更された可能性があります．", 3, "resulterror")
	}
	reader.readAsBinaryString(v_config_file)
}

function config_input_confirm(id){
	if (!vconfig.hasOwnProperty(id) || isNaN(vconfig[id])){
		vinvalid_config.push(id)
		$(`#visu_config_${id}`).parent().removeClass("hidden")
		$(`#visu_config_${id}`).trigger("change")
		return true
	}
	$(`#visu_config_${id}`).parent().addClass("hidden")
	return false
}

function read_vpos(){
	try {
		if (v_vpos_file !== null){
			const testslice = v_vpos_file.slice(0, 1000, "")
			
			testslice.text().then(testtext => {
				const test_lines = testtext.split("\n")
				visu_status = "loading_vpos"
				const timebyte = test_lines[0].length-1
				const databyte = test_lines[1].length-1
				if (vpos_blockbyte == null){
					vpos_blockbyte = timebyte+2+(databyte+2)*vconfig["smps"]
				}
				const startbyte = (time - 1) * vpos_blockbyte
				const endbyte   =  time      * vpos_blockbyte-2
				const slice = v_vpos_file.slice(startbyte, endbyte, "")
				
				slice.text().then(text => {
					try {
						const lines = text.split("\n")
						for (let i = 1;i < lines.length;i++){
							const line = lines[i]
							const s = line.replace(/^\s+/g, "").replace(/\s+/g, " ").split(" ")
							
							if (s.length < 9){break}
							const mpid = parseInt(s[0])
							const v1x = nume(s[1])
							const v1y = nume(s[2])
							const v2x = nume(s[3])
							const v2y = nume(s[4])
							const v3x = nume(s[5])
							const v3y = nume(s[6])
							const v4x = nume(s[7])
							const v4y = nume(s[8])
							vmpvpos[mpid] = [v1x,v1y,v2x,v2y,v3x,v3y,v4x,v4y]
						}
						vpos_blockbyte = timebyte+2+(databyte+2)*(Object.keys(vmpvpos).length)
						read_output()
					} catch (e) {
						push_alert(e.toString(), 3, "readvpospromiseerror")
						visu_status = "ready"
					}
				})
			}).catch((e)=>{
				push_alert(e.toString(), 3, "readvposerror")
				visu_status = "ready"
			})
		} else {
			time = 1
			read_output()
		}
	} catch (e) {
		push_alert(e.toString(), 3, "readvposerror")
		visu_status = "ready"
	}
}

function read_output(){
	try {
		visu_status = "loading_output"
		$("[data-id=visu_time]").val(time)
		visu_mode = $("#visu_white").prop("checked") ? "white" : "black"
		visu_fontcolor = visu_mode==="white"?"black":"white"
		vlenx = vconfig["xlen"]
		vleny = vconfig["ylen"]
		vmp_radius = Math.ceil(vconfig["doc"] * 0.4 * vwidth / vlenx)
		if (vmp_radius === 0) {vmp_radius = 1}
		legend_x = parseInt($("#legend_x").val(), 10)
		vxoffset = 2*vmp_radius+legend_x+legend_width+100
		vyoffset = 2*vmp_radius+300
		vheight = Math.ceil(vleny * vwidth / vlenx)
		if (vheight < legend_y + legend_height) {
			vyoffset = 2*vmp_radius+ 400 + legend_height - vheight
		}
		vsvg = makeSVG("svg", {
			"viewBox": "0 0 "+(vxoffset+vwidth+160)+" "+(2*vyoffset+vheight)
		})
		//register_wheel()
		//register_pan()
		//リセットがない.
		if (!$("#auto_legend").prop("checked")){
			effval_min = parseFloat($("#legend_min").val())
			effval_max = parseFloat($("#legend_max").val())
		}
		legend()
		let vsvgpalette = makeSVG("rect", {
			"x": vtrx(0),
			"y": vtry(vleny),
			"width": vwidth,
			"height": vheight,
			"fill": visu_mode,
			"data-remove": "background"
		})
		vsvgpalette.addEventListener("mouseleave", (e) => {
			if (e.toElement && e.toElement.tagName !== "circle"){
				$("#visu_data_indi")[0].textContent = ""
			}
			const ch = $("circle[data-hl=circle_highlight]")[0]
			if (typeof ch !== typeof undefined) { 
				ch.setAttribute("r", vmp_radius)
				ch.removeAttribute("stroke")
				ch.removeAttribute("stroke-width")
				ch.removeAttribute("data-hl")
			}
			const p = $("polygon[data-hl=poly_highlight]")[0]
			if (typeof p !== typeof undefined) {
				p.setAttribute("stroke-width", visu_linewidth)
				p.removeAttribute("data-hl")
			}
		})
		vsvg.appendChild(vsvgpalette)
		
		const test_slice = v_output_file.slice(0, 1000, "")
		test_slice.text().then(test_text => {
			const test_lines = test_text.split("\n")
			const timebyte = test_lines[0].length-1
			const databyte = test_lines[1].length-1
			if ($("#visu_griddata").prop("checked")){
				blockbyte = timebyte+2+(databyte+2)*vconfig["tnd"]
			} else {
				blockbyte = timebyte+2+(databyte+2)*vconfig["smps"]
			}
			visu_num_steps = Math.floor(v_output_file.size/blockbyte)
			const startbyte = (time - 1) * blockbyte
			const endbyte   =  time      * blockbyte -2
			let slice = v_output_file.slice(startbyte, endbyte, "")
			slice.text().then(text => {
				try {
					const lines = text.split("\n")
					const comment = lines[0]
					let timelabel = makeSVG("text", {
						"x": 100,
						"y": 100+lg_font_size,
						"font-size": lg_font_size,
						"fill": visu_fontcolor,
						"id": "vsvg_time"
					})
					timelabel.textContent = comment + " / " + v_output_file.name
					vsvg.appendChild(timelabel)
					
					let cgroup = makeSVG("g")
					let pgroup = makeSVG("g")
					
					const data_index = parseInt($("#visu_data").val())-1
					const x_index = parseInt($("#visu_xcoord").val())-1
					const y_index = parseInt($("#visu_ycoord").val())-1
					
					for (let i = 1;i < lines.length;i++){
						const line = lines[i]
						let s = line.replace(/\s+/g, " ").replace(/^\s/g, "").split(" ")
						if (s[data_index]==="**********"){
							s[data_index]=9999
						}
						const datafloat = nume(s[data_index])
						const rgb = get_lg(datafloat)
						const mpx = nume(s[x_index])
						const mpy = nume(s[y_index])
						const cx = vtrx(mpx)
						const cy = vtry(mpy)
						if (vmpvpos.hasOwnProperty(i) && !$("#visu_griddata").prop("checked")){
							//is apdi
							const vs = vmpvpos[i]
							const poly = makeSVG("polygon", {
								"points": vtrx(vs[0])+","+vtry(vs[1])+" "+vtrx(vs[2])+","+vtry(vs[3])+" "+vtrx(vs[4])+","+vtry(vs[5])+" "+vtrx(vs[6])+","+vtry(vs[7]),
								"fill": get_lg_poly(datafloat),
								"stroke": get_lg_poly_stroke(datafloat),
								"stroke-width": visu_linewidth,
								"data-f": datafloat+ " at (" +mpx+", "+mpy+")",
								"id": "vsvg_poly"+i
							})
							poly.onmouseover = (e) => {
								const datastr = e.target.dataset.f
								$("#visu_data_indi")[0].textContent = datastr
								const ch = $("circle[data-hl=circle_highlight]")[0]
								if (typeof ch !== typeof undefined) {
									ch.setAttribute("r", vmp_radius)
									ch.removeAttribute("stroke")
									ch.removeAttribute("stroke-width")
									ch.removeAttribute("data-hl")
								}
								const p = $("polygon[data-hl=poly_highlight]")[0]
								if (typeof p !== typeof undefined) {
									p.setAttribute("stroke-width", visu_linewidth)
									p.removeAttribute("data-hl")
								}
								e.target.setAttribute("stroke-width", Math.round(vmp_radius/2))
								e.target.setAttribute("data-hl", "poly_highlight")
								e.target.parentNode.appendChild(e.target)
							}
							pgroup.appendChild(poly)
						} else {
							//is not apdi
							let circle = makeSVG("circle", {
								"cx": cx,
								"cy": cy,
								"r": vmp_radius,
								"fill": rgb,
								"data-f": datafloat+ " at (" +mpx+", "+mpy+")",
								"id": "vsvg_circle"+i,
							})
							circle.onmouseover = (e) => {
								const datastr = e.target.dataset.f
								$("#visu_data_indi")[0].textContent = datastr
								const ch = $("circle[data-hl=circle_highlight]")[0]
								if (typeof ch !== typeof undefined) {
									ch.setAttribute("r", vmp_radius)
									ch.removeAttribute("stroke")
									ch.removeAttribute("stroke-width")
									ch.removeAttribute("data-hl")
								}
								const p = $("polygon[data-hl=poly_highlight]")[0]
								if (typeof p !== typeof undefined) {
									p.setAttribute("stroke-width", visu_linewidth)
									p.removeAttribute("data-hl")
								}
								const rgb = e.target.getAttribute("fill")
								e.target.setAttribute("r", vmp_radius * 2)
								e.target.setAttribute("stroke-width", Math.round(vmp_radius/2))
								e.target.setAttribute("stroke", getHighlightRGB(rgb))
								e.target.setAttribute("data-hl", "circle_highlight")
								e.target.parentNode.appendChild(e.target)
							}
							cgroup.appendChild(circle)
						}
					}
					vsvg.appendChild(pgroup)
					vsvg.appendChild(cgroup)
					let text_data = makeSVG("text", {
						"x": 100,
						"y": 2*vyoffset+vheight-260,
						"font-size": lg_font_size,
						"fill": visu_fontcolor,
						"id": "visu_data_indi"
					})
					vsvg.appendChild(text_data)
					$("#visualize").append(vsvg)
					$("#visualize").removeClass("hidden")
					if ($("#visualize svg").length > 1){
						$("#visualize svg:first").remove()
					}
					visu_status = "ready"
					visu_refresh_size()
					$("[data-id=visu_seekbar]").val(Math.ceil(time*100/visu_num_steps)/100)
				} catch (e) {
					push_alert(e.toString(), 3, "readoutputpromiseerror")
					visu_status = "ready"
				}
			}).catch((e)=>{
				push_alert(e.toString(), 3, "readoutputerror")
				visu_status = "ready"
			})
		}).catch((e)=>{
			push_alert(e.toString(), 3, "readoutputerror")
			visu_status = "ready"
		})
	} catch (e) {
		push_alert(e.toString(), 3, "readoutputerror")
		visu_status = "ready"
	}
}

function register_wheel(){
	vsvg.addEventListener("wheel", ev => {
		ev.preventDefault()
		const viewboxattr = vsvg.getAttribute("viewBox").split(" ").map(s => parseFloat(s))
		const zoom_cx = viewboxattr[0] + viewboxattr[2] * ev.offsetX / vsvg.clientWidth
		const zoom_cy = viewboxattr[1] + viewboxattr[3] * ev.offsetY / vsvg.clientHeight
		const scale = Math.pow(1.02, ev.deltaY/100)
		const zoomed_width = viewboxattr[2] * scale
		const zoomed_height = viewboxattr[3] * scale
		const zoomed_minx = zoom_cx + scale * (viewboxattr[0] - zoom_cx)
		const zoomed_miny = zoom_cy + scale * (viewboxattr[1] - zoom_cy)
		vsvg.setAttribute("viewBox", zoomed_minx+" "+zoomed_miny+" "+zoomed_width+" "+zoomed_height)
	});
}

var pan = false
var moving = false
var inertia = false
var dx, dy
var mov_upd8_timeout

function register_pan(){
	vsvg.addEventListener("mousedown", function(ev){
		ev.preventDefault()
		pan = true
		inertia = false
	})
	vsvg.addEventListener("mousemove", function(ev){
		if (pan){
			ev.preventDefault()
			const viewboxattr = vsvg.getAttribute("viewBox").split(" ").map(s => parseFloat(s))
			dx = ev.movementX
			dy = ev.movementY
			const newminx = viewboxattr[0] - dx * viewboxattr[2] / vsvg.clientWidth
			const newminy = viewboxattr[1] - dy * viewboxattr[3] / vsvg.clientHeight
			vsvg.setAttribute("viewBox", newminx+" "+newminy+" "+viewboxattr[2]+" "+viewboxattr[3])
			moving = true
			if (mov_upd8_timeout !== null){
				clearTimeout(mov_upd8_timeout)
			}
			mov_upd8_timeout = setTimeout(()=>{
				moving = false
				mov_upd8_timeout = null
				dx = 0
				dy = 0
			}, 100)
		}
	})
	vsvg.addEventListener("mouseup", function(ev){
		ev.preventDefault()
		if (pan) {
			pan = false
			inertia = true
			setTimeout(inertia_pan, 10)
		}
	})
}

function inertia_pan(){
	if (inertia){
		dx = dx*0.96
		dy = dy*0.96
		if (Math.abs(dx) > 0.01 && Math.abs(dy) > 0.01){
			const viewboxattr = vsvg.getAttribute("viewBox").split(" ").map(s => parseFloat(s))
			const newminx = viewboxattr[0] - dx * viewboxattr[2] / vsvg.clientWidth
			const newminy = viewboxattr[1] - dy * viewboxattr[3] / vsvg.clientHeight
			vsvg.setAttribute("viewBox", newminx+" "+newminy+" "+viewboxattr[2]+" "+viewboxattr[3])
			setTimeout(inertia_pan, 10)
		} else {
			dx = 0
			dy = 0
			inertia = false
		}
	}
}

function on_folder_dropped(files){
	if (files.length === 0) {
		push_alert("ファイル未選択", 1, "webkitrp")
		return
	}
	if (!files[0].webkitRelativePath){
		push_alert("IEやMicrosoft Edge, FirefoxなどのブラウザではwebkitRelativePath機能は制限されています. ファイルを選択する際, フォルダで一括に選択するにはGoogle Chrome等を使いっていただければと思います.", 3, "webkitrp")
		return
	}
	
	let tree = new Directory("root")
	
	for (let i = 0;i < files.length;i++){
		let file = files[i]
		if (!/\.dat$/i.test(file.name)) continue
		let path = file.webkitRelativePath
		let _s = path.split("/")
		path_file[path] = file
		propagate(tree, _s, 0, file)
	}
	
	if (tree.children.length === 0){
		push_alert("結果データの読み込みに失敗しました.", 3, "visnotfound")
		return
	}
	
	let ul = $("<ul>",{
		"class": "construction",
		"id": "filetree_ul"
	})
	
	render_recursive(tree, ul)
	
	$("#filetree").html("")
	$("#file_select").html("")
	ul.children().children().removeClass("hidden")
	$("#filetree").append(ul)
	$("#file_select").append($("<p>", {
		"html": uncheckedSVG + "1. configファイルを選択",
		"id": "select_config"
	}))
	file_select_phase = "config"
	$("#readresultsettings").removeClass("hidden")
}

function on_file_selected(file){
	if (file_select_phase === "config"){
		$("#select_config").addClass("text-success")
		$("#select_config").html(checkedSVG+"1. configファイルを選択 ("+escape_HTML_special_chars(file.webkitRelativePath)+")")
		
		$("#file_select").append($("<p>", {
			"html": uncheckedSVG + "2. 頂点時系列データvertex_posファイルを選択 または",
			"id": "select_vpos"
		}).append($("<span>",{
			"text": "スキップ",
			"class": "underline ml-1 pointer"
		}).on('click', function(e){
			if (file_select_phase === "vpos"){
				on_file_selected(null)
			}
		})))
		file_select_phase = "vpos"
		v_config_file = file
	} else if (file_select_phase === "vpos"){
		$("#select_vpos").addClass("text-success")
		if (file == null) {
			$("#select_vpos").html(checkedSVG+"2. 頂点時系列データvertex_posファイルを選択 または<span class=\"ml-1\">スキップ</span> (なし)")
		} else {
			$("#select_vpos").html(checkedSVG+"2. 頂点時系列データvertex_posファイルを選択 または<span class=\"ml-1\">スキップ</span> ("+escape_HTML_special_chars(file.webkitRelativePath)+")")
		}
		
		$("#file_select").append($("<p>", {
			"html": uncheckedSVG + "3. 読み込む結果データファイルを選択",
			"id": "select_output"
		}))
		file_select_phase = "output"
		v_vpos_file = file
	} else if (file_select_phase === "output"){
		if (typeof $("#select_output").attr("data-path") !== typeof undefined){
			$("span[data-path]").each(function(i,elem){
				if ($(elem).attr("data-path") === $("#select_output").attr("data-path")){
					$(elem).parent().removeClass("text-success")
				}
			})
		}
		$("#select_output").addClass("text-success")
		$("#select_output").attr("data-path", file.webkitRelativePath)
		$("#select_output").html(checkedSVG+"3. 読み込む結果データファイルを選択 ("+escape_HTML_special_chars(file.webkitRelativePath)+") [変更可能]")
		v_output_file = file
		
		$("#visualize_settings").removeClass("hidden")
		read_config()
	}
}

function propagate(parent, _s, i, file){
	if (i+1 === _s.length){
		parent.appendChild(file)
	} else {
		let dir = parent.getDir(_s[i])
		if (dir === null){
			dir = new Directory(_s[i])
			parent.appendChild(dir)
		}
		propagate(dir, _s, i+1, file)
	}
}

function render_recursive(dir, parent_ul){
	dir.children.sort(function (a, b){
		if (a instanceof Directory){
			if (b instanceof Directory){
				return a.name.localeCompare(b.name, "ja")
			} else {
				return 1
			}
		} else {
			if (b instanceof Directory){
				return -1
			} else {
				return a.name.localeCompare(b.name, "ja")
			}
		}
	})
	for (let i = 0; i < dir.children.length; i++){
		let child = dir.children[i]
		let svgstr = filetextSVG
		if (child instanceof Directory){
			svgstr = folderSVG
		}
		let li = $("<li>")
			.append($("<span>").html(svgstr))
		let span = $("<span>", {
			"class": "pl-2 pointer"
		}).text(child.name)
		if (child instanceof Directory){
			span.on('click', function(e){
				if ($(e.target).next().hasClass("hidden")){
					$(e.target).prev().html(folderopenSVG)
					$(e.target).next().removeClass("hidden")
				} else {
					$(e.target).prev().html(folderSVG)
					$(e.target).next().addClass("hidden")
				}
			})
		} else {
			span.addClass("underline")
			span.attr("data-path", child.webkitRelativePath)
			span.on('click', function(e){
				if (file_select_phase !== "none" && !$(e.target).parent().hasClass("text-success")){
					$(e.target).parent().addClass("text-success")
					let file = path_file[$(e.target).attr("data-path")]
					on_file_selected(file)
				}
			})
		}
		span.appendTo(li)
		if (child instanceof Directory){
			let ul = $("<ul>", {
				"class": "hidden"
			})
			render_recursive(child, ul)
			ul.appendTo(li)
		}
		parent_ul.append(li)
	}
}


function update_with_reading_output(){
	visu_status = "not_visualized"
	try {
		if (zip_status === "monitoring"){
			add_zip_que(vsvg, false)
		}
		$("[data-id=visu_time]").val(time)
		$("[data-id=visu_seekbar]").val(Math.ceil(time*100/visu_num_steps)/100)

		const startbyte = (time - 1) * blockbyte
		const endbyte   =  time      * blockbyte -2
		let slice = v_output_file.slice(startbyte, endbyte, "")
		slice.text().then(text => {
			try {
				const lines = text.split("\n")
				const comment = lines[0]
				$("#vsvg_time")[0].textContent = comment + " / " + v_output_file.name
				
				const data_index = parseInt($("#visu_data").val())-1
				const x_index = parseInt($("#visu_xcoord").val())-1
				const y_index = parseInt($("#visu_ycoord").val())-1
				
				for (let i = 1;i < lines.length;i++){
					const line = lines[i]
					const s = line.replace(/\s+/g, " ").replace(/^\s/g, "").split(" ")
					const datafloat = nume(s[data_index])
					const rgb = get_lg(datafloat)
					const mpx = nume(s[x_index])
					const mpy = nume(s[y_index])
					const cx = vtrx(mpx)
					const cy = vtry(mpy)
					if (vmpvpos.hasOwnProperty(i) && !$("#visu_griddata").prop("checked")){
						//is apdi
						const vs = vmpvpos[i]
						let poly = $("#vsvg_poly"+i)[0]
						poly.setAttribute("points", vtrx(vs[0])+","+vtry(vs[1])+" "+vtrx(vs[2])+","+vtry(vs[3])+" "+vtrx(vs[4])+","+vtry(vs[5])+" "+vtrx(vs[6])+","+vtry(vs[7]))
						poly.setAttribute("stroke", get_lg_poly_stroke(datafloat))
						poly.setAttribute("fill", get_lg_poly(datafloat))
						poly.setAttribute("data-f", datafloat+ " at (" +mpx+", "+mpy+")")
					} else {
						//is not apdi
						let circle = $("#vsvg_circle"+i)[0]
						circle.setAttribute("cx", cx)
						circle.setAttribute("cy", cy)
						circle.setAttribute("fill", rgb)
						circle.setAttribute("data-f", datafloat+ "  at (" +mpx+", "+mpy+")")
					}
				}
				const ch = $("circle[data-hl=circle_highlight]")[0]
				if (typeof ch !== typeof undefined) {
					ch.setAttribute("stroke", getHighlightRGB(ch.getAttribute("fill")))
					$("#visu_data_indi")[0].textContent = ch.dataset.f
				}
				visu_status = "ready"
			} catch (e) {
				push_alert(e.toString(), 3, "readoutputpromiseerror")
				visu_status = "ready"
			}
		})
	} catch (e) {
		push_alert(e.toString(), 3, "readoutputpromiseerror")
		visu_status = "ready"
	}
}
function read_and_update_vpos(){
	try {
		if (v_vpos_file !== null){
			visu_status = "loading_vpos"
			const startbyte = (time - 1) * vpos_blockbyte
			const endbyte   =  time      * vpos_blockbyte-2
			let slice = v_vpos_file.slice(startbyte, endbyte, "")
			
			slice.text().then(text => {
				try {
					let lines = text.split("\n")
					for (let i = 1;i < lines.length;i++){
						let line = lines[i]
						let s = line.replace(/\s+/g, " ").replace(/^\s/g, "").split(" ")
						let mpid = parseInt(s[0])
						let v1x = nume(s[1])
						let v1y = nume(s[2])
						let v2x = nume(s[3])
						let v2y = nume(s[4])
						let v3x = nume(s[5])
						let v3y = nume(s[6])
						let v4x = nume(s[7])
						let v4y = nume(s[8])
						vmpvpos[mpid] = [v1x,v1y,v2x,v2y,v3x,v3y,v4x,v4y]
					}
					update_with_reading_output()
				} catch (e) {
					push_alert(e.toString(), 3, "readvpospromiseerror")
					visu_status = "ready"
				}
			})
		} else {
			update_with_reading_output()
		}
	} catch (e) {
		push_alert(e.toString(), 3, "readvposerror")
		visu_status = "ready"
	}
}

function visualize_autoplay(){
	if (visu_autoplay) {
		if (visu_status !== "ready") {//not visualized
			setTimeout(visualize_autoplay, autoplay_timeout)
		} else {
			time += autoplay_dt
			if (time > visu_num_steps){
				time = visu_num_steps
			} else {
				setTimeout(visualize_autoplay, autoplay_timeout)
			}
			read_and_update_vpos()
		}
	}
}

function visu_refresh_size(){
	const offse = $("#visualize").offset()
	let now_margin = $("#visualize").css("margin-left")
	if (typeof now_margin === typeof undefined){
		$("#visualize").css({
			"top": 0,
			"margin-left": -Math.floor(offse.left)+50+"px",
			"min-width": window.innerWidth-100,
			"max-height": window.innerHeight-100
		})
		$("#visualize svg").css({
			"max-height": window.innerHeight-102
		})
	} else {
		$("#visualize").css({
			"top": 0,
			"margin-left": parseFloat(now_margin)-Math.floor(offse.left)+50+"px",
			"min-width": window.innerWidth-100,
			"max-height": window.innerHeight-100
		})
		$("#visualize svg").css({
			"max-height": window.innerHeight-102
		})
	}
}