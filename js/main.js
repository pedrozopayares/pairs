(function(){

			var WIDTH= $("#game-panel").width();
			var HEIGHT= $("#game-panel").height();
			var items_on_match = 2;
			var click_counter = 0;
			var match_counter = 0;
			var flipped = [];
			var users = [];
			var points = 0;

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

			var max_cards_x=5;
			var max_cards_y=4;
			var Pairs = [];
			var cards =[];
			var images_set = "jw";
			var blocked = false;
			var max_index=((max_cards_x*max_cards_y)/2);

			$.getJSON('img/sets/'+images_set+'/config.json', function(json, textStatus) {
				json = json.sort(function() {return Math.random() - 0.5});
				max_length=Object.keys(json).length-1;
				for (i=0;i<max_index;i++){
					 cards.push(json[i]);
				}
				cards = cards.concat(cards);
				cards = cards.sort(function() {return Math.random() - 0.5});
				createPairs(cards);

				$('.card').click(function(e){
					if(match_counter < items_on_match){
						clickControl($(e.currentTarget).data('x'), $(e.currentTarget).data('y'));
						console.log(flipped);
					}
				});
			});

			function matching() {
				console.log('¿Qué carajos hace esto?');
			}

			function clickControl(x, y){

					if(match_counter == 0){

						flipped[0] = Pairs[x][y];
						match_counter += 1;
						flipped[0].unFlip();
						console.log("FIRST FLIP: TRUE; " + flipped[0].getImg());
						showDetails(Pairs[x][y]);

					} else {
						if(!((x == flipped[match_counter-1].getX()) && (y == flipped[match_counter-1].getY()))){

							flipped[match_counter] = Pairs[x][y];
							$('#'+ flipped[match_counter].getID() + '.flipped').on('webkitTransitionEnd', function(e){
								if(!(flipped[0].getImg()==flipped[match_counter].getImg())){
									console.log("NO PAIRS");
									match_counter += 1;
									if (match_counter == items_on_match){
										console.log(match_counter);
										for (var i = flipped.length - 1; i >= 0; i--) {
											flipped[i].flip();
										}
										flipped=[];
										match_counter = 0;
									}
								} else {
									console.log("PAIRS");
									for (var i = flipped.length - 1; i >= 0; i--) {
										flipped[i].unRender();
									}
									match_counter = 0;
								}
								$(this).off(e);
							});
							flipped[match_counter].unFlip();


						} else {
							console.log("Es el mismo!!");
							matching();
						}

				}

			}
			function showDetails(cardSelected){
				$("#details").html(Pairs[i][j].renderDetails());
			}
			function createPairs(card_source){
				var index=0;

				for(i=0;i<max_cards_x;i++){
					Pairs[i]=[];
					for(j=0;j<max_cards_y;j++){
						var card = new Card(i+"_"+j, i, j);
						Pairs[i].push(card);
						Pairs[i][j].setImg(images_set + "/thumb/" + card_source[index].url);
						Pairs[i][j].setTitle(card_source[index].title);
						Pairs[i][j].setDescription(card_source[index].description);
						Pairs[i][j].setExercises(card_source[index].exercises);
						Pairs[i][j].setSound(card_source[index].sound);
						Pairs[i][j].setSource(card_source[index].source);
						Pairs[i][j].setSpeechRecognitionText(index+1);
						Pairs[i][j].setImgRevert(index+1);
						$("#game-panel").append(Pairs[i][j].render());
						$("#game-panel").append(Pairs[i][j].flip());
						index++;
					}
				}
			}


		})();
