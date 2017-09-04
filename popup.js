$(function () {

	// MODEL

	var data = {
		streams: [
			// {
			// 	stream: 'esl_ruhub_dota2',
			// 	id: 1
			// },

		]
	};

	var players = $('#players').html();
	Mustache.parse(players); 

	var list = $('#list').html();
	Mustache.parse(list); 

	function getStreams(){

		// checking a local json with extension's streams list
		if(localStorage.getItem('streams')){
			var streams = localStorage.getItem('streams')
			var streams = JSON.parse(streams);
			console.log('we have json')

			if(streams.streams.length < 1){ // simple display property to show needed popup
				console.log('json is empty')
				$('.choise').css('display', 'block');
				$('.streams').css('display', 'none');
				$('.add--more').css('display', 'none');
			} else{
				console.log('json not empty')
				console.log(streams)
				data = streams;
				loadStreams();
			}
		} else{
			$('.choise').css('display', 'block');
			$('.streams').css('display', 'none');
			$('.add--more').css('display', 'none');
		}
	}	

	function addStream(){
		var stream = $('input').val()
		// streams object
		data.streams.push(
			{'stream' : stream,
			 'id' : data.streams.length,
			}
		)
		var stream = $('input').val('')
		var streamsJSON = JSON.stringify(data)
		localStorage.setItem('streams', streamsJSON);
		loadStreamsList()
	}	

	function delStream(el){
		
		var streamId = el.currentTarget.attributes[0].value;
		data.streams.splice(streamId, 1);
		var streamsJSON = JSON.stringify(data)
		localStorage.setItem('streams', streamsJSON);
		loadStreamsList()

	}

	getStreams();

	// CONTROLLER
	

	$('.add').on('click', function(){
		addStream()
	})

	$('.add--more').on('click', function(){
		$('.choise').css('display', 'block');
		$('.streams').css('display', 'none');
		$('.add--more').css('display', 'none');
		loadStreamsList()
	})

	$('.end').on('click', function(){
		$('.choise').css('display', 'none');
		$('.streams').css('display', 'block');
		$('.add--more').css('display', 'block');
		getStreams();
		loadStreams();
	})

	

	
	// VIEW

	function loadStreams() {
	  var rendered = Mustache.render(players, data);
	  $('.streams').html(rendered);
	}

	function loadStreamsList() {
	  var rendered = Mustache.render(list, data);
	  $('.list').html(rendered);
	  $('span').on('click', function(el){
		delStream(el)
	  })
	}

})