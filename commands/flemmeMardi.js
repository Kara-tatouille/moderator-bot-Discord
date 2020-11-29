module.exports = {
    name: 'flemmemardi',
    description: 'Send message to let people know about weekly maintenance.',
    cooldown: 10,
    usage: '',
    args: 0,
    aliases: [],
    execute(message) {
        return message.channel.send("Tous les mardi, il y a une maintenance hebdomadaire pour permettre de mettre à jour les serveurs du jeu.\n" +
            "C'est pour s'assurer que les serveurs tournent bien et qu'il n'y ai pas de crash durant la semaine.\n" +
            "Du coup, le jeu n'est pas accessible le mardi matin, jusqu'à 11h~12h (il n'y a jamais d'horraire d'ouverture précise, ca dépent du nombre de chose à faire)\n" +
            "Il faut donc attendre la fin :wink:\n" +
            "(Si ton jeu te dis que tu n'as pas la bonne version c'est normal, la nouvelle version ne sera dispo qu'après la maintenance)"
        );
    },
};
