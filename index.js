// Inclusion de Mongoose
const mongoose = require('mongoose');
let dbConnection;

// On se connecte à la base de données
// N'oubliez pas de lancer ~/mongodb/bin/mongod dans un terminal !
mongoose.createConnection('mongodb://localhost/blog').then(
    db => {
        console.log("Connection OK");
        dbConnection = db;
    },
    err => console.error(`Connection failed : ${err}`)
);

module.exports({
    getAll: "",
    get: "",
    post:"",
    update:"",
    delete:""
});

// Création du schéma pour les commentaires
let commentaireArticleSchema = new mongoose.Schema({
    pseudo: {type: String, match: /^[a-zA-Z0-9-_]+$/},
    contenu: String,
    date: {type: Date, default: Date.now}
});

// Création du Model pour les commentaires
let CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);

// On crée une instance du Model
let monCommentaire = new CommentaireArticleModel({pseudo: 'Atinux'});
monCommentaire.contenu = 'Salut, super article sur Mongoose !';

// On le sauvegarde dans MongoDB !
monCommentaire.save(function (err) {
    if (err) {
        throw err;
    }
    console.log('Commentaire ajouté avec succès !');
    // On se déconnecte de MongoDB maintenant
    mongoose.connection.close();
});