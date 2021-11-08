/*
 * apdi.js
 *
 * copyright; github.com@tkgwku, all rights reserved.
 */
 
function addSquareAPDI(mm, x1,y1,x2,y2,gridWidth){
	let col = Math.round(Math.abs(x2-x1)/gridWidth)
	let row = Math.round(Math.abs(y2-y1)/gridWidth)
	for (let i = 0;i<col;i++){
		for (let j = 0;j<row;j++){
			let x,y
			x = Math.min(x1,x2) + i * gridWidth
			y = Math.min(y1,y2) + j * gridWidth
			let v1 = new Vertex(new Pos(x,y))
			x = Math.min(x1,x2) + (i+1) * gridWidth
			y = Math.min(y1,y2) + j * gridWidth
			let v2 = new Vertex(new Pos(x,y))
			x = Math.min(x1,x2) + i * gridWidth
			y = Math.min(y1,y2) + (j+1) * gridWidth
			let v3 = new Vertex(new Pos(x,y))
			x = Math.min(x1,x2) + (i+1) * gridWidth
			y = Math.min(y1,y2) + (j+1) * gridWidth
			let v4 = new Vertex(new Pos(x,y))
			x = Math.min(x1,x2) + (i + 0.5) * gridWidth
			y = Math.min(y1,y2) + (j + 0.5) * gridWidth
			let newmp = new MP(mm, new Pos(x,y))
			let newapdi = new APDI(newmp, v1,v2,v3,v4)
			newapdi.addToTree()
			newapdi.addVertexAndMP()
		}
	}
}

