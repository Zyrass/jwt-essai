const jwt = require('jsonwebtoken')

const authenticated = (req, res, next) => {
    // Récupérer le token d'authentification dans l'en-tête de la requête
    const token = req.cookies.access_token
    //console.log('authenticated', token)

    if (!token) return res.status(401).json({ error: 'Token is missing' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        res.cookie('userID', req.user._id)
        next()
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur 401
        return res.status(401).json({ error: 'Invalid token' })
    }
}

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
