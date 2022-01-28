document.addEventListener('DOMContentLoaded', ()=>{
    let optionBtn = document.getElementsByTagName("input")
    let txtOptBtn = document.getElementsByTagName("label")
    let btnRegister = document.getElementById("btnRegister")
    let btnConnectR = document.getElementById("btnConnectR")
    let loginForm = document.getElementById("pageLogin")
    let pageLogReg = document.getElementById("pageLogReg")
    let pageAjoutQ = document.getElementById("pageAjoutQ")
    let registerForm = document.getElementById("pageRegister")
    let btnRegisterSubmit = document.getElementById("btnRegisterSubmit")
    let btnConnectSubmit = document.getElementById('btnConnectSubmit')
    let btnsaveQuestion = document.getElementById("saveQuestion")
    let btnLoadQuestion = document.getElementById('loadQuestion')
    let btnNextQuestion= document.getElementById('nextQuestion')
    let btnPreviousQuestion = document.getElementById("previousQuestion")
    let themeSave =[{themes: "" , q1:"",q2:"",q3:"",q4:"",q5:"",repQ:"" }]
    let themeSaveTemp
    let themeFocus = 0

    for (i = 0 ; i<= 3; i++){
        txtOptBtn[i].innerHTML = optionBtn[i].value;
    }
    document.addEventListener("keypress", function(e){
        
        if (e.code == "Equal"){
            pageLogReg.classList.toggle("toDown")
            pageAjoutQ.classList.toggle("toDown")
        }

    })
    btnNextQuestion.addEventListener('click',function(){
        themeFocus++;
        loadQuestions()
    })
    btnPreviousQuestion.addEventListener('click', function(){
        themeFocus --;
        loadQuestions();
    })
    btnLoadQuestion.addEventListener('click', function(){
        loadQuestions();
    })
    btnsaveQuestion.addEventListener('click', function(){
        themeSave.themes = document.getElementById('themeSelect').value
        themeSave.q1 = document.getElementById('questionAjout').value
        themeSave.q2 = document.getElementById('repAjout1').value
        themeSave.q3 = document.getElementById('repAjout2').value
        themeSave.q4 = document.getElementById('repAjout3').value
        themeSave.q5 = document.getElementById('repAjout4').value
        themeSave.repQ = document.getElementById('repAjout5').value
        
       addQtoDB()
       //registerDB()
        document.getElementById('themeSelect').value = ""
        document.getElementById('questionAjout').value = ""
        document.getElementById('repAjout1').value = ""
        document.getElementById('repAjout2').value = ""
        document.getElementById('repAjout3').value = ""
        document.getElementById('repAjout4').value = ""
        document.getElementById('repAjout5').value = ""
    })
    btnRegister.addEventListener('click',function() {
        loginForm.classList.toggle('hidden')
        registerForm.classList.toggle('hidden')
    })
    btnConnectR.addEventListener('click', function(){
        loginForm.classList.toggle('hidden')
        registerForm.classList.toggle('hidden')

    })
    function loadQuestions (){
        let request = window.indexedDB.open("MyTestDatabase6");
        let themesSelected     = document.getElementById('themeSelect').value
            
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            
            let db = event.target.result;
            let transaction = db.transaction("themeSave2");
            let objectStore = transaction.objectStore("themeSave2");
            let test1 = objectStore.index("themes");
            let test = test1.getAll(themesSelected);
            test.onsuccess = function(){
                if (test.result){
                    let themeSaveTemp = test.result
                    if (themeSaveTemp.length > themeFocus){
                    document.getElementById('themeSelect').value = themeSaveTemp[themeFocus].themes
                    document.getElementById('questionAjout').value = themeSaveTemp[themeFocus].q1
                    document.getElementById('repAjout1').value = themeSaveTemp[themeFocus].q2
                    document.getElementById('repAjout2').value = themeSaveTemp[themeFocus].q3
                    document.getElementById('repAjout3').value = themeSaveTemp[themeFocus].q4
                    document.getElementById('repAjout4').value = themeSaveTemp[themeFocus].q5
                    document.getElementById('repAjout5').value = themeSaveTemp[themeFocus].repQ               
                } else if (themeSaveTemp.length == 0){
                    alert ("pas de données à afficher")
                } else if (themeSaveTemp.length< themeFocus ){
                    themeFocus = 0
                    document.getElementById('themeSelect').value = themeSaveTemp[themeFocus].themes
                    document.getElementById('questionAjout').value = themeSaveTemp[themeFocus].q1
                    document.getElementById('repAjout1').value = themeSaveTemp[themeFocus].q2
                    document.getElementById('repAjout2').value = themeSaveTemp[themeFocus].q3
                    document.getElementById('repAjout3').value = themeSaveTemp[themeFocus].q4
                    document.getElementById('repAjout4').value = themeSaveTemp[themeFocus].q5
                    document.getElementById('repAjout5').value = themeSaveTemp[themeFocus].repQ
                }
                    
                } else {
                    alert("Cet utilisateur n'existe pas, Veuillez réessayer.")
                }
            }
            test.onerror = function() {
                
                alert("MDP ou Pseudo réssayer!!")
            }
           
            };
    }
    // document.getElementById('nomRegister').value ="Medjahed"
    // document.getElementById('prenomRegister').value = "Khalil"
    // document.getElementById('ageRegister').value = 37
    // document.getElementById('pseudoRegister').value = "Kalilov"
    // document.getElementById('mailRegister').value = "kalilov@hotmail.com"
    // document.getElementById('mdpRegister').value = "test"
      
    if (!window.indexedDB) {
        window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
    }
    
    btnRegisterSubmit.addEventListener('click',function(){
        user.nom = document.getElementById('nomRegister').value
        user.prenom = document.getElementById('prenomRegister').value
        user.age = document.getElementById('ageRegister').value
        user.pseudo = document.getElementById('pseudoRegister').value
        user.email = document.getElementById('mailRegister').value
        user.mdp = document.getElementById('mdpRegister').value
        //registerDB() //création de la base de données pour les utilisateurs
        ajouterUser();
    })
    function addQtoDB(){
        let request = window.indexedDB.open("MyTestDatabase6");
        request.onsuccess = function(event){
            let db = event.target.result;
            let transaction = db.transaction("themeSave2","readwrite");
            var objectStore = transaction.objectStore("themeSave2");
            var request = objectStore.add(themeSave);
            request.onsuccess = function(event) {
                alert("Question ajouté")
            };
            request.onerror = function(event) {
                alert("Utilisateur déja présent, veuillez réessayer.")
            }
        }
    }
    function registerDB(){
        let request = window.indexedDB.open("MyTestDatabase6",3);
        request.onerror = function(event) {
            // Gestion des erreurs.
            alert("erreur")
          };
          request.onupgradeneeded = function(event) {
            let db = event.target.result;
          
            // Créer un objet de stockage qui contient les informations de nos clients.
            
            let objectStore = db.createObjectStore("themeSave2", { autoIncrement : true });
          
            // Créer un index pour rechercher les clients par leur nom. Nous pourrions
            // avoir des doublons (homonymes), alors on n'utilise pas d'index unique.
            objectStore.createIndex("themes", "themes", { unique: false });
          
            // Créer un index pour rechercher les clients par leur adresse courriel. Nous voulons nous
            // assurer que deux clients n'auront pas la même, donc nous utilisons un index unique.
            //objectStore.createIndex("email", "email", { unique: true });
          
            // Utiliser la transaction "oncomplete" pour être sûr que la création de l'objet de stockage
            // est terminée avant d'ajouter des données dedans.
            objectStore.transaction.oncomplete = function(event) {
              // Stocker les valeurs dans le nouvel objet de stockage.
              let customerObjectStore = db.transaction("themeSave2", "readwrite").objectStore("themeSave2");
              
                customerObjectStore.add(themeSave);
              console.log("&&&&éééé")
            }
          };
          
    }
    btnConnectSubmit.addEventListener("click",function(){
        login();
    })
    function login (){
        let pseudoLoginValue = document.getElementById("pseudoLogin").value
        let mdpLoginValue = document.getElementById("mdpLogin").value
        let request = window.indexedDB.open("MyTestDatabase6");
        
            
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            
            let db = event.target.result;
            let transaction = db.transaction("user");
            let objectStore = transaction.objectStore("user");
            let test = objectStore.get(pseudoLoginValue);
            test.onsuccess = function(){
                if (test.result){
                    if (test.result.mdp=== mdpLoginValue){
                        alert('Vous êtes connecté')
                    } else {
                        alert("Mot de passe erroné veuillez réessayer.")
                    }
                } else {
                    alert("Cet utilisateur n'existe pas, Veuillez réessayer.")
                }
            }
            test.onerror = function() {
                
                alert("MDP ou Pseudo réssayer!!")
            }
           
        };
    }
    function ajouterUser(){
        let request = window.indexedDB.open("MyTestDatabase6");
        request.onsuccess = function(event){
            let db = event.target.result;
            let transaction = db.transaction("user","readwrite");
            var objectStore = transaction.objectStore("user");
            var request = objectStore.add(user);
            request.onsuccess = function(event) {
                alert("utilisateur ajouté")
            };
            request.onerror = function(event) {
                alert("Utilisateur déja présent, veuillez réessayer.")
            }
        }
    }
})
