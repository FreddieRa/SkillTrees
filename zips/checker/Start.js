function Start(id, x, y, name, skills, attributes) {
	Node.call(this, id, x, y, name, "Start", 0)
	this.skills = skills
	this.attributes = attributes

	this.update = function() {
		// If a skill or attribute, then show magnitude (e.g. "+4 Strength")
		this.string = `${this.id}: ${this.name}`

		if (mode == 4) {
			// Scale point toward or away from mouse
			if (keyIsDown(UP_ARROW)) {
				this.x -= (mouseX - this.x) * 0.01;
				this.y -= (mouseX - this.y) * 0.01;
			}
			if (keyIsDown(DOWN_ARROW)) {
				this.x += (mouseX - this.x) * 0.01;
				this.y += (mouseY - this.y) * 0.01;
			}
		}

		// Determine size of box to contain text
		textSize(this.textSize * scaleFactor)
		this.width = (textWidth(this.string) + 10)
		this.height = (textAscent() + 10)

		if (this.hover || route.includes(str(this.id))) {
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
}