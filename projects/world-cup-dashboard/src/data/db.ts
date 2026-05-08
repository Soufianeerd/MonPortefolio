export type Region = "Europe" | "Amériques" | "Afrique" | "Asie" | "Océanie";

export interface Team {
  id: string;
  name: string;
  region: Region;
  group: string;
  rankFIFA: number;
  marketValue: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  club: string;
  age: number; // Age in 2026
  position: "ATT" | "MIL" | "DEF" | "GK";
  status: string;
  image: string;
  stats: {
    subject: string;
    value: number;
  }[];
}

export interface HistoricalEdition {
  year: string;
  host: string;
  winner: string;
  runnerUp: string;
  topScorer: string;
  goals: number;
}

export const teams: Team[] = [
  // Europe
  { id: "FRA", name: "France", region: "Europe", group: "A", rankFIFA: 2, marketValue: "1.2B" },
  { id: "ESP", name: "Espagne", region: "Europe", group: "B", rankFIFA: 8, marketValue: "1.0B" },
  { id: "ENG", name: "Angleterre", region: "Europe", group: "C", rankFIFA: 3, marketValue: "1.5B" },
  { id: "GER", name: "Allemagne", region: "Europe", group: "D", rankFIFA: 16, marketValue: "900M" },
  { id: "POR", name: "Portugal", region: "Europe", group: "E", rankFIFA: 6, marketValue: "1.1B" },
  { id: "ITA", name: "Italie", region: "Europe", group: "F", rankFIFA: 9, marketValue: "800M" },
  { id: "NED", name: "Pays-Bas", region: "Europe", group: "G", rankFIFA: 7, marketValue: "750M" },
  { id: "BEL", name: "Belgique", region: "Europe", group: "H", rankFIFA: 4, marketValue: "600M" },
  // Amériques
  { id: "BRA", name: "Brésil", region: "Amériques", group: "I", rankFIFA: 5, marketValue: "1.2B" },
  { id: "ARG", name: "Argentine", region: "Amériques", group: "J", rankFIFA: 1, marketValue: "850M" },
  { id: "URU", name: "Uruguay", region: "Amériques", group: "K", rankFIFA: 11, marketValue: "500M" },
  { id: "USA", name: "USA", region: "Amériques", group: "L", rankFIFA: 13, marketValue: "400M" },
  { id: "MEX", name: "Mexique", region: "Amériques", group: "A", rankFIFA: 15, marketValue: "350M" },
  { id: "CAN", name: "Canada", region: "Amériques", group: "B", rankFIFA: 45, marketValue: "200M" },
  // Afrique
  { id: "MAR", name: "Maroc", region: "Afrique", group: "C", rankFIFA: 12, marketValue: "450M" },
  { id: "SEN", name: "Sénégal", region: "Afrique", group: "D", rankFIFA: 17, marketValue: "350M" },
  { id: "NGA", name: "Nigéria", region: "Afrique", group: "E", rankFIFA: 28, marketValue: "300M" },
  { id: "CIV", name: "Côte d'Ivoire", region: "Afrique", group: "F", rankFIFA: 39, marketValue: "280M" },
  { id: "EGY", name: "Égypte", region: "Afrique", group: "G", rankFIFA: 36, marketValue: "150M" },
  // Asie
  { id: "JPN", name: "Japon", region: "Asie", group: "H", rankFIFA: 18, marketValue: "320M" },
  { id: "KOR", name: "Corée du Sud", region: "Asie", group: "I", rankFIFA: 22, marketValue: "250M" },
  { id: "AUS", name: "Australie", region: "Asie", group: "J", rankFIFA: 23, marketValue: "100M" },
  { id: "KSA", name: "Arabie Saoudite", region: "Asie", group: "K", rankFIFA: 53, marketValue: "80M" },
  // Océanie
  { id: "NZL", name: "Nouvelle-Zélande", region: "Océanie", group: "L", rankFIFA: 104, marketValue: "50M" },
];

