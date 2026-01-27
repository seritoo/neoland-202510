class Collection {
	constructor() {
		this.count = 0
	}

	add(item) {
		this[this.count] = item
		this.count++
	}

	remove(item) {
		for (let i = 0; i < this.count; i++)
			if (this[i] === item)
				delete this[i]
	}

	removeFirst(item) {
		for (let i = 0; i < this.count; i++)
			if (this[i] === item) {
				delete this[i]
				return;
			}
	}

	update(target, replacement) {
		for (let i = 0; i < this.count; i++)
			if (this[i] === target)
				this[i] = replacement
	}

	updateFirst(target, replacement) {
		for (let i = 0; i < this.count; i++)
			if (this[i] === target) {
				this[i] = replacement
				return;
			}
	}

	push(item) {
		this[this.count] = item
		this.count++
	}

	pop() {
		const lastItem = this[this.count - 1]
		delete this[this.count - 1]
		this.count--

		return lastItem
	}

	shift() {
		const firstItem = this[0]
		this.count--
		for (let i = 0; i < this.count; i++)
			this[i] = this[i + 1]

		delete this[this.count]
		return firstItem
	}

	includes(searchItem, fromIndex) {
		if (fromIndex === undefined) fromIndex = 0

		for (let i = fromIndex; i < this.count; i++) {
			const item = this[i]

			if(item === searchItem) return true
		}

		return false
	}

	forEach(callback) {
		for (let i = 0; i < this.count; i++) {
			const element = this[i]

			callback(element)
		}
	}

	map(callback) {
		const mapped = new Collection()

		for (let i = 0; i < this.count; i++) {
			const element = this[i]

			const mappedElement = callback(element)
			mapped[mapped.count] = mappedElement
			mapped.count++
		}

		return mapped
	}

	filter(callback) {
		const filtered = new Collection()

		for(let i = 0; i < this.count; i++) {
			const element = this[i]

			const matches = callback(element)

			if(matches) {
				filtered[filtered.count] = element
				filtered.count++
			}
		}

		return filtered
	}

	find(callback) {
		let i = 0

		while(i < this.count) {
			const value = this[i]

			if(callback(value, i, this)) {
				return value
			}
			i++
		}
		return undefined
	}
}
