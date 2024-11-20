# Verwenden Sie ein offizielles Node.js-Image als Basis
FROM node:20

# Erstellen Sie ein Verzeichnis für die Anwendung
WORKDIR /app

# Kopieren Sie die package.json und package-lock.json (falls vorhanden)
COPY package.json package-lock.json ./

# Installieren Sie die Abhängigkeiten
RUN npm install

# Kopieren Sie den Rest des Anwendungscodes
COPY . .

# Stellen Sie sicher, dass die Umgebungsvariablen geladen werden
RUN npm install dotenv

# Bauen Sie das Projekt
RUN npm run build

# Starten Sie die Anwendung
CMD ["npm", "start"]