function Node(id, x, y, name, type, magnitude) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.name = name;
	this.type = type;
	this.magnitude = magnitude;

	this.connections = {};
	this.cost = false;
	this.string = "";
	this.width = 80;
	this.height = 30;
	this.textSize = 18;
	this.hover = false;
	this.sw = 1;
	this.colour = "#000000"
	this.costColour = "#000000"
	this.colours = {
		"Skill": "#003000",
		"Attribute": "#000030",
		"Blank": "#FFFFFF",
		"Other": "#000000",
		"Ultimate": "#d6a315",
		"Start": "#d6a315",
		"hovered": "#13c1d1",
		"from": "#c21328"
	}

	this.update = function() {
		if (["Skill", "Attribute"].includes(this.type)) {
			this.string = `${this.id}: +${this.magnitude} ${this.name}`
		} else {
			this.string = `${this.id}: ${this.name}`
		}

		textSize(this.textSize * scaleFactor)
		this.width = (textWidth(this.string) + 10)
		this.height = (textAscent() + 10)

		let withinReach = (mode == 2 &&
			from != -1 &&
			from != this.id &&
			(solveToFrom(this.id, from, false)[0]) <= maxCost)

		if (this.hover || route.includes(str(this.id)) || withinReach) {
			this.sw = 2
			this.colour = this.colours.hovered
		} else if (from == this.id) {
			this.sw = 2
			this.colour = this.colours.from
		} else {
			this.sw = 1
			this.colour = this.colours[this.type]
		}
	}
	
	this.move = function() {
		this.x += (mouseX - pmouseX);
		this.y += (mouseY - pmouseY)
	}

	this.show = function() {
		let x = this.x
		let y = this.y

		if (this.type != "Blank") {

			{
				stroke(this.colour)
				strokeWeight(this.sw)
				fill(255)
				rect(x, y, this.width, this.height)
			} // Draw Rect

			if (this.cost) {
				textSize(this.textSize * (7 / 9) * scaleFactor)
				fill(this.costColour)
				noStroke()
				text(this.cost, x - this.width / 2, y + this.height)
			} // Draw cost

			{
				textSize(this.textSize * scaleFactor)
				fill(this.colour)
				noStroke()
				text(this.string, x, y)
			} // Draw Text
		}

	}
}