document.addEventListener('DOMContentLoaded', ()=>{
    let optionBtn = document.getElementsByTagName("input")
    let txtOptBtn = document.getElementsByClassName("textAnswer")
    let btnRegister = document.getElementById("btnRegister")
    let btnConnectR = document.getElementById("btnConnectR")
    let loginForm = document.getElementById("pageLogin")
    let pageLogReg = document.getElementById("pageLogReg")
    let pageAjoutQ = document.getElementById("pageAjoutQ")
    let registerForm = document.getElementById("pageRegister")
    let pageRes = document.getElementById("pageResultat");
    let btnRegisterSubmit = document.getElementById("btnRegisterSubmit")
    let btnConnectSubmit = document.getElementById('btnConnectSubmit')
    let btnsaveQuestion = document.getElementById("saveQuestion")
    let btnLoadQuestion = document.getElementById('loadQuestion')
    let btnNextQuestion= document.getElementById('nextQuestion')
    let btnPreviousQuestion = document.getElementById("previousQuestion")
    let themeSave =[{themes: "" , q1:"",q2:"",q3:"",q4:"",q5:"",repQ:"" }]
    let themeSaveParLot =[{themes: "" , q1:"",q2:"",q3:"",q4:"",q5:"",repQ:"" }]
    let scoreStat =[{pseudo:"",date:"",themes: "" , 
                    q1:"",r1:"",repQ1:"",score1:0,
                    q2:"",r2:"",repQ2:"",score2:0,
                    q3:"",r3:"",repQ3:"",score3:0,
                    q4:"",r4:"",repQ4:"",score4:0}]
    let scoreStatTmp =[{pseudo:"admin",date:"",themes: "" , 
                        q1:"",r1:"",repQ1:"",score1:0,
                        q2:"",r2:"",repQ2:"",score2:0,
                        q3:"",r3:"",repQ3:"",score3:0,
                        q4:"",r4:"",repQ4:"",score4:0}]
    let dateGameSessionStart;
    let user = [{nom:"",prenom:"",age:"",pseudo:"",email:"",mdp:""}]
    let userTmp = [{nom:"medjahed",prenom:"khalil",age:"37",pseudo:"admin",email:"admin@quizz.com",mdp:"admin"}]
    let pageDash =document.getElementById("dashboard")
    let btnThemeBoxTech = document.getElementById("themeBoxTech")
    let btnSubmitAnswer = document.getElementById('btnSubmitAnswer')
    let radioAnswer = document.getElementsByClassName("radioAnswer")
    let btnThemeBoxCinema = document.getElementById("themeBoxCinema")
    let btnThemeBoxGaming = document.getElementById("themeBoxGaming")
    let btnThemeBoxAnimes = document.getElementById("themeBoxAnimes")
    let pCurrentQ = document.getElementById("pCurrentQ1")
    let currentQ, sessionScore,dbName;
    const qPerGame = 3;
    let themeSaveTemp;
    let connected = false
    let themeFocus = 0;
    let qRandomNbr = Math.floor(Math.random()*(qPerGame+1));
    let oldQRandomNbr;
    let themesTxt = "Animés-/Animés-/Animés-/Animés-/Animés-/Animés-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Gaming-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Cinéma-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie-/Technologie"
    let q1Txt = "Où est-ce que Kaneki décide de travailler ?-/Comment s’appelle l’auteur que Kaneki aime beaucoup ?-/Dans quel manga ou anime, le héros est un petit robot ?-/Qui est l’étudiant  qui dépasse certain héro pro ?-/Qui emmène Eren au tribunal ?-/Lors du combat final contre Buu buu , Vegeta déclare que ?-/Quelle est l'année de sortie de la Super Nintendo en France ? -/Dans quelle ville est né Altaïr, le héros du premier Assassin's Creed ?-/Comment s’appel le puissant héro de God of war ?-/De quels jeux Franklin Michael Trevor sont-ils  issus ?-/Quel studio a développé Call of Duty: Advanced Warfare ?-/Quel est le nom du créateur de Mario ?-/Quel moteur graphique utilisé dans les jeux battlefield ?-/Dans the last of us comment appelle t’on le champignon responsable de l’infection ?-/Dans Apex Legend comment se nomme le héros possédant un corbeau ?-/Quel est le studio qui a crée la licence Assassin’s Creed ?-/De quel film est issu la musique culte « Now we are free »?-/Dans le film « La Chute du Faucon noir » quel est la force d’intervention à pied ?-/Dans le film gladiator qui assassine Marc Aurèle ? -/En quel lieu Frodon se fait-il blesser par l'un des neuf cavaliers noirs ?-/A travers quel artefact possédé par Saroumane voit-on luire l'oeil de Sauron ?-/Dans intouchable, qu’elle est l’handicape de Phillipe ?-/Dans The Amazing Spiderman quel est la vraie identité d’électro ?-/Dans X men origins Wolwerine Logan se prend une explosion de quel type ?-/Comment s’ appel le méchant qui a copié la technologie Stark lors du grand prix à Monaco ?-/Dans Transformers comment appelle t’on l’élément pouvant réanimer un transformers ?-/Que veut dire High tech ?-/Que veut dire RAM ?-/Quel est le rôle d’un processeur ?-/Où se trouve le siège d’Intel Corporation ?-/Que veut dire CPL ?-/Quel est le le classement juste  des stockages les plus rapides ?-/Quel type de connexion est la plus rapide ?-/Quel débit est le plus rapide ?-/Quel est le nouveau nom de Facebook?-/Qui est le successeur de Steve Jobs ?"
    let q2Txt = "Dans un bar.-/Takatsuki Sen-/Yume Senshi-/Lemillion-/Erwin Smith-/Goku est un imbécile-/1990-/Jérusalemen-/Credos-/Red dead rédemption 2-/Treyarch studio-/Akira Toriyama-/Unity-/Cordyceps-/Wraith-/Valve-/Gladiator-/Mac V SOG-/Spartacus-/Amon sûl-/Le miroir Galadriel-/Il est paraplégique-/Arthur Parks-/Incident industrielle-/Enton Vanko-/La Matrice de commandement-/Technologie-/Random Access Memory-/D’exécuter des fréquences d’images-/Santa Monica-/Courant porteur de liens-/HDD<SSD<SD<Flash Memory-/VDSL2-/Tera bits/s-/Méta-/Ragnar Lothbrok"
    let q3Txt= "Dans un café appelé l’Antique.-/Tachibana Sen-/Wingman-/Endevor-/Levy-/Goku est le numéro 1-/1991-/Rome-/Démios-/The last of us-/Sledge Hammer Games-/Shigeru Miyamoto-/Unreal Engine-/Coprin-/Sombra-/Bethesda-/Star Wars-/Les Marines-/Octave-/Le mont Ventoux-/Le bâton de pouvoir-/Il est tétraplégique-/Steeve Rogers-/Une explosion-/Ivan Vanko-/Le All Spark-/La petite technologie-/Right Acces Mobile-/D’échanger des données entre les différents composants informatique-/Santa Clara-/Couverture pérméable de ligne-/Flash Memory <SD< HDD<SSD-/Modem-/Gigabyte /s-/Messenger-/Mark Zuckerberg"
    let q4Txt= "Dans un restaurant pour Goule. -/Takatsuki Seido-/Astro Boy-/Hawks-/Hanzi Zoé-/Goku est le plus gentil des sayans-/1992-/Masyaf-/Kratos-/Grand Theft Auto 5-/Rockstar Games-/Zang Yamoto-/Rage-/Amanite Phalloïde-/Bloodhound-/Criterion-/Le seigneur des Anneaux-/La Delta Force-/Comode-/Le Gué de Bruinen-/Le Palantir-/Il est hémiplégique-/Max Dillon-/Une Explosion atomique-/Jin Khanè-/Le cube de commandement-/La haute technologie-/Rainbow Acces Memory-/De stocker des données-/Santa Barbara-/Courant porteur en ligne-/SD<SSD<Flash Memory<HDD-/ADSL-/Mégabyte/s-/Discord-/Richard Branson"
    let q5Txt = "À l’université.-/Akira Mado-/Gundam Wing-/Stain-/Mikasa Ackerman-/Goku est son plus grand rival-/1993-/Sparte-/Sakrot-/Grand theft Auto 4-/Infinity Ward-/Dashan Wang-/Frostbite-/Lactarius Amirus-/Mirage-/Ubisoft-/Il faut sauver le soldat Rayan-/Les Spetsnaz-/Maximus-/Le mont Valérien-/Le Tesseract-/Il est polyphylétique-/Curtis Connors-/Un tir de mortier-/Raymon Barkov-/Le tesseract commandement-/La techno-/Random Admin Memory-/De centraliser la prise en charge de la RAM-/Santa Clause-/Courant paramétrable de ligne-/SSD<HDD<Flash Memory<SD-/Fibre-/Microbytes /s-/Zétaverse-/Tim Cook"
    let repTxt= "2-/1-/3-/4-/2-/2-/2-/3-/3-/3-/2-/2-/4-/1-/3-/4-/1-/3-/3-/1-/3-/2-/3-/3-/2-/1-/3-/1-/2-/2-/3-/2-/4-/1-/1-/4"
    //lancement de l'initialisation
    if (!window.indexedDB) {
        window.alert("Votre navigateur ne supporte pas une version stable d'IndexedDB. Quelques fonctionnalités ne seront pas disponibles.")
    };
    init();
    function init(){
        //préparer la liste de toutes les question et les mettere dans le tableau
        addAllQtoDB();
        dbName = "MyTestDatabase134";
        console.log(indexedDB.databases());
        //verification de l'existance ou non de la base de données
        //si elle n'existe pas on la crée et on crée les table 'objectstore"
        //de nos données qui sont les questions, les users avec un user par défaut "Admin"
        //et ses statistiques
        checkBDD(dbName);
        defaultQuestionsInject("rien",true);
        adminScoreCreate("rien",true,scoreStatTmp[0]);

    }
    //Cette fonction est trés importante car elle permet de créer la base de données 
    //les tables et les enregistrement par défaut, cela va permettre de faire fonctionner
    //le quizz dans n'importe qu'elle navigateur et PC
    function checkBDD (nomBDD){
        let request = window.indexedDB.open(nomBDD);
        request.onsuccess = function(event){
            console.log("Base de donnés et 3 table avec leur données prêtes à l'emploi.")
        };
        request.onerror = function(event){
            alert(event.target.error);
        };
        //dans le cas ou il ne trouve pas la base de données il va détécter que c'est un upgrade
        //dans ce cas il va créer les table user themes et score par défaut
        request.onupgradeneeded = function(event){
           //alert("upgrade");
            let db = event.target.result;
            defaultQuestionsInject(db,false);
            adminUserCreate(db);
            //création uniquement de la table userscore car j'avais des erreurs que je n'ai pas
            // pu résoudre
            adminScoreCreate(db,false,scoreStatTmp[0]);
           
        };
    }
    function adminScoreCreate(dataBase,scoreInject,tableScore){
        if (scoreInject==false){
         //Création de la table user stat avec le pseudo comme key
         let objectStoreUserStat = dataBase.createObjectStore("userstat", {keyPath: 'date'});
         objectStoreUserStat.createIndex("pseudo", "pseudo", { unique: false });
        } else if (scoreInject==true){
            //Ouverture de la base de données
            let request = window.indexedDB.open(dbName);
            request.onsuccess = function(event){
                let db = event.target.result;
                let transaction = db.transaction("userstat","readwrite");
                let objectStore = transaction.objectStore("userstat");
                let request = objectStore.add(tableScore);
                console.log("Stat du User par défaut injécté dans la base de donnée")
            
            };
        }
    }
    function defaultQuestionsInject(dataBase,inject){
        if (inject==false){
            //création de l'objectstore qui corréspond à la table des questions
            let objectStore = dataBase.createObjectStore("themeSave", {keyPath: 'q1'});
            objectStore.createIndex("themes", "themes", { unique: false });
        } else if(inject==true){
            //Ouverture de la base de données
            let request = window.indexedDB.open(dbName);
            request.onsuccess = function(event){
                let db = event.target.result;
                let transaction = db.transaction("themeSave","readwrite");
                // Stocker les valeurs dans le nouvel objet de stockage.
                // et création de la transaction
                let objectStore = transaction.objectStore("themeSave");
                let request
                //rajout des questions par themes
                for (i in themeSaveParLot){
                    request = objectStore.add(themeSaveParLot[i]);
                }
                console.log("Question injécté dans la base de donnée")
            
            };
           
        }
    }
    function adminUserCreate(dataBase){
        //Création de la table users avec le pseudo en tant que Key
        let objectStoreUser = dataBase.createObjectStore("users", {keyPath: 'pseudo'});
        //Création d'un Index Email unique pour chaque enregistrement
        //objectStoreUser.createIndex("email", "email", { unique: true });
        //Quand il fini de créer l'objectstore il effectue les opérations suivantes
        objectStoreUser.transaction.oncomplete = function(event) {
            // Stocker les valeurs dans le nouvel objet de stockage.
            // et création de la transaction
            let customerObjectStoreUser = dataBase.transaction("users", "readwrite").objectStore("users");
            customerObjectStoreUser.add(userTmp[0]);
            console.log("User par défaut injécté dans la base de donnée")
            //création de la table du score pour sauvegarder le score des users
            
        };
    }
    function loadQuestions (dBase){
        let request = window.indexedDB.open(dBase);
        let themesSelected   = document.getElementById('themeSelect').value
            
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            
            let db = event.target.result;
            let transaction = db.transaction("themeSave");
            let objectStore = transaction.objectStore("themeSave");
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
                } else if (themeSaveTemp.length < themeFocus ){
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
    //cette fonction vérifie si les radio sont chéqué ou pas, si une est checked
    //
    function checkAnswerAndSave(){
        for (i=0;i< radioAnswer.length;i++){
            if (radioAnswer[i].checked == true){
                
                break;
            }
        }
        //si pas de réponse donnés sortir de la fonction et retourner un false
        if (i>=radioAnswer.length){
            return false;
        } else {
            //enregistrer le score dans le tableau du score
            scoreStat.pseudo = user[0].pseudo;
            scoreStat.themes = themeSaveTemp[oldQRandomNbr].themes;
            scoreStat.date = dateGameSessionStart;
            scoreStat['q'+(currentQ+1)] = themeSaveTemp[oldQRandomNbr].q1;
            scoreStat["r"+(currentQ+1)] = txtOptBtn[i+1].innerHTML;
            scoreStat["repQ"+(currentQ+1)] = themeSaveTemp[oldQRandomNbr]['q'+(~~themeSaveTemp[oldQRandomNbr].repQ+1)];
            // console.log(scoreStat["r"+(i+1)])
            // console.log(themeSaveTemp[oldQRandomNbr]['q'+(~~themeSaveTemp[oldQRandomNbr].repQ+1)])
            //Vérifier les bonnes questions et stocker le score équivalents
             if (scoreStat["r"+(currentQ+1)]===themeSaveTemp[oldQRandomNbr]['q'+(~~themeSaveTemp[oldQRandomNbr].repQ+1)]) {
                    scoreStat["score"+(currentQ+1)]= 1;
                    sessionScore++;
            } else {
                scoreStat["score"+(currentQ+1)]= 0;
            }

            //dechecker les radio buttons
            for (i=0;i< radioAnswer.length;i++){
                radioAnswer[i].checked = false;
            }
            //enlenver la question qui a été deja posé du tableau charger de la base de données
            themeSaveTemp.splice(oldQRandomNbr,1);
            console.log(scoreStat);
        }
        // alert(i);
        // console.log(themeSaveTemp);
    }
    //Fonction qui permet de charger les questions selon le themes choisi
    //et d'enlever les question déja posées, et de verfier les bonnes réponses
    //et de sauvegarder les réponses donné la date le score .... dans le tableau de
    // l'utilisateur        
    function loadQuestionForQuizz(thmTxt,addQtoDB){
        let request = window.indexedDB.open(addQtoDB);
        currentQ =0;
        sessionScore = 0;
        dateGameSessionStart = new Date();
            
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            
            let db = event.target.result;
            let transaction = db.transaction("themeSave");
            let objectStore = transaction.objectStore("themeSave");
            let test1 = objectStore.index("themes");
            let test = test1.getAll(thmTxt);
            test.onsuccess = function(){
                if (test.result){
                    themeSaveTemp = test.result;
                    hideAllBoxesShowQuizz();
                    showQuestions(themeSaveTemp) ;                   
                } else {
                    alert("Cet utilisateur n'existe pas, Veuillez réessayer.")
                }
            }
            test.onerror = function() {
                
                alert("MDP ou Pseudo réssayer!!")
            }
           
            };
            
    }
    function loadOldScoreFromBD(addQtoDB,userPseudo){
        let request = window.indexedDB.open(addQtoDB);
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            let db = event.target.result;
            let transaction = db.transaction("userstat");
            let objectStore = transaction.objectStore("userstat");
            let test1 = objectStore.index("pseudo");
            let test = test1.getAll(userPseudo);
            test.onsuccess = function(){
                if (test.result){
                scoreStatTmp = test.result;                                   
                } else {
                    
                }
            }
            test.onerror = function() {
                
                
            }
        }
    }
    function hideAllBoxesShowQuizz(){
       document.getElementById("allBoxes").classList.toggle("hidden");
       document.getElementById("quizz").classList.toggle("hidden");
       console.log(user);
    }
    function showQuestions(tableTheme){
       
        console.log(themeSaveTemp)
        oldQRandomNbr= qRandomNbr;
        pCurrentQ.innerHTML = (currentQ+1) +"/"+(qPerGame+1)
        txtOptBtn[0].innerHTML = tableTheme[qRandomNbr].q1;
        txtOptBtn[1].innerHTML = tableTheme[qRandomNbr].q2;
        txtOptBtn[2].innerHTML = tableTheme[qRandomNbr].q3;
        txtOptBtn[3].innerHTML = tableTheme[qRandomNbr].q4;
        txtOptBtn[4].innerHTML = tableTheme[qRandomNbr].q5;
            
        qRandomNbr = Math.floor(Math.random()*(tableTheme.length-1));   
       
    }
    
    function addAllQtoDB(){
        let themesTxtTmp= themesTxt.split("-/");
        let q1TxtTmp= q1Txt.split("-/");
        let q2TxtTmp= q2Txt.split("-/");
        let q3TxtTmp= q3Txt.split("-/");
        let q4TxtTmp= q4Txt.split("-/");
        let q5TxtTmp= q5Txt.split("-/");
        let repQTmp= repTxt.split("-/");
        
        for(i=0; i<themesTxtTmp.length;i++){
            if (i!=0){
            themeSaveParLot.push({themes: "" , q1:"",q2:"",q3:"",q4:"",q5:"",repQ:"" })
            }
            themeSaveParLot[i]["themes"] = themesTxtTmp[i];
            themeSaveParLot[i]["q1"] =q1TxtTmp[i];
            themeSaveParLot[i]["q2"] =q2TxtTmp[i];
            themeSaveParLot[i]["q3"] =q3TxtTmp[i];
            themeSaveParLot[i]['q4'] =q4TxtTmp[i];
            themeSaveParLot[i]["q5"] =q5TxtTmp[i];
            themeSaveParLot[i]["repQ"] =repQTmp[i];

        }
    }
    function addQtoDB(dbNameLogin){
        let request = window.indexedDB.open(dbNameLogin);
        request.onsuccess = function(event){
            let db = event.target.result;
            let transaction = db.transaction("themeSave3","readwrite");
            var objectStore = transaction.objectStore("themeSave3");
            var request = objectStore.add(themeSave);
            request.onsuccess = function(event) {
                alert("Question ajouté")
            };
            request.onerror = function(event) {
                alert("Utilisateur déja présent, veuillez réessayer.")
            }
        }
    }
    
    
    function accountConnection(){
        
        if (connected != false){
            pageDash.classList.toggle("getOut")
            pageLogReg.classList.toggle("getOut")
            let userInfoP = document.getElementsByClassName("myAccountInfo");
            userInfoP[0].innerHTML = "Nom: " +user[0].nom
            userInfoP[1].innerHTML = "Prénom: "+user[0].prenom
            userInfoP[2].innerHTML = "Age : "+user[0].age+"ans"
            userInfoP[3].innerHTML = "Email : "+user[0].email
            userInfoP[4].innerHTML = "Pseudo : "+user[0].pseudo
            userInfoP[5].innerHTML = "Password : "+user[0].mdp
            userInfoP[6].innerHTML = "Historiques"  
            //Lors du clique pour afficher l'historique verrifier que l'on est pas entrain de jouer
            //et vérifier quel fenetre est active
            userInfoP[6].onclick = function(){
                console.log(document.getElementById("quizz").classList);
                console.log(document.getElementById("quizz").classList.contains("hidden"));
                if (!document.getElementById("quizz").classList.contains("hidden")){
                    alert("Veuillez finir votre activités avant de voir les ancien résultats.");
                } else if (!document.getElementById("pageResultat").classList.contains("hidden")) {
                    
                    pageResultatShow("scoreAllHide");
                }else if (!document.getElementById("allBoxes").classList.contains("hidden")){
                    document.getElementById("allBoxes").classList.toggle("hidden");
                    pageResultatShow("scoreAll");
                }
            }
            loadOldScoreFromBD(dbName,user[0].pseudo);  
            console.log(Object.values(user))                   
        }else {

        }
    }
    
    function login (dbNameLogin){
        let pseudoLoginValue = document.getElementById("pseudoLogin").value
        let mdpLoginValue = document.getElementById("mdpLogin").value
        let request = window.indexedDB.open(dbNameLogin);
       // connected=true
       // accountConnection()
            
        request.onerror = function(event) {
            // Gestion des erreurs.
          };
        request.onsuccess = function(event){
            
            let db = event.target.result;
            let transaction = db.transaction("users");
            let objectStore = transaction.objectStore("users");
            let test = objectStore.get(pseudoLoginValue);
            test.onsuccess = function(){
                if (test.result){
                    if (test.result.mdp=== mdpLoginValue){
                       
                        user[0].nom = test.result.nom;
                        user[0].prenom = test.result.prenom;
                        user[0].age = test.result.age;
                        user[0].email = test.result.email;
                        user[0].pseudo = test.result.pseudo;
                        user[0].mdp = test.result.mdp;
                        connected =true;
                        accountConnection()
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
    function ajouterUser(dbNameLogin){
        let request = window.indexedDB.open(dbNameLogin);
        request.onsuccess = function(event){
            let db = event.target.result;
            let transaction = db.transaction("users","readwrite");
            let objectStore = transaction.objectStore("users");
            let request = objectStore.add(user);
            request.onsuccess = function(event) {
                alert("utilisateur ajouté")
                connected =true;
                accountConnection();
            }
            request.onerror = function(event) {
                alert("Utilisateur déja présent, veuillez réessayer.")
            }
        };
    }

    btnSubmitAnswer.addEventListener("click",function(){
       
        if (currentQ <= qPerGame){
            //vérifier qu'il y'a une réponse qui déja choisi
            if( checkAnswerAndSave()!= false){
                if (currentQ!=qPerGame){
                    currentQ++;
                    showQuestions(themeSaveTemp);
                    } else{
                        //termnier le jeux et afficher et sauvegarder le résultat du game dans la base de donées
                        //alert("Jeux terminé")
                        document.getElementById("quizz").classList.toggle("hidden");
                        
                        //Sauvegarder le score dans la base de données
                        adminScoreCreate("rien",true,scoreStat);
                        pageResultatShow("scoreSession");
                    }
            } else {
                alert("Veuillez Choisir Une Réponse SVP")
            } 
            
        } else {
            //termnier le jeux et afficher et sauvegarder le résultat du game dans la base de donées
            alert("Jeux terminé")
            document.getElementById("quizz").classList.toggle("hidden");
        }

    });
    //afficher les résultats du jeux en cours ou des sessions précédentes.
    function pageResultatShow(typeOfShow){
        //Dans le cas d'un appel pour afficher le score de la session en cours 
        if (typeOfShow === "scoreSession"){
            pageRes.classList.toggle("hidden");
            let p = new Object();
            //Créer des élément P et les afficher dans la page pour afficher le résultat détaillé 
            //de la session du jeu qui vient de se finir
            p[0] = document.createElement("p");
            p[1] = document.createElement("p");
            p[0].innerHTML = "Votre score est de "+ sessionScore +"/"+ (qPerGame+1);
            p[1].innerHTML= "Voici le résultat dez vos question en détails "
            p[1].innerHTML+= "<br>Q1:"+scoreStat.q1 +"<br>"+ "Votre Réponses :"+scoreStat.r1+"<br>"+"La bonne Réponses :"+scoreStat.repQ1+"<br><br>"
            p[1].innerHTML+= "Q2:"+scoreStat.q2 +"<br>"+ "Votre Réponses :"+scoreStat.r2+"<br>"+"La bonne Réponses :"+scoreStat.repQ2+"<br><br>"
            p[1].innerHTML+= "Q3:"+scoreStat.q3 +"<br>"+ "Votre Réponses :"+scoreStat.r3+"<br>"+"La bonne Réponses :"+scoreStat.repQ3+"<br><br>"
            p[1].innerHTML+= "Q4:"+scoreStat.q4 +"<br>"+ "Votre Réponses :"+scoreStat.r4+"<br>"+"La bonne Réponses :"+scoreStat.repQ4+"<br><br>"
            pageRes.appendChild(p[0]);
            pageRes.appendChild(p[1]);
            //création du bouton retour à l'accueil
            let homeBtn = document.createElement("input");
            homeBtn.classList.value ="btn btn-primary";
            homeBtn.type="button";
            homeBtn.value="Retour à l'accueil";
            homeBtn.id="btnResultatHome"
            homeBtn.onclick = function(){
                //Lors du clique sur le bouton retour à l'accueil
                //afficher les bonnes div et remove les child de la div page resultat
                //et supprimer le tableau des questions restantes dans le tableau des questions
                //chargées
                document.getElementById("allBoxes").classList.toggle("hidden");
                pageRes.classList.toggle("hidden")
                
                for (i in themeSaveParLot){
                    themeSaveParLot.splice(i,1);
                }
                pageRes.removeChild(homeBtn);
                pageRes.removeChild(p[0]);
                pageRes.removeChild(p[1]);
            }
            pageRes.appendChild(homeBtn);
                  
        }else if(typeOfShow === "scoreAll"){
            pageRes.classList.toggle("hidden");
            scoreStatTmp.length;
            for (i =0; i< scoreStatTmp.length;i++)
            {scoreStatTmp.splice(i,1);}
            loadOldScoreFromBD(dbName, user[0].pseudo);
            let p;
            p = document.createElement("p");
            p.innerHTML = ""
            for (i in scoreStatTmp){
                p.innerHTML += "Votre Score de la session du " + scoreStatTmp[i].date +"<br>";
                p.innerHTML += "Thémes Choisi : "+scoreStatTmp[i].themes +"<br>";
                p.innerHTML += "Q1:"+scoreStatTmp[i].q1 +"<br>"+ "Votre Réponses :"+scoreStatTmp[i].r1+"<br>"+"La bonne Réponses :"+scoreStatTmp[i].repQ1+"<br><br>"
                p.innerHTML += "Q2:"+scoreStatTmp[i].q2 +"<br>"+ "Votre Réponses :"+scoreStatTmp[i].r2+"<br>"+"La bonne Réponses :"+scoreStatTmp[i].repQ2+"<br><br>"
                p.innerHTML += "Q3:"+scoreStatTmp[i].q3 +"<br>"+ "Votre Réponses :"+scoreStatTmp[i].r3+"<br>"+"La bonne Réponses :"+scoreStatTmp[i].repQ3+"<br><br>"
                p.innerHTML += "Q4:"+scoreStatTmp[i].q4 +"<br>"+ "Votre Réponses :"+scoreStatTmp[i].r4+"<br>"+"La bonne Réponses :"+scoreStatTmp[i].repQ4+"<br><br>"
                p.innerHTML += "Votre score était de :" +(scoreStatTmp[i].score1 +scoreStatTmp[i].score2 +scoreStatTmp[i].score3 +scoreStatTmp[i].score4 ) +"/4 <br>"
                pageRes.appendChild(p);
            }
            
        } else if (typeOfShow ==="scoreAllHide"){
            let p = pageRes.getElementsByTagName("p");
            for (i in p){
            p[i].innerHTML = "";
            
            }
            pageRes.classList.toggle("hidden");
            document.getElementById("allBoxes").classList.toggle("hidden");
        }

    }
    

    btnThemeBoxTech.addEventListener("click", function(){
    loadQuestionForQuizz("Technologie",dbName);
    });
    btnThemeBoxCinema.addEventListener("click", function(){
    loadQuestionForQuizz("Cinéma",dbName);
    });
    btnThemeBoxGaming.addEventListener("click", function(){
    loadQuestionForQuizz("Gaming",dbName);
    });
    btnThemeBoxAnimes.addEventListener("click", function(){
    loadQuestionForQuizz("Animés",dbName);

    });
    btnConnectSubmit.addEventListener("click",function(){
        login(dbName);
    });
    document.addEventListener("keypress", function(e){
            
        if (e.code == "Equal"){
            pageLogReg.classList.toggle("toDown");
            pageAjoutQ.classList.toggle("toDown");
        }

    });
    btnNextQuestion.addEventListener('click',function(){
        themeFocus++;;
        loadQuestions(dbName);
    });
    btnPreviousQuestion.addEventListener('click', function(){
        themeFocus --;
        loadQuestions(dbName);
    });
    btnLoadQuestion.addEventListener('click', function(){
        loadQuestions(dbName);
    });
    btnsaveQuestion.addEventListener('click', function(){
        themeSave.themes = document.getElementById('themeSelect').value;
        themeSave.q1 = document.getElementById('questionAjout').value;
        themeSave.q2 = document.getElementById('repAjout1').value;
        themeSave.q3 = document.getElementById('repAjout2').value;
        themeSave.q4 = document.getElementById('repAjout3').value;
        themeSave.q5 = document.getElementById('repAjout4').value;
        themeSave.repQ = document.getElementById('repAjout5').value;

        
        
        addQtoDB()
    //registerDB()
        document.getElementById('themeSelect').value = "";
        document.getElementById('questionAjout').value = "";
        document.getElementById('repAjout1').value = "";
        document.getElementById('repAjout2').value = "";
        document.getElementById('repAjout3').value = "";
        document.getElementById('repAjout4').value = "";
        document.getElementById('repAjout5').value = "";
    });
    btnRegister.addEventListener('click',function() {
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    });
    btnConnectR.addEventListener('click', function(){
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');

    });
    document.getElementById("accountP").addEventListener("click",function(){
        document.getElementById('myAccount').classList.toggle("hidden");
    });
    btnRegisterSubmit.addEventListener('click',function(){
        user.nom = document.getElementById('nomRegister').value;
        user.prenom = document.getElementById('prenomRegister').value;
        user.age = document.getElementById('ageRegister').value;
        user.pseudo = document.getElementById('pseudoRegister').value;
        user.email = document.getElementById('mailRegister').value;
        user.mdp = document.getElementById('mdpRegister').value;
        //registerDB() //création de la base de données pour les utilisateurs
        ajouterUser(dbName);
    });
    document.getElementById("disconnect").addEventListener("click",function(){
        pageDash.classList.toggle("getOut");
        if (!document.getElementById("resultPage").classList.contains("hidden")){
            document.getElementById("resultPage").classList.toggle("hidden");
        }
        if (document.getElementById("allBoxes").classList.contains("hidden")){
            document.getElementById("allBoxes").classList.toggle("hidden");
        }
        if (!document.getElementById("quizz").classList.contains("hidden")){
            document.getElementById("quizz").classList.toggle("hidden");
        }
        if (!document.getElementById("pageResultat").classList.contains("hidden")){
            document.getElementById("pageResultat").classList.toggle("hidden");
        }
        pageLogReg.classList.toggle("getOut");
        connected =false;
    })
    
});