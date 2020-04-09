function Start(id, x, y, name, skills, attributes) {
	Node.call(this, id, x, y, name, "Start", 0)
	this.skills = skills
	this.attributes = attributes
	
	for (let key of Object.keys(this.skills)) {
			this.skills[key] = int(this.skills[key])
	}
	for (let key of Object.keys(this.attributes)) {
			this.attributes[key] = int(this.attributes[key])
	}

	
	this.update = function() {
		// If a skill or attribute, then show magnitude (e.g. "+4 Strength")
		let nameString = `${this.id}: ${this.name}`
		let skillString = "Skills: "
		for (let [key, value] of Object.entries(this.skills)) {
			if(int(value) != 0) {skillString += `${key}: ${int(value)}, `}
		}
		let attString = "Attributes: "
		for (let [key, value] of Object.entries(this.attributes)) {
			if(int(value) != 1) {attString += `${key}: ${int(value)}, `}
		}
		this.string = `${nameString} \n ${skillString} \n ${attString}`
		
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
		tw = textWidth
		this.width = max(tw(skillString), tw(attString)) + 10
		this.height = (textAscent() + 10)*3

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