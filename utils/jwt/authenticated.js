// Importer la bibliothèque jsonwebtoken
const jwt = require('jsonwebtoken')

// Définir une fonction middleware d'authentification
const authenticated = (req, res, next) => {
    // Récupérer le token d'authentification depuis les cookies de la requête
    const token = req.cookies.access_token
    //console.log('authenticated', token)

    // Si le token est manquant, renvoyer une réponse HTTP avec le code d'erreur 401 (non autorisé)
    if (!token) return res.status(401).json({ error: 'Token is missing' })

    try {
        // Décoder le token avec la clé secrète JWT_SECRET stockée dans les variables d'environnement
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Ajouter les informations de l'utilisateur décryptées à la requête
        req.user = decoded
        // Ajouter un cookie "userID" avec l'ID de l'utilisateur à la réponse
        res.cookie('userID', req.user._id)
        // Passer à la fonction middleware suivante dans la chaîne de middleware
        next()
    } catch (error) {
        // En cas d'erreur de décodage, renvoyer une réponse HTTP avec le code d'erreur 401 (non autorisé)
        return res.status(401).json({ error: 'Invalid token' })
    }
}

// Exporter la fonction middleware d'authentification sous le nom "authenticated"
module.exports = {
    authenticated,
}

/**
 * Dans ce code, le middleware authMiddleware vérifie si le token
 * d'authentification est présent dans l'en-tête de la requête.
 * Si c'est le cas, il vérifie la validité du token en utilisant
 * la clé secrète JWT_SECRET stockée dans les variables d'environnement.
 * Si le token est valide, il ajoute les informations de l'utilisateur
 * (décodées à partir du token) à la requête et appelle la fonction
 * suivante dans la chaîne de middleware en appelant la fonction next().
 * Si le token est invalide ou manquant, il renvoie une erreur 401.
 */
