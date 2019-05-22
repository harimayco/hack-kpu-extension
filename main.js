chrome.storage.sync.get(['mode_active', 'msg', 'jok', 'prab'], function(result) {
	if(result.mode_active){
		chrome.browserAction.setIcon({path:"kpu.png"});
	}else{
		chrome.browserAction.setIcon({path:"kpu-def.png"});
	}

	window.msg = result.msg;
	$('#logs').html(window.msg);
	window.mode_active = result.mode_active;

	window.jok = result.jok;
	window.prab = result.prab;

	$.fn.editable.defaults.mode = 'inline';
	$(document).ready(function(){
		console.log(window.mode_active);
		if(window.mode_active){
			calcPercentage(window.jok,window.prab);
		}else{
			$.get('https://pemilu2019.kpu.go.id/static/json/hhcw/ppwp.json', function(data){
				window.jok = data.chart[21];
				window.prab = data.chart[22];
				calcPercentage(window.jok,window.prab);
			});
		}

		$('#hack-btn').click(function(){
			activate_mode();
			chrome.browserAction.setIcon({path:"kpu.png"});

			chrome.storage.sync.set({'jok': window.jok});
	  		chrome.storage.sync.set({'prab': window.prab});

	  		new Date().toISOString().slice(0,10); 
	  		var message_arr = ['Injecting script....', 'Exploit DB....', 'Processing...', 'Sukses!', '<span style="color:yellow">Selamat! Server KPU telah berhasil kamu hack!</span>'];
	  		var delayer = 1000;
	  		var delay = 0;
	  		$.each(message_arr, function(index, value){
	  			setTimeout(function(){ add_msg('['+get_current_date()+']# ' + value + '<br />'); }, delay);
	  			delay = delay + delayer;
	  			if((message_arr.length - 1) == index){
	  				setTimeout(function(){ 
	  					chrome.tabs.reload(function(){});
	  					window.close();
	  				 }, delay);
	  			}
	  		});

		});

		$('#reset').click(function(){
			activate_mode(false);
			chrome.browserAction.setIcon({path:"kpu-def.png"});

			var message_arr = ['Mengembalikan server...', 'Menghapus exploit...', 'Sukses!', '<span style="color:yellow">Server KPU telah dikembalikan ke status aslinya.</span>'];
	  		var delayer = 1000;
	  		var delay = 0;
	  		$.each(message_arr, function(index, value){
	  			setTimeout(function(){ add_msg('['+get_current_date()+']# ' + value + '<br />'); }, delay);
	  			delay = delay + delayer;
	  			if((message_arr.length - 1) == index){
	  				setTimeout(function(){ 
	  					chrome.tabs.reload(function(){});
	  					window.close();
	  				 }, delay);
	  			}
	  		});
		});

		$('#clear').click(function(){
			window.msg = '';
			chrome.storage.sync.set({'msg': ''});
			$('#logs').html('');
		});

		$('#jok-editable').on('save', function(e, params) {
			window.jok = params.newValue;
			console.log(window.jok);
		    calcPercentage(window.jok, window.prab);
		});

		$('#prab-editable').on('save', function(e, params) {
			window.prab = params.newValue;
		    calcPercentage(window.jok, window.prab);
		});
		

		chrome.storage.sync.get(['prab','jok'], function(result) {
			$('#jokowi').text(result.jok);
			$('#prabowo').text(result.prab);
	  	});
	  
	  $('#newtabid').attr('href', chrome.extension.getURL('popup.html'));


	});

});

  function add_msg(new_msg = ''){
  	window.msg = new_msg + window.msg;
  	chrome.storage.sync.set({'msg' : window.msg});
  	$('#logs').html( window.msg );
  }

  function calcPercentage(jok, prab){
		var total = parseInt(jok) + parseInt(prab);
		var jok_per = (jok / total) * 100;
		var prab_per = (prab / total) * 100;
		//chrome.storage.sync.set({'jok': data.chart[21], 'prab': data.chart[22]});
		//$('#jokowi').text(jok);
		$('#jok-editable').text(jok);
		//$('#prabowo').text(prab);
		$('#prab-editable').text(prab);

		$('#jok_per').text(jok_per.toFixed(2) + '%');
		$('#prab_per').text(prab_per.toFixed(2) + '%');
		$('.editable').editable();
		
  }

  function activate_mode(active=true){
  	if(active){
  		chrome.storage.sync.set({'mode_active': true});
  		window.mode_active = true;
  	}else{
  		chrome.storage.sync.set({'mode_active': false});
  		window.mode_active = false;
  	}
  }

  function get_current_date(){
  	return new Date().toISOString().slice(0,10);
  }