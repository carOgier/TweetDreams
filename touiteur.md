### Caroline Ogier ###

**Projet Touiteur 2e mois de formation sur 9**
Projet sur 3 semaines de Javascript, avant d'avoir aborder ReactJS et en parallèle de nos cours 


Un projet Fil rouge - Touiteur 

Le projet n'est pas fonctionnel pour des raisons de sécurité, le projet a été fait dans le cadre de ma formation au CEFIM et l'adresse de l'API ne doit pas être inclus dans nos projets. 
Le touiteur n'est donc pas ici fonctionnel je peux faire une démonstration au besoin.


## Instructions HTML : 

Un formulaire d'envoi de touits contenant :
Un champs pour entrer son pseudo (limité à 16 caractères).
Un champs pour entrer son message (limité à 256 caractères).
Un bouton pour valider et envoyer le touit.
Une zone dans laquelle afficher les touits reçus 
Il y aura un conteneur composé d'éléments. Chaque élément enfant du conteneur représentera un touit.
Les éléments enfants seront affichés dans l'ordre chronologique (le plus récent au début).
Chaque touit devra afficher le message ainsi que le pseudo de son auteur.


## Instruction CSS : 
Le style est laissé à l'appréciation de l'élève.
En l'occurence j'aime le CSS et je voulais me concentrer sur l'algorithme et pratiquer au maximum la programmation. 
J'ai juste fais un peu de style pour coller à mon thème donc par exemple la lune en css et un dégradé en fond qui simule un levé de soleil quand on descend. 




## Instruction Javascript : 

Il faudra :

Un conteneur avec des éléments enfants représentant chaque touit.
Un affichage dans l'ordre chronologique (le plus récent au début).
Un affichage du message et du pseudo de l'auteur pour chaque touit.
Avec l'API fournis nous devions en 3 semaines en plus des cours réaliser un touiteur fonctionnel qui devait répondre au minimum aux deux premières exigences, le reste était selon notre appréciation et notre temps et nos envies : 


***Envoie des touits sur une API et qu'ils génèrent une boite de dialogue selon la réponse***

***Afficher l'ensemble des touits et faire en sorte que les nouveaux apparaissent au fur et à mesure sans actualisation. Faire un chargement intelligent pour ne pas récupérer les centaines de touits en même temps***


Objectifs complémentaires : 


- Récupérer les termes les plus utilisés et les formater en fonction de leur apparition dans une zone spécifique [**fait**]

- Pouvoir ajouter et retirer des likes à un touit, si possible ajouter un et retirer qu'un avec le local storage [**pas fini**]

- Récupérer les auteurs les plus actifs et mettre un style css particulier pour eux [**fait**]

- Utiliser un service d'avatar centralisé pour que chaque utilisateur précis ait un avatar unique [**fait**]

- Afficher, cacher la liste de commentaires de chaque touit et en poster également dans un panneau latéral ou une modale pour chaque touit [**pas fini**]

- Faire une actualisation automatique des touits affichés, mais pas continuellement, penser à l'API et le nombres de requêtes qu'on devrait faire. [**pas fini**]

- Créer un moyen d'authentification des utilisateurs pour que certains soient des utilisateurs verifiés; ils n'auront alors plus à préciser leur pseudo. [**pas fait**]





Appris : 

    . Accessibilité et HTML sémantique 
    . Gestion du DOM avec génération dans le DOM à partir du javascript 
    . Gestion des Timestamps 
    . Récupérer les informations d'un API et les formater pour les utiiiser 
    . Les callbacks et paramètres de fonctions
    . L'organisation des évenèments 
    . Gestion de l'asynchrone
    . Gestion des erreurs (et les verifications possibles les regex)
    . Environnement de travail Git
    . Organisation des functions et générations de classes, attributs, images, touits