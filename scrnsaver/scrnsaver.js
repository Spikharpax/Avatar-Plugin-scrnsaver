const {Graph} = require('cyto-avatar');
let exec = require('child_process').exec;

let cyto;
exports.addPluginElements = function(CY){

    // init variable globale module Graph
   cyto = new Graph (CY, __dirname);
	 cyto.loadAllGraphElements()
	 .then(elems => {
		 if (!elems || elems.length == 0) {
			 addScreenSaverGraph(cyto)
			 .then(elem => cyto.onClick(elem, (evt) => {
					 screenSaver();
			 }))
			 .catch(err => {
				 console.log('err:', err || 'erreur dans la création de l\'élément Screen Saver');
			 })
		 } else {
			 cyto.onClick(elems[0], (evt) => {
				 screenSaver();
			 });
		 }
	 })


 }


 exports.onAvatarClose = function(callback){

   cyto.saveAllGraphElements("ScrnSaver")
   .then(() => {
     callback();
   })
   .catch(err => {
     console.log('Error saving Elements', err)
     callback();
   })

 }


 function addScreenSaverGraph() {
	 return new Promise((resolve, reject) => {
     cyto.getGraph()
     .then(cy => cyto.addGraphElement(cy, "ScrnSaver"))
     .then(elem => cyto.addElementClass(elem, "ScrnSaver"))
     .then(elem => cyto.addElementImage(elem, __dirname+"/assets/images/scrnsaver.png"))
     .then(elem => cyto.addElementSize(elem, 45))
     .then(elem => cyto.addElementRenderedPosition(elem, 64, 68))
	 //.then(elem => cyto.lockElement(elem, true))
     .then(elem => {
         resolve(elem);
     })
     .catch(err => {
       reject();
     })
   })
 }


 function screenSaver() {
	exec(__dirname + "/scrnsave.lnk", function (err, stdout, stderr) {});
 }



exports.action = function(data, callback){

	callback();

}