export const players: Player[] = [
  {
    id: "p1", name: "Kylian Mbappé", teamId: "FRA", club: "Real Madrid", age: 27, position: "ATT", status: "Capitaine",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_FIFA_World_Cup_France_4%E2%80%931_Australia_-_%287%29_%28cropped%29.jpg/330px-2022_FIFA_World_Cup_France_4%E2%80%931_Australia_-_%287%29_%28cropped%29.jpg",
    stats: [ { subject: "Vitesse", value: 98 }, { subject: "Dribble", value: 92 }, { subject: "Frappe", value: 94 }, { subject: "Physique", value: 78 }, { subject: "Passe", value: 85 }, { subject: "Mental", value: 90 } ]
  },
  {
    id: "p2", name: "Lamine Yamal", teamId: "ESP", club: "FC Barcelone", age: 18, position: "ATT", status: "Prodige",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lamine_Yamal_2023.jpg/330px-Lamine_Yamal_2023.jpg",
    stats: [ { subject: "Vitesse", value: 91 }, { subject: "Dribble", value: 96 }, { subject: "Frappe", value: 84 }, { subject: "Physique", value: 65 }, { subject: "Passe", value: 89 }, { subject: "Mental", value: 82 } ]
  },
  {
    id: "p3", name: "Jude Bellingham", teamId: "ENG", club: "Real Madrid", age: 23, position: "MIL", status: "Moteur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Jude_Bellingham_2023.jpg/330px-Jude_Bellingham_2023.jpg",
    stats: [ { subject: "Vitesse", value: 82 }, { subject: "Dribble", value: 88 }, { subject: "Frappe", value: 85 }, { subject: "Physique", value: 89 }, { subject: "Passe", value: 91 }, { subject: "Mental", value: 94 } ]
  },
  {
    id: "p4", name: "Vinícius Júnior", teamId: "BRA", club: "Real Madrid", age: 25, position: "ATT", status: "Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vin%C3%ADcius_J%C3%BAnior_2023.jpg/330px-Vin%C3%ADcius_J%C3%BAnior_2023.jpg",
    stats: [ { subject: "Vitesse", value: 95 }, { subject: "Dribble", value: 96 }, { subject: "Frappe", value: 88 }, { subject: "Physique", value: 75 }, { subject: "Passe", value: 84 }, { subject: "Mental", value: 85 } ]
  },
  {
    id: "p5", name: "Achraf Hakimi", teamId: "MAR", club: "Paris SG", age: 27, position: "DEF", status: "Leader",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Achraf_Hakimi_2022.jpg/330px-Achraf_Hakimi_2022.jpg",
    stats: [ { subject: "Vitesse", value: 94 }, { subject: "Dribble", value: 85 }, { subject: "Frappe", value: 78 }, { subject: "Physique", value: 82 }, { subject: "Passe", value: 86 }, { subject: "Mental", value: 88 } ]
  },
  {
    id: "p6", name: "Jamal Musiala", teamId: "GER", club: "Bayern Munich", age: 23, position: "MIL", status: "Créateur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Jamal_Musiala_2022.jpg/330px-Jamal_Musiala_2022.jpg",
    stats: [ { subject: "Vitesse", value: 86 }, { subject: "Dribble", value: 95 }, { subject: "Frappe", value: 82 }, { subject: "Physique", value: 68 }, { subject: "Passe", value: 88 }, { subject: "Mental", value: 80 } ]
  },
  {
    id: "p7", name: "Phil Foden", teamId: "ENG", club: "Manchester City", age: 26, position: "ATT", status: "Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Phil_Foden_2023.jpg/330px-Phil_Foden_2023.jpg",
    stats: [ { subject: "Vitesse", value: 88 }, { subject: "Dribble", value: 92 }, { subject: "Frappe", value: 86 }, { subject: "Physique", value: 70 }, { subject: "Passe", value: 89 }, { subject: "Mental", value: 85 } ]
  },
  {
    id: "p8", name: "Federico Valverde", teamId: "URU", club: "Real Madrid", age: 27, position: "MIL", status: "Capitaine",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Federico_Valverde_2023.jpg/330px-Federico_Valverde_2023.jpg",
    stats: [ { subject: "Vitesse", value: 89 }, { subject: "Dribble", value: 82 }, { subject: "Frappe", value: 88 }, { subject: "Physique", value: 92 }, { subject: "Passe", value: 86 }, { subject: "Mental", value: 94 } ]
  },
  {
    id: "p9", name: "Christian Pulisic", teamId: "USA", club: "AC Milan", age: 27, position: "ATT", status: "Leader",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Christian_Pulisic_2023.jpg/330px-Christian_Pulisic_2023.jpg",
    stats: [ { subject: "Vitesse", value: 88 }, { subject: "Dribble", value: 86 }, { subject: "Frappe", value: 80 }, { subject: "Physique", value: 72 }, { subject: "Passe", value: 81 }, { subject: "Mental", value: 85 } ]
  },
  {
    id: "p10", name: "Takefusa Kubo", teamId: "JPN", club: "Real Sociedad", age: 25, position: "ATT", status: "Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Takefusa_Kubo_2023.jpg/330px-Takefusa_Kubo_2023.jpg",
    stats: [ { subject: "Vitesse", value: 87 }, { subject: "Dribble", value: 91 }, { subject: "Frappe", value: 81 }, { subject: "Physique", value: 65 }, { subject: "Passe", value: 85 }, { subject: "Mental", value: 80 } ]
  },
  {
    id: "p11", name: "Chris Wood", teamId: "NZL", club: "Nottingham Forest", age: 34, position: "ATT", status: "Vétéran",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chris_Wood_2021.jpg/330px-Chris_Wood_2021.jpg",
    stats: [ { subject: "Vitesse", value: 60 }, { subject: "Dribble", value: 65 }, { subject: "Frappe", value: 84 }, { subject: "Physique", value: 90 }, { subject: "Passe", value: 68 }, { subject: "Mental", value: 88 } ]
  },
  {
    id: "p12", name: "Victor Osimhen", teamId: "NGA", club: "Galatasaray", age: 27, position: "ATT", status: "Buteur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Victor_Osimhen_2023.jpg/330px-Victor_Osimhen_2023.jpg",
    stats: [ { subject: "Vitesse", value: 92 }, { subject: "Dribble", value: 84 }, { subject: "Frappe", value: 90 }, { subject: "Physique", value: 88 }, { subject: "Passe", value: 72 }, { subject: "Mental", value: 85 } ]
  }
];

export const history: HistoricalEdition[] = [
  { year: "2022", host: "Qatar", winner: "Argentine", runnerUp: "France", topScorer: "Kylian Mbappé", goals: 8 },
  { year: "2018", host: "Russie", winner: "France", runnerUp: "Croatie", topScorer: "Harry Kane", goals: 6 },
  { year: "2014", host: "Brésil", winner: "Allemagne", runnerUp: "Argentine", topScorer: "James Rodríguez", goals: 6 },
  { year: "2010", host: "Afr. du Sud", winner: "Espagne", runnerUp: "Pays-Bas", topScorer: "Müller / Villa / Sneijder / Forlán", goals: 5 },
  { year: "2006", host: "Allemagne", winner: "Italie", runnerUp: "France", topScorer: "Miroslav Klose", goals: 5 },
  { year: "2002", host: "Corée/Japon", winner: "Brésil", runnerUp: "Allemagne", topScorer: "Ronaldo", goals: 8 },
  { year: "1998", host: "France", winner: "France", runnerUp: "Brésil", topScorer: "Davor Šuker", goals: 6 },
];