function addVerticalAPDIBuffer(mm, x1,y1,x2,y2,width_left,width_right){
	let group_width = Math.max(width_left, width_right)
	let num_el_groups = Math.round(Math.abs(y2-y1) / group_width)
	let is_odd = num_el_groups % 2 !== 0
	let num_el_twins = Math.floor(num_el_groups/2)
	for (let i = 0;i<num_el_twins;i++){
		let y0 = Math.min(y1,y2) + 2 * group_width * i
		let y50 = y0 + group_width * 0.5
		let y75 = y0 + group_width * 0.75
		let y100  = y0 + group_width
		let y125 = y0 + group_width * 1.25
		let y150 = y0 + group_width * 1.5
		let y200  = y0 + group_width * 2
		
		let x0 = Math.min(x1,x2)
		let x100 = Math.max(x1,x2)
		let x25 = x0 + group_width * 0.25
		let x50 = x0 + group_width * 0.5
		let x75 = x0 + group_width * 0.75
		
		let xg1,xg2
		if (width_left > width_right) {
			xg1 = x0 + group_width * 11/18
			xg2 = x0 + group_width * 2/9
		} else {
			xg1 = x100 - group_width * 11/18
			xg2 = x100 - group_width * 2/9
		}
		let yg1 = y0 + group_width * 2/9
		let yg2 = y0 + group_width * 11/18
		let yg3 = y200 - group_width * 11/18
		let yg4 = y200 - group_width * 2/9
		
		let v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11
		if (width_left > width_right) {
			v1 = new Vertex(new Pos(x0,y0))
			v2 = new Vertex(new Pos(x100,y0))
			v3 = new Vertex(new Pos(x50,y50))
			v4 = new Vertex(new Pos(x100,y50))
			v5 = new Vertex(new Pos(x0,y100))
			v6 = new Vertex(new Pos(x50,y100))
			v7 = new Vertex(new Pos(x100,y100))
			v8 = new Vertex(new Pos(x50,y150))
			v9 = new Vertex(new Pos(x100,y150))
			v10 = new Vertex(new Pos(x0,y200))
			v11 = new Vertex(new Pos(x100,y200))
		} else {
			v1 = new Vertex(new Pos(x100,y0))
			v2 = new Vertex(new Pos(x0,y0))
			v3 = new Vertex(new Pos(x50,y50))
			v4 = new Vertex(new Pos(x0,y50))
			v5 = new Vertex(new Pos(x100,y100))
			v6 = new Vertex(new Pos(x50,y100))
			v7 = new Vertex(new Pos(x0,y100))
			v8 = new Vertex(new Pos(x50,y150))
			v9 = new Vertex(new Pos(x0,y150))
			v10 = new Vertex(new Pos(x100,y200))
			v11 = new Vertex(new Pos(x0,y200))
		}
		
		let mp1 = new MP(mm, new Pos(xg1,yg1))
		let mp2 = new MP(mm, new Pos(xg2,yg2))
		let mp3,mp4
		if (width_left > width_right) {
			mp3 = new MP(mm, new Pos(x75,y75))
			mp4 = new MP(mm, new Pos(x75,y125))
		} else {
			mp3 = new MP(mm, new Pos(x25,y75))
			mp4 = new MP(mm, new Pos(x25,y125))
		}
		let mp5 = new MP(mm, new Pos(xg2,yg3))
		let mp6 = new MP(mm, new Pos(xg1,yg4))
		
		let apdi1,apdi2,apdi3,apdi4,apdi5,apdi6
		if (width_left > width_right) {
			apdi1 = new APDI(mp1,v1,v2,v4,v3)
			apdi2 = new APDI(mp2,v1,v3,v6,v5)
			apdi3 = new APDI(mp3,v3,v4,v7,v6)
			apdi4 = new APDI(mp4,v6,v7,v9,v8)
			apdi5 = new APDI(mp5,v5,v6,v8,v10)
			apdi6 = new APDI(mp6,v8,v9,v11,v10)
		} else {
			apdi1 = new APDI(mp1,v2,v1,v3,v4)
			apdi2 = new APDI(mp2,v3,v1,v5,v6)
			apdi3 = new APDI(mp3,v4,v3,v6,v7)
			apdi4 = new APDI(mp4,v7,v6,v8,v9)
			apdi5 = new APDI(mp5,v6,v5,v10,v8)
			apdi6 = new APDI(mp6,v9,v8,v10,v11)
		}
		
		apdi1.addToTree()
		apdi2.addToTree()
		apdi3.addToTree()
		apdi4.addToTree()
		apdi5.addToTree()
		apdi6.addToTree()
		
		apdi1.addVertexAndMP()
		apdi2.addVertexAndMP()
		apdi3.addVertexAndMP()
		apdi4.addVertexAndMP()
		apdi5.addVertexAndMP()
		apdi6.addVertexAndMP()
	}
	
	if (is_odd){
		let y100 = Math.max(y1,y2)
		let y75 = y100 - group_width * 0.25
		let y50 = y100 - group_width * 0.5
		let y0  = y100 - group_width
		
		let x0 = Math.min(x1,x2)
		let x100 = Math.max(x1,x2)
		let x25 = x0 + group_width * 0.25
		let x50 = x0 + group_width * 0.5
		let x75 = x0 + group_width * 0.75
		
		let xg1,xg2
		if (width_left > width_right) {
			xg1 = x0 + group_width * 11/18
			xg2 = x0 + group_width * 2/9
		} else {
			xg1 = x100 - group_width * 11/18
			xg2 = x100 - group_width * 2/9
		}
		let yg1 = y0 + group_width * 2/9
		let yg2 = y0 + group_width * 11/18
		
		let v1,v2,v3,v4,v5,v6,v7
		if (width_left > width_right) {
			v1 = new Vertex(new Pos(x0,y0))
			v2 = new Vertex(new Pos(x100,y0))
			v3 = new Vertex(new Pos(x50,y50))
			v4 = new Vertex(new Pos(x100,y50))
			v5 = new Vertex(new Pos(x0,y100))
			v6 = new Vertex(new Pos(x50,y100))
			v7 = new Vertex(new Pos(x100,y100))
		} else {
			v1 = new Vertex(new Pos(x100,y0))
			v2 = new Vertex(new Pos(x0,y0))
			v3 = new Vertex(new Pos(x50,y50))
			v4 = new Vertex(new Pos(x0,y50))
			v5 = new Vertex(new Pos(x100,y100))
			v6 = new Vertex(new Pos(x50,y100))
			v7 = new Vertex(new Pos(x0,y100))
		}
		
		let mp1 = new MP(mm, new Pos(xg1,yg1))
		let mp2 = new MP(mm, new Pos(xg2,yg2))
		let mp3
		if (width_left > width_right) {
			mp3 = new MP(mm, new Pos(x75,y75))
		} else {
			mp3 = new MP(mm, new Pos(x25,y75))
		}
		
		let apdi1,apdi2,apdi3
		if (width_left > width_right) {
			apdi1 = new APDI(mp1,v1,v2,v4,v3)
			apdi2 = new APDI(mp2,v1,v3,v6,v5)
			apdi3 = new APDI(mp3,v3,v4,v7,v6)
		} else {
			apdi1 = new APDI(mp1,v2,v1,v3,v4)
			apdi2 = new APDI(mp2,v3,v1,v5,v6)
			apdi3 = new APDI(mp3,v4,v3,v6,v7)
		}
		
		apdi1.addToTree()
		apdi2.addToTree()
		apdi3.addToTree()
		
		apdi1.addVertexAndMP()
		apdi2.addVertexAndMP()
		apdi3.addVertexAndMP()
	}
}

