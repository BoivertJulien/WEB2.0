# WEB2.0
-----------------------------------------------
----- QUI A FAIS QUOI ? -----------------------
Long: je m'occupe de tous ce qui est graphique en générale: l'arc en ciel, les étoiles, le méchant, la fusée, les tirs, le menu, les vies, et les intéractions avec le clavier et la souris
Julien: je m'occupe du moteur de jeu, et la partie audio, ainsi que les animations en fonction du rythme de l'audio. Et aussi les parties mathématiques "compliqués" comme la normalisation des vecteurs, la waveforme en cercle.

-----------------------------------------------
----- POINTS FORTS : --------------------------
-> GRAPHISMES Psychédéliques proche de nos
    attentes de départ

-> MANIPULATION API WEB AUDIO bien exploité
    effets audio : BiQUAD FILTER & STEREO PAN
    source audio : PLAYER MP3 & OSCILATOR
    visualisation de la waveform et du volume

-> GESTION DES ENTITES
    normalisation des vecteurs de déplacements
    des étoiles et de l'ennemi pour s'assurer
    de leur atteinte d'un endroit de l'écran
    et des vecteurs de déplacement des missiles
    pour un rendu plus sympa/réaliste.
    Joueur, ennemie et étoiles codé en prog Objet.
    Les missiles du joueur et de l'ennemie sont
    stockés dans des objets JSON possédés par les
    classes du joueur/ennemie dans des tableaux.
    Aussi, les entités principales du jeu sont
    ajustés lors d'un resize de l'écran, tandis
    que les étoiles sont toutes supprimés, avant
    que leur création reprenne.

-> JEU SYMPA A JOUER
    Le jeu est agréable à jouer (à petite dose,
    mais c'est déjà ça).

-----------------------------------------------
----- POINTS FAIBLES : ------------------------
-> Pas d'héritage pour les entités

-> Collision des missiles du joueur sur l'ennemie
    L'effet de trainée derrière les missiles du
    joueur sème la confusion , en donnant
    l'impression que le missile aurait du toucher
    l'ennemie
    [Il est possible qu'un problème de code existe,
    mais le vecteur de déplacement des missiles
    tirés sont normalisés puis multiplié par 22.
    Le diamètre de l'ennemie étant supérieur a
    une centaine de pixels, il ne devrait pas y
    avoir de bug quant à la collision des deux]

-> Beaucoup de code n'est pas optimisé.
    Par exemple, certaines formules sont calculés
    à de nombreuses reprises comme la division
    de PI par 2, 3, 4, la division de la largueur
    de l'écran par 2, 3, 4 etc...
