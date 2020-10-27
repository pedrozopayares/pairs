function Card(index, x, y) {

	this.x=x;
	this.y=y;

	this.properties = {
		id: index,
		x: this.x,
		y: this.y,
		img: "default/1.png",
		img_revert:"default/revert.png",
		flipped:false,
		speech_recognition_text:x+""+y,
		title:'',
		description:'',
		exercises:[]
	};

	this.template = '<div class="card-container">' +
				'<div id="{{id}}" data-x="{{x}}" data-y="{{y}}" data-speech="{{speech_recognition_text}}" class="card text-3xl text-gray-700">' +
					'<figure class="front">' +
						'<img src="img/sets/{{images_set}}/{{img}}"/>' +
					'</figure>' +
					'<figure class="back">' +
						'<div>{{speech_recognition_text}}</div>' +
					'</figure>' +
				'</div>' +
			'</div>';
	this.detailsTemplate = '<div class="bg-white rounded-lg mx-auto shadow-md">' +
		'<img class="h-16 w-16 rounded-t-lg" src="img/sets/jw/full/{{url}}">' +
		'<div class="p-6">' +
			'<h2 class="text-center font-bold text-3xl text-red-600">{{title}}</h2>' +
			'<div class="text-gray-700 p-6">' +
				'<p>' +
					'{{description}}' +
				'</p>' +
			'</div>' +
			'<div class="text-purple-500"><a href="https://jw.org" target="blank">Conoce más en JW.org</a></div>' +
		'</div>' +
	'</div>';
}
Card.prototype.getID = function() {
	return this.properties.id;
};
Card.prototype.getX = function() {
	return this.properties.x;
};
Card.prototype.getY = function() {
	return this.properties.y;
};
Card.prototype.getImg = function() {
	return this.properties.img;
};
Card.prototype.getFlipped = function() {
	return this.properties.flipped;
};
Card.prototype.setImg = function(imgURL) {
	this.properties.img = imgURL;
};
Card.prototype.setTitle = function(title) {
	this.properties.title = title;
};
Card.prototype.setDescription = function(description) {
	this.properties.description = description;
};
Card.prototype.setExercises = function(exercises) {
	this.properties.exercises = exercises;
};
Card.prototype.setSound = function(soundURL) {
	this.properties.sound = soundURL;
};
Card.prototype.setSource = function(sourceURL) {
	this.properties.source = sourceURL;
};
Card.prototype.setImgRevert = function(img_revert) {
	this.properties.img_revert = img_revert;
};
Card.prototype.setSpeechRecognitionText = function(speech_recognition_text) {
		this.properties.speech_recognition_text = speech_recognition_text;
};

Card.prototype.click = function(){
	this.flip();
};

Card.prototype.flip = function(){
	console.log("Flip " + this.properties.id);
	$('#' + this.properties.id).addClass('flipped');
	this.properties.flipped=true;
};

Card.prototype.unFlip = function(){
	console.log("unFlip");
	$('#' + this.properties.id).removeClass('flipped');
	this.properties.flipped=false;
};

Card.prototype.render=function(){
	return Mustache.render(this.template, this.properties);
};

Card.prototype.renderDetails=function(details){
	return Mustache.render(this.detailsTemplate, details);
};

Card.prototype.unRender=function(){
	$('#' + this.properties.id).remove();
};