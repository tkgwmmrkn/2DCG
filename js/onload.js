function onload(){
	let ls = localStorage.getItem("darkmode_switch")
	if (ls && ls !== "1"){
		//ONにする
		toggle_darkmode()
	}
	initLS()
	$("#toggler-addMP-fromXY").on('click', function(){
		if ($("#toggle-addMP-fromXY").hasClass("hidden")){
			$("#toggle-addMP-fromXY").prependTo("#inputs-div")
		}
		$("#toggler-addMP-fromXY .bi-plus").toggleClass("hidden")
		$("#toggler-addMP-fromXY .bi-minus").toggleClass("hidden")
		$("#toggle-addMP-fromXY").toggleClass("hidden")
	});
	$("#toggler-addMP-fromGrid").on('click', function(){
		if ($("#toggle-addMP-fromGrid").hasClass("hidden")){
			$("#toggle-addMP-fromGrid").prependTo("#inputs-div")
		}
		$("#toggler-addMP-fromGrid .bi-plus").toggleClass("hidden")
		$("#toggler-addMP-fromGrid .bi-minus").toggleClass("hidden")
		$("#toggle-addMP-fromGrid").toggleClass("hidden")
	});
	$("#toggler-addNCOND").on('click', function(){
		if ($("#toggle-addNCOND").hasClass("hidden")){
			$("#toggle-addNCOND").prependTo("#inputs-div")
		}
		$("#toggler-addNCOND .bi-plus").toggleClass("hidden")
		$("#toggler-addNCOND .bi-minus").toggleClass("hidden")
		$("#toggle-addNCOND").toggleClass("hidden")
	});
	$("#toggler-addAPDI").on('click', function(){
		if ($("#toggle-addAPDI").hasClass("hidden")){
			$("#toggle-addAPDI").prependTo("#inputs-div")
		}
		$("#toggler-addAPDI .bi-plus").toggleClass("hidden")
		$("#toggler-addAPDI .bi-minus").toggleClass("hidden")
		$("#toggle-addAPDI").toggleClass("hidden")
	});
	$("#toggler-addAPDIxbuffer").on('click', function(){
		if ($("#toggle-addAPDIxbuffer").hasClass("hidden")){
			$("#toggle-addAPDIxbuffer").prependTo("#inputs-div")
		}
		$("#toggler-addAPDIxbuffer .bi-plus").toggleClass("hidden")
		$("#toggler-addAPDIxbuffer .bi-minus").toggleClass("hidden")
		$("#toggle-addAPDIxbuffer").toggleClass("hidden")
	});
	$("#toggler-addAPDIybuffer").on('click', function(){
		if ($("#toggle-addAPDIybuffer").hasClass("hidden")){
			$("#toggle-addAPDIybuffer").prependTo("#inputs-div")
		}
		$("#toggler-addAPDIybuffer .bi-plus").toggleClass("hidden")
		$("#toggler-addAPDIybuffer .bi-minus").toggleClass("hidden")
		$("#toggle-addAPDIybuffer").toggleClass("hidden")
	});
	$("#toggler-pref").on('click', function(){
		if ($("#toggle-pref").hasClass("hidden")){
			$("#toggle-pref").prependTo("#inputs-div")
		}
		$("#toggler-pref .bi-plus").toggleClass("hidden")
		$("#toggler-pref .bi-minus").toggleClass("hidden")
		$("#toggle-pref").toggleClass("hidden")
	});
	$("#submit-addMP-fromXY").on('click', function(){
		let mm = parseInt($("#MPmat-fromXY").val())
		let x1 = parseFloat($("#MPx1-fromXY").val())
		let y1 = parseFloat($("#MPy1-fromXY").val())
		let x2 = parseFloat($("#MPx2-fromXY").val())
		let y2 = parseFloat($("#MPy2-fromXY").val())
		let interval = parseFloat($("#MPinterval-fromXY").val())
		if (isNaN(mm) || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(interval)) return
		addMP_fromXY(mm,x1,y1,x2,y2,interval)
		convertMP()
		convertInputAPDI()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "mp-fromxy")
			.attr("data-inputs", "mm="+mm+",x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",interval="+interval)
			.html("[MP] 材料番号: "+mm+", 粒子座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, "+interval+"おき")
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addMP-fromXY")
	});
	$("#submit-addMP-fromGrid").on('click', function(){
		let mm = parseInt($("#MPmat-fromGrid").val())
		let x1 = parseFloat($("#MPx1-fromGrid").val())
		let y1 = parseFloat($("#MPy1-fromGrid").val())
		let x2 = parseFloat($("#MPx2-fromGrid").val())
		let y2 = parseFloat($("#MPy2-fromGrid").val())
		let gridWidth = parseFloat($("#MPgridWidth-fromGrid").val())
		let numInGrid = parseInt($("#MPnumInGrid-fromGrid").val())
		let is_lb_tri = $("#lb-mp-fromgrid").prop("checked")
		let is_rb_tri = $("#rb-mp-fromgrid").prop("checked")
		let is_lt_tri = $("#lt-mp-fromgrid").prop("checked")
		let is_rt_tri = $("#rt-mp-fromgrid").prop("checked")
		if (isNaN(mm) || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(gridWidth) || isNaN(numInGrid)) return
		addMP_fromGrid(mm,x1,y1,x2,y2,gridWidth,numInGrid, is_lb_tri, is_rb_tri, is_lt_tri, is_rt_tri)
		convertMP()
		convertInputAPDI()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "mp-fromgrid")
			.attr("data-inputs", "mm="+mm+",x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",gridWidth="+gridWidth+",numInGrid="+numInGrid+",is_lb_tri="+(is_lb_tri?"1":"0")+",is_rb_tri="+(is_rb_tri?"1":"0"))
			.html("[MP] 材料番号: "+mm+", 格子座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, 格子幅: "+gridWidth+", 各格子に"+numInGrid+"粒子ずつ"+(is_lb_tri?", 左下三角":"")+(is_rb_tri?", 右下三角":""))
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addMP-fromGrid")
	});
	$("#submit-addAPDI").on('click', function(){
		let mm = parseInt($("#apdi_mm").val())
		let x1 = parseFloat($("#apdi_x1").val())
		let y1 = parseFloat($("#apdi_y1").val())
		let x2 = parseFloat($("#apdi_x2").val())
		let y2 = parseFloat($("#apdi_y2").val())
		let gridWidth = parseFloat($("#APDIgridWidth").val())
		if (isNaN(mm) || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(gridWidth)) return
		addSquareAPDI(mm, x1,y1,x2,y2,gridWidth)
		convertInputAPDI()
		convertMP()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "apdi")
			.attr("data-inputs", "mm="+mm+",x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",gridWidth="+gridWidth)
			.html("[APDI] 材料番号 : "+mm+", 座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, 幅 : "+gridWidth+"の正方形格子")
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addAPDI")
	})
	$("#submit-addAPDIxbuffer").on('click', function(){
		let mm = parseInt($("#apdibx_mm").val())
		let x1 = parseFloat($("#apdibx_x1").val())
		let y1 = parseFloat($("#apdibx_y1").val())
		let x2 = parseFloat($("#apdibx_x2").val())
		let y2 = parseFloat($("#apdibx_y2").val())
		let width_left = parseFloat($("#APDIgridWidthbxleft").val())
		let width_right = parseFloat($("#APDIgridWidthbxright").val())
		if (isNaN(mm) || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(width_left) || isNaN(width_right)) return
		addVerticalAPDIBuffer(mm,x1,y1,x2,y2,width_left,width_right)
		convertInputAPDI()
		convertMP()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "apdivb")
			.attr("data-inputs", "mm="+mm+",x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",width_left="+width_left+",width_right="+width_right)
			.html("[APDI] 材料番号 : "+mm+", 座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, 左側要素の要素幅 : "+width_left+", 右側要素の要素幅 : "+width_right+"の縦長バッファ要素")
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addAPDIxbuffer")
	})
	$("#submit-addAPDIybuffer").on('click', function(){
		let mm = parseInt($("#apdiby_mm").val())
		let x1 = parseFloat($("#apdiby_x1").val())
		let y1 = parseFloat($("#apdiby_y1").val())
		let x2 = parseFloat($("#apdiby_x2").val())
		let y2 = parseFloat($("#apdiby_y2").val())
		let width_top = parseFloat($("#APDIgridWidthbytop").val())
		let width_bottom = parseFloat($("#APDIgridWidthbybottom").val())
		if (isNaN(mm) || isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(width_top) || isNaN(width_bottom)) return
		addHorizontalAPDIBuffer(mm,x1,y1,x2,y2,width_top,width_bottom)
		convertInputAPDI()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "apdihb")
			.attr("data-inputs", "mm="+mm+",x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",width_top="+width_top+",width_bottom="+width_bottom)
			.html("[APDI] 材料番号 : "+mm+", 座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, 上要素の要素幅 : "+width_top+", 下要素の要素幅 : "+width_bottom+"の横長バッファ要素")
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addAPDIybuffer")
	})
	$("#savefile").on('click',function(){
		let data = $("#filecontent").text()
		if (data !== ""){			
			saveAsFile("input_mp.dat", data)
		}
	})
	$("#saveapdifile").on('click',function(){
		let data = $("#filecontent_apdi").text()
		if (data !== ""){			
			saveAsFile("input_apdi.dat", data)
		}
	})
	$("#savesvgfile").on('click',function(e){
		let svgclone = $("#MPcanvas").clone()
		if (svgclone.html() !== ""){
			if ($("#transparent").prop("checked")){
				svgclone.find("rect").remove()
			} 
			svgclone.find("svg").attr("xmlns","http://www.w3.org/2000/svg")	
			saveAsFile("MPM.svg", '<?xml version="1.0"?>'+svgclone.html())
		}
		e.preventDefault()
	})
	$("#savejpgfile").on('click',function(e){
		let svgclone = $("#MPcanvas").clone()
		if (svgclone.html() !== ""){
			svgclone.find("[data-original-title]").removeAttr("data-original-title")
			const mpsvg = svgclone.find("svg")[0]
			mpsvg.setAttribute("xmlns","http://www.w3.org/2000/svg")
			renderSVG(svgclone.find("svg")[0], (jpgURI)=>{
				saveURI(jpgURI, "MPM.jpg")
			}, 0.8)
		}
		e.preventDefault()
	})
	$("#savepngfile").on('click',function(e){
		let svgclone = $("#MPcanvas").clone()
		if (svgclone.html() !== ""){
			svgclone.find("[data-original-title]").removeAttr("data-original-title")
			if ($("#transparent").prop("checked")){
				svgclone.find("rect").remove()
			}
			svgclone.find("svg").attr("xmlns","http://www.w3.org/2000/svg")	
			renderSVG(svgclone.find("svg")[0], (pngURI)=>{
				saveURI(pngURI, "MPM.png")
			})
		}
		e.preventDefault()
	})
	$("#visu_savesvgfile").on('click',function(e){
		if (!$("#visualize").hasClass("hidden")){
			svgclone = vsvg.cloneNode(true)
			if ($("#visu_transparent").prop("checked")){
				$(svgclone).find("[data-remove=background]").remove()
			}
			const ch = $(svgclone).find("circle[data-hl=circle_highlight]")[0]
			if (typeof ch !== typeof undefined) {
				ch.setAttribute("r", vmp_radius)
				ch.removeAttribute("stroke")
				ch.removeAttribute("stroke-width")
				ch.removeAttribute("data-hl")
			}
			const p = $(svgclone).find("polygon[data-hl=poly_highlight]")[0]
			if (typeof p !== typeof undefined) {
				p.setAttribute("stroke-width", visu_linewidth)
			}
			const ti = $(svgclone).find("text[id=visu_data_indi]").remove()
			let data = new XMLSerializer().serializeToString(svgclone)
			saveAsFile("MPM.svg", '<?xml version="1.0"?>'+data)
		}
		e.preventDefault()
	})
	$("#visu_savejpgfile").on('click',function(e){
		if (!$("#visualize").hasClass("hidden")){
			svgclone = vsvg.cloneNode(true)
			if ($("#visu_transparent").prop("checked")){
				$(svgclone).find("[data-remove=background]").remove()
			}
			const ch = $(svgclone).find("circle[data-hl=circle_highlight]")[0]
			if (typeof ch !== typeof undefined) {
				ch.setAttribute("r", vmp_radius)
				ch.removeAttribute("stroke")
				ch.removeAttribute("stroke-width")
				ch.removeAttribute("data-hl")
			}
			const p = $(svgclone).find("polygon[data-hl=poly_highlight]")[0]
			if (typeof p !== typeof undefined) {
				p.setAttribute("stroke-width", visu_linewidth)
			}
			const ti = $(svgclone).find("text[id=visu_data_indi]").remove()
			renderSVG(svgclone, (pngURI)=>{
				saveURI(pngURI, "MPM.png")
			}, 0.8)
		}
		e.preventDefault()
	})
	$("#visu_savepngfile").on('click',function(e){
		if (!$("#visualize").hasClass("hidden")){
			svgclone = vsvg.cloneNode(true)
			if ($("#visu_transparent").prop("checked")){
				$(svgclone).find("[data-remove=background]").remove()
			}
			const ch = $(svgclone).find("circle[data-hl=circle_highlight]")[0]
			if (typeof ch !== typeof undefined) {
				ch.setAttribute("r", vmp_radius)
				ch.removeAttribute("stroke")
				ch.removeAttribute("stroke-width")
				ch.removeAttribute("data-hl")
			}
			const p = $(svgclone).find("polygon[data-hl=poly_highlight]")[0]
			if (typeof p !== typeof undefined) {
				p.setAttribute("stroke-width", visu_linewidth)
			}
			const ti = $(svgclone).find("text[id=visu_data_indi]").remove()
			renderSVG(svgclone, (pngURI)=>{
				saveURI(pngURI, "MPM.png")
			})
		}
		e.preventDefault()
	})
	$("#visu_savezipfile").on('click', function(){
		if ($("#visualize").hasClass("hidden")) return
		if (zip_status === "ready"){
			//start monitoring
			zip = new JSZip()
			zip_renban_folder = zip.folder("generated")
			zip_filename = "MPM"+time+".jpg"
			zip_status = "monitoring"
			zip_filecount = 0
			$("#rec_icon").addClass("hidden")
			$("#stop_icon").removeClass("hidden")
			$("#visu_zip_comment").text("フレームを監視中：0 frame")
		//stop rendering
		} else if (zip_status === "monitoring"){
			if (zip_filecount == 0){
				push_alert("Zip圧縮に失敗：画像が選択されていません．")
			}
			add_zip_que(vsvg, true)
			zip_status = "ready"
			$("#stop_icon").addClass("hidden")
			$("#rec_icon").removeClass("hidden")
		}
	})
	$("#submit-addNCOND").on('click', function(){
		let x1 = parseFloat($("#ncond_x1").val())
		let y1 = parseFloat($("#ncond_y1").val())
		let x2 = parseFloat($("#ncond_x2").val())
		let y2 = parseFloat($("#ncond_y2").val())
		let fix = $("input[name=sncond_fix]:checked").val()
		if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return
		if (x1 !== x2 && y1 !== y2) return
		addNCOND(x1,y1,x2,y2,fix)
		convertNcond()
		drawRect()
		$("<div>")
			.addClass("pastinput")
			.on('click', function(e){
				toggle_pastinput(e)
			})
			.attr("data-kind", "boundary")
			.attr("data-inputs", "x1="+x1+",y1="+y1+",x2="+x2+",y2="+y2+",fix="+fix)
			.html("[Boundary] 格子座標("+x1+", "+y1+")から("+x2+", "+y2+")まで, "+fix.substring(7,fix.length)+"軸固定")
			.prepend($("<button>", {
				"type": "button",
				"class": "close ml-2"
			}).html("&times;").on("click", function(e){
				$(e.target).parent().remove()
				refresh_pastinput()
			}))
			.appendTo("#pastinput-addNCOND")
	})
	$("#submit-preview").on('click', function(){
		if (input_mp_file != null && input_apdi_file != null && fileread_state){
			read_input_contents()
		} else {
			drawRect()
		}
	})
	$("#readinputapdi").on('change', function(e){
		const files = e.target.files
		if (files.length !== 1){
			push_alert("input_apdi.datを読み込めませんでした", 2)
			return
		}
		input_apdi_file = files[0]
		if (input_mp_file != null){
			read_input_contents()
		}
	})
	$("#readinputmp").on('change', function(e){
		const files = e.target.files
		if (files.length !== 1){
			push_alert("input_mp.datを読み込めませんでした", 2)
			return
		}
		input_mp_file = files[0]
		read_input_contents()
	})
	$("#readresult").on('change', function(e){
		const files = e.target.files
		on_folder_dropped(files)
	})
	$("#lb-mp-fromgrid").on('change', function(e){
		$("#rb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rb-mp-fromgrid", "0")
		$("#lt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lt-mp-fromgrid", "0")
		$("#rt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rt-mp-fromgrid", "0")
	})
	$("#rb-mp-fromgrid").on('change', function(e){
		$("#lb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lb-mp-fromgrid", "0")
		$("#lt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lt-mp-fromgrid", "0")
		$("#rt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rt-mp-fromgrid", "0")
	})
	$("#lt-mp-fromgrid").on('change', function(e){
		$("#lb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lb-mp-fromgrid", "0")
		$("#rb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rb-mp-fromgrid", "0")
		$("#rt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rt-mp-fromgrid", "0")
	})
	$("#rt-mp-fromgrid").on('change', function(e){
		$("#lb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lb-mp-fromgrid", "0")
		$("#rb-mp-fromgrid").prop("checked", false)
		localStorage.setItem("rb-mp-fromgrid", "0")
		$("#lt-mp-fromgrid").prop("checked", false)
		localStorage.setItem("lt-mp-fromgrid", "0")
	})
	$("[data-id=visu_time]").on('change', function(e){
		if (visu_status !== "ready") {
			$(e.target).val(time)
			return
		}
		let next_time = parseInt($(e.target).val())
		if (next_time >= visu_num_steps){
			next_time = visu_num_steps
			$(e.target).val(visu_num_steps)
		} else if (next_time < 0) {
			next_time=1
			$(e.target).val(1)
		}
		if (next_time !== time) {
			time = next_time
			read_and_update_vpos()
		}
	})
	$("[data-id=visu_next]").on('click', function(){
		if (visu_status !== "ready") return
		if (time < visu_num_steps){
			time++
			read_and_update_vpos()
		}
	})
	$("[data-id=visu_prev]").on('click', function(){
		if (visu_status !== "ready") return
		if (time > 1){
			time--
			read_and_update_vpos()
		}
	})
	$("[data-id=visu_first]").on('click', function(){
		if (visu_status !== "ready") return
		time = 1
		read_and_update_vpos()
	})
	$("[data-id=visu_play]").on('click', function(){
		setTimeout(visualize_autoplay, 400, 400)
		visu_autoplay = true
	})
	$("[data-id=visu_pause]").on('click', function(){
		visu_autoplay = false
	})
	$("[data-id=visu_seekbar]").on('change', function(e){
		if (visu_status !== "ready") {
			$(e.target).val(Math.ceil(time*100/visu_num_steps)/100)
			return
		}
		let next_time = Math.ceil(parseFloat($(e.target).val())*visu_num_steps)
		if (next_time !== time) {
			time = next_time
			read_and_update_vpos()
		}
	})
	$("#legend_e").on('change', function(e){
		if (parseInt($("#legend_len").val(), 10) < 6) {
			$("#legend_len").val(6)
		}
	})
	$("#visu_submit_setting").on('click', function(){
		if (visu_status !== "ready") {
			$("#visu_submit_invalid").text("実行できませんでした. もう一度お試しください.")
			$("#visu_submit_invalid").removeClass("hidden")
		} else {
			$("#visu_submit_invalid").addClass("hidden")
			if (v_vpos_file === null) {
				read_output()
			} else {
				read_vpos()
			}
		}
	})
	$("#darkmode_switch").on('change', function(){
		toggle_darkmode()
	})
	$("#mpcanvas_width").on('change', function(e){
		const rangeval = parseInt($(e.target).val())
		$("#MPcanvas").css({
			"width": Math.ceil(rangeval*$("#MPcanvas-wrapper").width()/100)
		})
	})
	window.onresize = function(){
		if (!$("#visualize").hasClass("hidden")){
			visu_refresh_size()
		}
	}
	document.addEventListener('scroll', function(e) {
		if (!$("#visualize").hasClass("hidden")){
			if ($('[data-id=visu_time]').offset().top < $(window).scrollTop()) {
				$("#popout").removeClass("hidden")
			} else {
				$("#popout").addClass("hidden")
			}
		}
	})
	new Keybind("Space", false, false, false, (e) => {
		if (!$("#visualize").hasClass("hidden")){
			e.preventDefault()
			if (visu_autoplay) {
				visu_autoplay = false
			} else if (visu_status !== "not_visualized") {
				setTimeout(visualize_autoplay, 400, 400)
				visu_autoplay = true
			}
		}
	}).register_onkeydown()
	new Keybind("ArrowRight", false, false, false, (e) => {
		if (!$("#visualize").hasClass("hidden")){
			e.preventDefault()
			if (visu_autoplay) return
			if (visu_status !== "ready") return
			if (time < visu_num_steps){
				//time++
				//todo
				time += 3
				read_and_update_vpos()
			}
		}
	}).register_onkeydown()
	new Keybind("ArrowLeft", false, false, false, (e) => {
		if (!$("#visualize").hasClass("hidden")){
			e.preventDefault()
			if (visu_autoplay) return
			if (visu_status !== "ready") return
			if (time > 1){
				//time--
				//todo
				time -= 3
				read_and_update_vpos()
			}
		}
	}).register_onkeydown()
}
		