/**
 * 実装途中 Under the construction
 * @param {*} mm 
 * @param {*} x1 
 * @param {*} x2 
 * @param {*} y1 
 * @param {*} y2 
 * @param {*} width_top 
 * @param {*} width_bottom 
 */
function addHorizontalAPDIBuffer(mm,x1,x2,y1,y2,width_top,width_bottom){
	let group_width = Math.max(width_left, width_right)
	let num_el_groups = Math.round(Math.abs(y2-y1) / group_width)
	let is_odd = num_el_groups % 2 !== 0
	let num_el_twins = Math.floor(num_el_groups/2)
	for (let i = 0;i<num_el_twins;i++){
		let x0 = Math.min(x1,x2) + 2 * group_width * i
		let x50  = x0 + group_width * 0.5
		let x75  = x0 + group_width * 0.75
		let x100 = x0 + group_width
		let x125 = x0 + group_width * 1.25
		let x150 = x0 + group_width * 1.5
		let x200 = x0 + group_width * 2
		
		let y0 = Math.min(y1,y2)
		let y25  = y0 + group_width * 0.25
		let y50  = y0 + group_width * 0.5
		let y75  = y0 + group_width * 0.75
		let y100 = y0 + group_width
		
		// todo
		if (width_top > width_bottom) {
			let yg1 = x0 + group_width * 11/18
			let yg2 = x0 + group_width * 2/9
		} else {
			let yg1 = x100 - group_width * 11/18
			let yg2 = x100 - group_width * 2/9
		}
		let xg1 = y0 + group_width * 2/9
		let xg2 = y0 + group_width * 11/18
		let xg3 = y200 - group_width * 11/18
		let xg4 = y200 - group_width * 2/9
		
		if (width_top > width_bottom) {
			let v1 = new Vertex(new Pos(x0,y0))
			let v2 = new Vertex(new Pos(x100,y0))
			let v3 = new Vertex(new Pos(x50,y50))
			let v4 = new Vertex(new Pos(x100,y50))
			let v5 = new Vertex(new Pos(x0,y100))
			let v6 = new Vertex(new Pos(x50,y100))
			let v7 = new Vertex(new Pos(x100,y100))
			let v8 = new Vertex(new Pos(x50,y150))
			let v9 = new Vertex(new Pos(x100,y150))
			let v10 = new Vertex(new Pos(x0,y200))
			let v11 = new Vertex(new Pos(x100,y200))
		} else {
			let v1 = new Vertex(new Pos(x100,y0))
			let v2 = new Vertex(new Pos(x0,y0))
			let v3 = new Vertex(new Pos(x50,y50))
			let v4 = new Vertex(new Pos(x0,y50))
			let v5 = new Vertex(new Pos(x100,y100))
			let v6 = new Vertex(new Pos(x50,y100))
			let v7 = new Vertex(new Pos(x0,y100))
			let v8 = new Vertex(new Pos(x50,y150))
			let v9 = new Vertex(new Pos(x0,y150))
			let v10 = new Vertex(new Pos(x100,y200))
			let v11 = new Vertex(new Pos(x0,y200))
		}
		
		let mp1 = new MP(mm, new Pos(xg1,yg1))
		let mp2 = new MP(mm, new Pos(xg2,yg2))
		if (width_top > width_bottom) {
			let mp3 = new MP(mm, new Pos(x75,y75))
			let mp4 = new MP(mm, new Pos(x75,y125))
		} else {
			let mp3 = new MP(mm, new Pos(x25,y75))
			let mp4 = new MP(mm, new Pos(x25,y125))
		}
		let mp5 = new MP(mm, new Pos(xg2,yg3))
		let mp6 = new MP(mm, new Pos(xg1,yg4))
		
		if (width_top > width_bottom) {
			let apdi1 = new APDI(mp1,v1,v2,v4,v3)
			let apdi2 = new APDI(mp2,v1,v3,v6,v5)
			let apdi3 = new APDI(mp3,v3,v4,v7,v6)
			let apdi4 = new APDI(mp4,v6,v7,v9,v8)
			let apdi5 = new APDI(mp5,v5,v6,v8,v10)
			let apdi6 = new APDI(mp6,v8,v9,v11,v10)
		} else {
			let apdi1 = new APDI(mp1,v2,v1,v3,v4)
			let apdi2 = new APDI(mp2,v3,v1,v5,v6)
			let apdi3 = new APDI(mp3,v4,v3,v6,v7)
			let apdi4 = new APDI(mp4,v7,v6,v8,v9)
			let apdi5 = new APDI(mp5,v6,v5,v10,v8)
			let apdi6 = new APDI(mp6,v9,v8,v10,v11)
		}
		
		apdi1.addToTree()
		apdi2.addToTree()
		apdi3.addToTree()
		apdi4.addToTree()
		apdi5.addToTree()
		apdi6.addToTree()
		
		apdi1.addVertexAndMP()
		apdi2.addVertexAndMP()
		apdi3.addVertexAndMP()
		apdi4.addVertexAndMP()
		apdi5.addVertexAndMP()
		apdi6.addVertexAndMP()
	}
	
	if (is_odd){
		let y100 = Math.max(y1,y2)
		let y75 = y100 - group_width * 0.25
		let y50 = y100 - group_width * 0.5
		let y0  = y100 - group_width
		
		let x0 = Math.min(x1,x2)
		let x100 = Math.max(x1,x2)
		let x25 = x0 + group_width * 0.25
		let x50 = x0 + group_width * 0.5
		let x75 = x0 + group_width * 0.75
		
		if (width_left > width_right) {
			let xg1 = x0 + group_width * 11/18
			let xg2 = x0 + group_width * 2/9
		} else {
			let xg1 = x100 - group_width * 11/18
			let xg2 = x100 - group_width * 2/9
		}
		let yg1 = y0 + group_width * 2/9
		let yg2 = y0 + group_width * 11/18
		
		if (width_left > width_right) {
			let v1 = new Vertex(new Pos(x0,y0))
			let v2 = new Vertex(new Pos(x100,y0))
			let v3 = new Vertex(new Pos(x50,y50))
			let v4 = new Vertex(new Pos(x100,y50))
			let v5 = new Vertex(new Pos(x0,y100))
			let v6 = new Vertex(new Pos(x50,y100))
			let v7 = new Vertex(new Pos(x100,y100))
		} else {
			let v1 = new Vertex(new Pos(x100,y0))
			let v2 = new Vertex(new Pos(x0,y0))
			let v3 = new Vertex(new Pos(x50,y50))
			let v4 = new Vertex(new Pos(x0,y50))
			let v5 = new Vertex(new Pos(x100,y100))
			let v6 = new Vertex(new Pos(x50,y100))
			let v7 = new Vertex(new Pos(x0,y100))
		}
		
		let mp1 = new MP(mm, new Pos(xg1,yg1))
		let mp2 = new MP(mm, new Pos(xg2,yg2))
		if (width_left > width_right) {
			let mp3 = new MP(mm, new Pos(x75,y75))
		} else {
			let mp3 = new MP(mm, new Pos(x25,y75))
		}
		
		if (width_left > width_right) {
			let apdi1 = new APDI(mp1,v1,v2,v4,v3)
			let apdi2 = new APDI(mp2,v1,v3,v6,v5)
			let apdi3 = new APDI(mp3,v3,v4,v7,v6)
		} else {
			let apdi1 = new APDI(mp1,v2,v1,v3,v4)
			let apdi2 = new APDI(mp2,v3,v1,v5,v6)
			let apdi3 = new APDI(mp3,v4,v3,v6,v7)
		}
		
		apdi1.addToTree()
		apdi2.addToTree()
		apdi3.addToTree()
		
		apdi1.addVertexAndMP()
		apdi2.addVertexAndMP()
		apdi3.addVertexAndMP()
	}
}

