/**
 * @constructor
 */
Person = function () {
	/**
	 * Person#say
	 * Person.say
	 * Person-say
	 */
	this.say = function () {
		return "I'm an instance.";
	};

	function say() {
		return "I'm an inner";
	}
};

Person.say = function () {
	return "I'm static.";
};

var p = new Person();
console.log(p.say());
console.log(Person.say());
