function refreshList(data) {
    var html = '';
    var startItem = getQueryVariable("des");
    var cant = getQueryVariable("can");
	if (data != null) {
		console.log('Hay clases');
		if (cant != 0) {
			if (startItem <= 0) {
				var item = 0
			} else {
				var item = startItem - 1
			}
			for (var idx = 1; idx <= cant; idx++) {
				if (item >= data.length) {
					break
				}
				html += renderItem(data[item]);
				item++
			}
			$('.events-list').html(html)
		} else {
			for (var idx = 0; idx < data.length; idx++) {
				html += renderItem(data[idx])
			}
			$('.events-list').html(html)
		}
	} else {
		console.log('No hay clases');
		var html = '<span>No hay pr&oacute;ximos comienzos.</span>';
		$('.events-list').html(html)
	}
}

function renderItem(data) {
    var html = '';
    timeLeft = eventTimeLeft(data.HoraInicio)
    html += '<li class="event group-1">';
    html += '<div class="group group-left">';
    html += '<span class="event-start">' + data.HoraInicio + '</span>';
    html += '</div><!--';
    html += '--><div class="group group-center">';
    html += '<h3 class="event-title">' + data.Clase.substring(0, 57) + '</h3>';
    html += '<ul class="teachers">';
    for (var idx = 0; idx < data.Docentes.length; idx++) {
        html += '<li>';
        html += '<span class="event-teacher">' + data.Docentes[idx].toUpperCase() + '</span>';
        html += '</li>'
    }
    html += '</ul>';
    if (data.Notas != "") {
        html += '<span class="event-description" maxlength="20">' + data.Notas.substring(0, 75) + '</span>'
    }
    html += '</div><!--';
    html += '--><div class="group group-right">';
    var salon = data.Salon.split(" ")
	if (salon.length == 1){
		html += '<div class="room">' + salon[0].capitalize() + '</div></span>';
	}else{
		html += '<span class="event-room"><div class="up">' + salon[0].capitalize() + '</div><div class="room">';
	
		try {
			let salAux = "";
			
			for (var iu=1; iu < salon.length;iu++){
				salAux += salon[iu].capitalize() + " ";
			}	
			html += salAux + '</div></span>';
			
		}
		catch(error) {
		  console.error(error);
		}
	}
    if (timeLeft.h < 0) {
        html += '<div class="event-status">En curso</div>'
    }
    html += '</div>';
    html += '</li>';
    return html
}

function setTitle() {
    var title = getQueryVariable("title");
    if (title != 0) {
		var vars = title.split("-");
        title = ""
        for (var i = 0; i < vars.length; i++) {
            title += vars[i] + " "
        }		
        $('.title').html(decodeURIComponent(title))
    } else {
        $('.title').html('Pr&oacute;ximas Clases')
    }
}

function setHeaderColor() {
    var headerColor = "#" + getQueryVariable("hcol");
    if (headerColor != 0) {
        $(".header").css("background-color", headerColor)
    }
}

function hideHeaderContent() {
    var hcvis = getQueryVariable("hcvis");
    if (hcvis == 'N') {
        $(".left").css("visibility", "hidden");
        $(".right").css("display", "none")
    }
}

function hideHeader() {
    var hvis = getQueryVariable("hvis");
    if (hvis == 'N') {
        $(".header").css("display", "none")
    }
}

function setContentHeight() {
    $(".content").css("min-height", (window.innerHeight - ($("div.header").innerHeight())))
}

function eventTimeLeft(startTimeStr) {
    var res = startTimeStr.split(":");
    var currentTime = new Date();
    var startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), res[0], res[1], 0);
    var diffMs = startTime - currentTime;
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var timeLeft = {
        h: diffHrs,
        m: diffMins
    };
    return timeLeft
}

function refreshCurrentTime() {
    var date = new Date();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2)
    $('.current-time').html(hours + ' : ' + minutes);
    setTimeout(refreshCurrentTime, 10000)
}

function setDate() {
    var d = new Date();
    var days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    var arrMon = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];
    $('.current-date').html(days[d.getDay()] + " " + d.getDate() + ", " + arrMon[d.getMonth()])
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (0)
}

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


function pageScrollBack() {
	var h = document.documentElement.clientHeight;
	window.scrollBy(0,-h);
	if(document.documentElement.scrollTop==0){
		scrolldelay = setTimeout('pageScroll()',5000);
	}else{
		scrolldelay = setTimeout('pageScrollBack()',0);
	}

}

function pageScroll() {
	var velocidad = 4;

    window.scrollBy(0,velocidad); 
 
	//obtener maximo scroll
	let a=(Math.max( document.body.scrollHeight, document.body.offsetHeight, 
	   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )-document.documentElement.clientHeight);
	 
	if(document.documentElement.scrollTop==a){
		//topFunction();
		pageScrollBack();
	}else{
		scrolldelay = setTimeout('pageScroll()',50);
	}

}
