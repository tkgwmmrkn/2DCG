/*
 * components.js
 *
 * copyright; github.com@tkgwmmrkn, all rights reserved.
 */

var reso = 0.1
var mptree = {}
var apditree = {}
var vertextree = {}
var boundarray = []
var keybinds_onkeydown = {}

/**
 * APDI element class
 * @param {number} mpin material point id
 * @param {number} v1 vertex id 1
 * @param {number} v2 vertex id 2
 * @param {number} v3 vertex id 3
 * @param {number} v4 vertex id 4
 */
class APDI {
	constructor(mpin, v1, v2, v3, v4) {
		this.mp = mpin
		this.v1 = v1
		this.v2 = v2
		this.v3 = v3
		this.v4 = v4
		this.id = null
	}
	addToTree() {
		let _s = this.mp.pos.toString()
		if (!apditree.hasOwnProperty(_s)) {
			apditree[_s] = this
		}
	}
	addVertexAndMP() {
		this.mp.addToTree()
		this.v1.addToTree()
		this.v2.addToTree()
		this.v3.addToTree()
		this.v4.addToTree()
	}
}


/**
 * APDI vertex class
 * @param {Pos} pos position of the vertex
 */
class Vertex {
	constructor(pos) {
		this.pos = pos
		this.id = null
	}
	addToTree() {
		let _s = this.pos.toString()
		if (!vertextree.hasOwnProperty(_s)) {
			vertextree[_s] = this
		}
	}
}

/**
 * Material Point of GIMP/oMPM class
 * @param {number} mm material number
 * @param {Pos} pos position of the material point
 */
class MP {
	constructor(mm, pos) {
		this.mm = mm
		this.pos = pos
		this.id = null
	}
	addToTree() {
		let _s = this.pos.toString()
		if (!mptree.hasOwnProperty(_s)) {
			mptree[this.pos.toString()] = this
		}
	}
}

/**
 * Position class
 * @param {number} x 
 * @param {number} y 
 */
class Pos {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	toString() {
		return "(" + this.x + "," + this.y + ")"
	}
}

/**
 * Boundary condition class 
 * @param {Pos} pos1 
 * @param {Pos} pos2 
 * @param {boolean} xfix 
 * @param {boolean} yfix 
 */
class Boundary {
	constructor(pos1, pos2, xfix, yfix) {
		this.pos1 = pos1
		this.pos2 = pos2
		this.xfix = xfix //boolean
		this.yfix = yfix
	}
}

/**
 * Directory class
 * @param {string} name 
 */
class Directory {
	constructor(name) {
		this.name = name
		this.children = []
	}
	appendChild(child) {
		this.children.push(child)
	}
	getDir(dirname) {
		for (let i = 0; i < this.children.length; i++) {
			let child = this.children[i]
			if ((child instanceof Directory) && (child.name === dirname)) {
				return child
			}
		}
		return null
	}
}

/**
 * Keybind class
 * @param {number} code 
 * @param {boolean} ctrl 
 * @param {boolean} alt 
 * @param {boolean} shift 
 * @param {Function} func callback function
 * @param {any} this_arg this arg of callback function
 * @param  {...any} args args of callback function
 */
class Keybind {
	constructor(code, ctrl, alt, shift, func, this_arg, ...args) {
		this.code = code
		this.ctrl = ctrl
		this.alt = alt
		this.shift = shift
		this.func = func
		this.this_arg = this_arg
		this.args = args
		this.id = this.code + ";" + (this.ctrl ? 1 : 0) + "" + (this.alt ? 1 : 0) + "" + (this.shift ? 1 : 0)
	}
	register_onkeydown() {
		keybinds_onkeydown[this.id] = this
		document.onkeydown = function (e) {
			let _id = e.code + ";" + (e.ctrlKey ? 1 : 0) + "" + (e.altKey ? 1 : 0) + "" + (e.shiftKey ? 1 : 0)
			if (keybinds_onkeydown.hasOwnProperty(_id)) {
				keybinds_onkeydown[_id].call(e)
			}
		}
	}
	call(e) {
		this.func.call(this.this_arg, e, this.args)
	}
}


