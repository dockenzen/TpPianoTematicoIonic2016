angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicModal,$ionicPopup, $timeout,$state,Chats) {


$scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/tab-dash.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
//    console.log('Doing login', $scope.loginData);
    if($scope.loginData.usuario == null || $scope.loginData.usuario =="")
    {
          $scope.showAlert("Ingrese su usuario");
    }
      else
      {
        var user = $scope.loginData.usuario;
        $scope.usuario = user.trim();

        $scope.showAlert("A jugar " + $scope.usuario);
        var usuario = { "name": $scope.usuario};
        Chats.user = usuario;
        $state.go("tab.piano", usuario);
      }
    };
  
     $scope.showAlert = function(resultado) {
      var alertPopup = $ionicPopup.alert({
         title: resultado
      });
      alertPopup.then(function(res) {
         // Custom functionality....
      });
   };
})

.controller('pianoCtrl', function($scope,$state,$stateParams,$ionicPlatform,$cordovaNativeAudio,$cordovaVibration,$cordovaFile) {


var usuario = $stateParams.name;
var archivo = usuario+"piano.txt";
$scope.melodia = "";


try
{
 $cordovaNativeAudio
    .preloadSimple('vaca', 'mp3/vaca.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });

  $cordovaNativeAudio
    .preloadSimple('leon', 'mp3/leon.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });
    
    $cordovaNativeAudio
    .preloadSimple('elefante', 'mp3/elefante.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });

    $cordovaNativeAudio
    .preloadSimple('gallo', 'mp3/gallo.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });


    $cordovaNativeAudio
    .preloadSimple('gato', 'mp3/gato.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });


    $cordovaNativeAudio
    .preloadSimple('perro', 'mp3/perro.mp3')
    .then(function (msg) {
        //alert(msg);      
    }, function (error) {
      alert(error);
    });
}
catch(e)
{
  alert(e);
}

  $scope.SaveSecuencia = function(){

    $scope.datos = {};
    $scope.datos.melodia = $scope.melodia;
    var datosJSON = JSON.stringify($scope.datos);
    var parseado = JSON.parse(datosJSON);

    $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory,usuario)
        .then(function (success) {
          // success
                  $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory,usuario+"/"+ archivo, datosJSON,true)      
                    .then(function (success) {
                      alert("Se guardó la secuencia correctamente");
                    }, function (error) {
                      // error
                      alert(error);
                      alert("Error al escribir archivo",error.message);
                    });
            }, function (error) {
          // error
          alert("No se pudo encontrar la ruta",error.message);

              $cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory,usuario, false)
               .then(function (success) {
                 // success
                  $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory,usuario+"/"+archivo, datosJSON,true)
                    .then(function (success) {
                      alert("Se guardó la secuencia correctamente");
                      }, function (error) {
                            // error
                            alert(error);
                            console.log("Error al escribir archivo",error.message);
                         }
                    );
                }, function (error) {
                        // error
                        alert(error);
                        console.log("No se pudo crear la ruta",error.name);
                   });            
              });   
  }
/*
  $scope.resetear = function(){
      $cordovaFile.removeFile(cordova.file.externalApplicationStorageDirectory, usuario+"/"+archivo)
      .then(function (success) {
          // success
        }, function (error) {
          // error
        });
    }
*/

  $scope.PlaySecuencia = function(){

    try{
    $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, usuario)
      .then(function (success) {
        // success
            $cordovaFile.checkFile(cordova.file.externalApplicationStorageDirectory,usuario+"/"+archivo)
              .then(function (success) {
               // success
                    // READ
                    $cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory,usuario+"/"+archivo)
                      .then(function (success) {
                        // success
                        //alert(success);
                        var parseado = JSON.parse(success);
                        alert(parseado.melodia);
                        var splitArray = parseado.melodia.split("-");

                        var i = 0;                         
                        function myLoop (splitArray) {           
                              setTimeout(function () {    
                                    $scope.Reproducir(splitArray[i]);
                                    i++;                     
                                    if (i < splitArray.length)
                                    {            
                                       myLoop(splitArray);             
                                    }                        
                            }, 3000)
                        }
                        myLoop(splitArray);                                               
                      }, function (error) {
                        // error
                          alert(error);

                      });
                  }, function (error) {
                         // error
                         console.log(error);
                         alert(error);
            });
      }, function (error) {      
        // error
        alert(error);
      });
    }
    catch(e)
    {
      alert(e);
    }
                  

  }

  $scope.Reproducir = function(opcion){
    try 
    {
      switch (opcion)
      {
        case "vaca":
            $cordovaNativeAudio.play('vaca');
            $cordovaVibration.vibrate([1300, 100, 1300]);
            $scope.melodia = $scope.melodia + "vaca-";
          break;
        case "perro":
            $cordovaNativeAudio.play('perro');
            $cordovaVibration.vibrate([1800, 100, 1800]);
            $scope.melodia = $scope.melodia + "perro-";
          break;
        case "gato":
            $cordovaNativeAudio.play('gato');
            $cordovaVibration.vibrate(1000);
            $scope.melodia = $scope.melodia + "gato-";
          break;
        case "leon":
            $cordovaNativeAudio.play('leon');
            $cordovaVibration.vibrate([1300, 100, 1300]);
            $scope.melodia = $scope.melodia + "leon-";
          break;
        case "elefante":
            $cordovaNativeAudio.play('elefante');
            $cordovaVibration.vibrate([1300, 100, 1300]);
            $scope.melodia = $scope.melodia + "elefante-";
          break;
        case "gallo":
            $cordovaNativeAudio.play('gallo');
            $cordovaVibration.vibrate([2600, 100, 2600]);
            $scope.melodia = $scope.melodia + "gallo-";
          break;
      }
    }
    catch(error)
    {
      alert(error);
    }
  }


  
})

.controller('AccountCtrl', function($scope) {
   $scope.miFoto = 'img/miFoto.png';


});
