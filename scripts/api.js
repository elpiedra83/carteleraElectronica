function getData() {
  var grupoSalones = getQueryVariable("gs");
 	if (grupoSalones == "0") {
		grupoSalones = ""
	} 
  var facultad = getQueryVariable("fa").toString();
	if (facultad == "0") {
		facultad = ""
	}
  //var auth = btoa('prueba:prueba');
	var FormData =  {
           "GrupoSalones": grupoSalones.toString(),
		   "Facultad": facultad
       };
   $.ajax({
	headers:{
	'Accept':'application/json',
	'Content-Type':'application/json',
	//'Authorization': 'Basic ' + auth
	},
       type: "POST",
       url: "http://172.16.9.85:8080/serviciosgx/rest/PSHorariosClaseSalon",
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       data: JSON.stringify(FormData) ,
       success: function(data){
           refreshList(data.Horarios)
       }
   });
  setTimeout(
    getData,
    15000
  )
}