function initLS(){
    $("input[type=text]").each(function(i, elem){
        if (elem.hasAttribute("id")){
            $(elem).on('change', function(ev2){
                let id = $(ev2.target).attr("id")
                let val = $(ev2.target).val()
                localStorage.setItem(id, val)
            });
            let ls = localStorage.getItem($(elem).attr("id"))
            if (ls) {
                $(elem).val(ls)
            }
        }
    })
    $("input[type=number]").each(function(i, elem){
        if (elem.hasAttribute("id")){
            if ($(elem).attr("id") === "visu_time") return
            $(elem).on('change', function(ev2){
                let id = $(ev2.target).attr("id")
                let val = $(ev2.target).val()
                localStorage.setItem(id, val)
            });
            let ls = localStorage.getItem($(elem).attr("id"))
            if (ls) {
                $(elem).val(ls)
            }
        }
    })
    $("input[type=radio]").each(function(i, elem){
        if (elem.hasAttribute("name")){
            $(elem).on('change', function(ev2){
                let name = $(ev2.target).attr("name")
                let val = $("input[name="+name+"]:checked").val()
                localStorage.setItem(name, val)
            });
            //無駄に三回実行されるけどまあいいや
            let ls = localStorage.getItem($(elem).attr("name"))
            if (ls) {
                $(elem).val([ls])
            }
        }
    })
    $("input[type=checkbox]").each(function(i, elem){
        if (elem.hasAttribute("id")){
            $(elem).on('change', function(ev2){
                let name = $(ev2.target).attr("id")
                let val = $(ev2.target).prop("checked") ? "1" : "0"
                localStorage.setItem(name, val)
            });
            let ls = localStorage.getItem($(elem).attr("id"))
            if (ls) {
                $(elem).prop("checked", ls === "1")
            }
        }
    })
    $("input[type=range]").each(function(i, elem){
        if (elem.hasAttribute("id")){
            $(elem).on('change', function(ev2){
                let name = $(ev2.target).attr("id")
                let val = $(ev2.target).val()
                localStorage.setItem(name, val)
            });
            let ls = localStorage.getItem($(elem).attr("id"))
            if (ls) {
                $(elem).val(ls)
            }
        }
    })
}