function convertInputAPDI(){
	if (Object.keys(apditree).length === 0) {
		$("#filecontent_apdi").text("")
		return
	}
	let content = ""
	content += "#################\n"
	content += "# APDI VERTEX DEF\n"
	content += "# id, x, y\n"
	let va = getArrangedVertexArray()
	content += "num vertices="+va.length+"\n"
	for (let i = 0; i < va.length; i++){
		let vertex_val = va[i]
		let id = i+1
		vertextree[vertex_val.pos.toString()].id = id
		let x = vertex_val.pos.x
		let y = vertex_val.pos.y
		
		let _bggw = $("#pref_grid").val()
		let _bgx = $("#pref_x").val()
		let _bgy = $("#pref_y").val()
		if (_bggw !== "" && _bgx !== "" && _bgy !== ""){
			let background_grid_w = parseFloat(_bggw)
			let background_x = parseFloat(_bgx)
			let background_y = parseFloat(_bgy)
			if (!isNaN(background_grid_w) && !isNaN(background_x) && !isNaN(background_y)){
				let danger_x = background_x - background_grid_w
				let danger_y = background_y - background_grid_w
				if (x === danger_x){
					x = x - 0.00001
				}
				if (y === danger_y){
					y = y - 0.00001
				}
				if (x > danger_x || y > danger_y){
					push_alert("頂点が計算領域の外側にいる可能性があります. 格子設定が空白の場合, 頂点座標補正はスキップされます.", 2, "vcorr")
				}
			}
		}
		
		let iid = indentify_int(id,10)
		let ix = indentify_float(x,5,10)
		let iy = indentify_float(y,5,10)
		content += iid+ix+iy+"\n"
	}
	content += "#################\n"
	content += "# APDI ELEMENT DEF\n"
	content += "# id, mpID, vertex1, vertex2, vertex3, vertex4\n"
	let aa = getArrangedAPDIArray()
	let new_apditree = {};
	let mp_id_map = getMP_idMap()
	content += "num elements="+aa.length+"\n"
	for (let i = 0; i < aa.length; i++){
		let apdi_val = aa[i]
		let id = i+1
		let mpid = mp_id_map[apdi_val.mp.pos.toString()]
		let v1 = vertextree[apdi_val.v1.pos.toString()]
		let v2 = vertextree[apdi_val.v2.pos.toString()]
		let v3 = vertextree[apdi_val.v3.pos.toString()]
		let v4 = vertextree[apdi_val.v4.pos.toString()]
		let rearranged = vertexRearrange(v1,v2,v3,v4)
		new_apditree[apdi_val.mp.pos.toString()] = new APDI(apdi_val.mp,rearranged[0],rearranged[1],rearranged[2],rearranged[3])
		new_apditree[apdi_val.mp.pos.toString()].id = id
		let v1id = rearranged[0].id
		let v2id = rearranged[1].id
		let v3id = rearranged[2].id
		let v4id = rearranged[3].id
		let iid = indentify_int(id,10)
		let impid = indentify_int(mpid,10)
		let iv1id = indentify_int(v1id,10)
		let iv2id = indentify_int(v2id,10)
		let iv3id = indentify_int(v3id,10)
		let iv4id = indentify_int(v4id,10)
		content += iid+impid+iv1id+iv2id+iv3id+iv4id+"\n"
	}
	apditree = new_apditree
	content += "#################\n"
	$("#filecontent_apdi").text(content)
}

