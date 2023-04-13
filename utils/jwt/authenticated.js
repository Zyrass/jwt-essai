const jwt = require('jsonwebtoken')

const authenticated = (req, res, next) => {
    // Récupérer le token d'authentification dans l'en-tête de la requête
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = req.cookies('jwt')
    console.log('authenticated', token)

    // Si le token n'est pas présent dans l'en-tête, renvoyer une erreur
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' })
    }

    try {
        // Vérifier la validité du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Ajouter les informations de l'utilisateur à la requête pour
        // que les routes suivantes puissent y accéder
        req.user = decoded

        // Appeler la fonction suivante (généralement une route) dans la chaîne de middlewares
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
