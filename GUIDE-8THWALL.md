# 🚀 Guide d'Installation 8th Wall - BurgerVision AR Pro

## 📋 Prérequis

1. **Compte 8th Wall** : [console.8thwall.com](https://console.8thwall.com)
2. **Essai gratuit** : 14 jours gratuits
3. **Hébergement HTTPS** : Obligatoire pour 8th Wall

## 🔑 Configuration

### Étape 1: Créer un projet 8th Wall
1. Allez sur [console.8thwall.com](https://console.8thwall.com)
2. Créez un compte (essai gratuit)
3. Créez un nouveau projet "Web AR"
4. Notez votre **App Key**

### Étape 2: Configuration de l'App Key
1. Ouvrez `8thwall-config.js`
2. Remplacez `YOUR_8TH_WALL_APP_KEY_HERE` par votre vraie clé
3. Exemple : `appKey: 'abcd1234efgh5678ijkl9012mnop3456'`

### Étape 3: Hébergement HTTPS
**Options recommandées :**

#### A) Netlify (Gratuit + Simple)
1. Allez sur [netlify.com](https://netlify.com)
2. Glissez-déposez votre dossier de projet
3. Votre site sera automatiquement en HTTPS

#### B) GitHub Pages
1. Créez un repository GitHub
2. Uploadez vos fichiers
3. Activez GitHub Pages dans Settings

#### C) Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre projet
3. Déploiement automatique

## 🎯 Configuration des domaines

### Dans la console 8th Wall :
1. Allez dans votre projet
2. Section "Allowed Domains"
3. Ajoutez vos domaines :
   - `votre-site.netlify.app`
   - `votre-username.github.io`
   - `localhost:8080` (pour tests locaux)

## 🧪 Test en local

### Option 1: Serveur Python
```bash
cd votre-projet
python -m http.server 8080 --bind 127.0.0.1
```

### Option 2: Serveur Node.js
```bash
npx http-server -p 8080 -a 127.0.0.1 --ssl
```

### Option 3: Live Server (VS Code)
1. Installez l'extension "Live Server"
2. Clic droit sur `main.html` > "Open with Live Server"

## 📱 Test sur mobile

1. **Déployez sur HTTPS** (Netlify recommandé)
2. **Ouvrez sur mobile** avec Chrome ou Safari
3. **Autorisez la caméra** quand demandé
4. **Testez l'AR** en pointant vers une surface

## 🔧 Optimisations avancées

### Modèles 3D réalistes (optionnel)
1. Créez des modèles .glb avec Blender
2. Uploadez sur un CDN
3. Remplacez les cylindres par des vrais modèles

### Textures haute qualité
1. Ajoutez des textures PBR
2. Utilisez des normal maps
3. Optimisez la taille des fichiers

## 💰 Coûts 8th Wall

- **Essai gratuit** : 14 jours
- **Starter** : $99/mois (jusqu'à 1000 vues/mois)
- **Pro** : $299/mois (jusqu'à 10K vues/mois)
- **Enterprise** : Sur devis

## ❓ Dépannage

### Erreur "App Key invalide"
- Vérifiez que la clé est correcte
- Vérifiez que le domaine est autorisé

### Caméra non détectée
- Vérifiez que le site est en HTTPS
- Autorisez la caméra dans les paramètres

### Performance lente
- Réduisez la qualité dans `8thwall-config.js`
- Désactivez les ombres si nécessaire

## 🆚 Comparaison avec AR.js

| Fonctionnalité | AR.js | 8th Wall |
|---|---|---|
| **Prix** | ✅ Gratuit | 💰 $99/mois |
| **Qualité tracking** | 🟡 Basique | 🟢 Excellent |
| **Stabilité** | 🔴 Instable | 🟢 Très stable |
| **Occlusion** | ❌ Non | ✅ Oui |
| **Ombres réalistes** | ❌ Non | ✅ Oui |
| **Support** | 🟡 Communauté | 🟢 Professionnel |

## 📞 Support

- **Documentation** : [docs.8thwall.com](https://docs.8thwall.com)
- **Exemples** : [8thwall.com/examples](https://8thwall.com/examples)
- **Discord** : Communauté 8th Wall

---

**🎉 Une fois configuré, vous aurez une app AR de qualité professionnelle !**