function getArrangedAPDIArray(){
	let a = []
	let keys = Object.keys(apditree)
	for (let i = 0; i < keys.length; i++){
		a.push(apditree[keys[i]])
	}
	a.sort(function(b,c){
		if( b.mp.pos.y < c.mp.pos.y ) {
			return -1
		}
		if( c.mp.pos.y < b.mp.pos.y ) {
			return 1
		}
		if( b.mp.pos.x < c.mp.pos.x ) {
			return -1
		}
		if( c.mp.pos.x < b.mp.pos.x ) {
			return 1
		}
		return 0
	})
	return a
}

function getArrangedVertexArray(){
	let a = []
	let keys = Object.keys(vertextree)
	for (let i = 0; i < keys.length; i++){
		a.push(vertextree[keys[i]])
	}
	a.sort(function(b,c){
		if( b.pos.y < c.pos.y ) {
			return -1
		}
		if( c.pos.y < b.pos.y ) {
			return 1
		}
		if( b.pos.x < c.pos.x ) {
			return -1
		}
		if( c.pos.x < b.pos.x ) {
			return 1
		}
		return 0
	})
	return a
}

function vertexRearrange(v1,v2,v3,v4){
	let nv1 = v1
	let nv2 = v2
	let nv3 = v3
	let nv4 = v4
	
	let x1 = v1.pos.x
	let x2 = v2.pos.x
	let x3 = v3.pos.x
	let x4 = v4.pos.x
	let y1 = v1.pos.y
	let y2 = v2.pos.y
	let y3 = v3.pos.y
	let y4 = v4.pos.y
	
	let ux = x2 - x1  // 4 .              . 3
	let uy = y2 - y1  //   ↑           ➚ 
	let vx = x3 - x1  // w |     v  ／
	let vy = y3 - y1  //   |     ／
	let wx = x4 - x1  //   |  ／   u
	let wy = y4 - y1  // 1 . -----------→ . 2
	
	let op1 = ux * vy - uy * vx // u × v > 0
	let op2 = vx * wy - vy * wx // v × w > 0
	let op3 = ux * wy - uy * wx // u × w > 0
	
	if (op1 < 0) {
		if (op2 < 0) {
			nv2 = v4 // u v   2 3  <-  4 3
			nv4 = v2 // 0 w   1 4  <-  1 2
		} else {
			// uw v
			// 0   
			if (op3 < 0) {
				nv2 = v3 // u w   2 4  <-  4 3
				nv3 = v4 // 0 v   1 3  <-  1 2
				nv4 = v2 
			} else {
				nv2 = v3 // w u   4 2  <-  4 3
				nv3 = v2 // 0 v   1 3  <-  1 2
				nv4 = v4 
			}
		}
	} else {
		if (op2 < 0) {
			// v uw
			// 0  
			if (op3 > 0) {
				nv3 = v4 // v w   3 4  <-  4 3
				nv4 = v3 // 0 u   1 2  <-  1 2
			} else {
				nv2 = v4 // v u   3 2  <-  4 3
				nv3 = v2 // 0 w   1 4  <-  1 2
				nv4 = v3
			}
		} else {
			// w v
			// 0 u
			//do nothing
		}
	}
	return [nv1,nv2,nv3,nv4]
}