import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const events = [
    {
      dates: ['2017-10-11'],
      selection: ['Normandie>Calvados>Caen'],
      identifiant: '44075578',
      titre_fr: 'Un fablab \u00e0 la biblioth\u00e8que !',
      description_fr: 'Atelier de d\u00e9coupe polystyr\u00e8ne',
      description_longue_fr:
        'D\u00e9monstration et d\u00e9couverte des outils fablab. Au programme : impression 3D, d\u00e9coupe laser, broderie num\u00e9rique. Rencontres et focus sur la th\u00e9matique du textile.\n\nIcon made by Freepikfrom www.flaticon.com',
      detail_des_conditions_fr: 'Entr\u00e9e libre',
      description_longue_html_fr:
        '<p>D\u00e9monstration et d\u00e9couverte des outils fablab. Au programme : impression 3D, d\u00e9coupe laser, broderie num\u00e9rique. Rencontres et focus sur la th\u00e9matique du textile.</p>\n<p>Icon made by Freepikfrom <a href="//www.flaticon.com" class="url" target="_blank">www.flaticon.com</a></p>',
      type_d_animation: 'Atelier',
      mots_cles_fr: [
        'fablab',
        'imprimante 3D',
        'brodeuse num\u00e9rique',
        'textile',
      ],
      image:
        'https://cibul.s3.amazonaws.com/event_ateliers-de-materiel-numerique_505_551707.jpg',
      apercu:
        'https://cibul.s3.amazonaws.com/evtbevent_ateliers-de-materiel-numerique_505_551707.jpg',
      image_source:
        'https://cibul.s3.amazonaws.com/evfevent_ateliers-de-materiel-numerique_505_551707.jpg',
      derniere_mise_a_jour: '2017-08-24T13:33:35+00:00',
      resume_horaires_fr: 'Mercredi 11 octobre 2017, 14h00',
      horaires_detailles_fr: 'mercredi 11 octobre 2017 - 14h00 \u00e0 16h00',
      resume_dates_fr: 'mercredi 11 octobre 2017 - 14h00 \u00e0 16h00',
      thematiques: [
        'Ing\u00e9nierie et industrie',
        'Nouvelles technologies, num\u00e9rique, informatique',
      ],
      publics_concernes: null,
      lien_d_inscription: null,
      age_minimum: null,
      age_maximum: null,
      en_une: null,
      statut: 'publi\u00e9',
      lien: 'https://openagenda.com/fetedelascience2017/events/ateliers-de-materiel-numerique_505',
      identifiant_du_lieu: '49494968',
      nom_du_lieu: 'Biblioth\u00e8que de la Gu\u00e9rini\u00e8re - M.J.C.',
      adresse: '10 rue des Bouviers 14000 Caen',
      code_postal: '14000',
      ville: 'Caen',
      arrondissement: null,
      departement: 'Calvados',
      region: 'Normandie',
      pays: 'France (M\u00e9tropole)',
      image_du_lieu: null,
      telephone_du_lieu: '02 14 37 29 83',
      site_web_du_lieu:
        'http://bibliotheques.caenlamer.fr/caen-bibliotheque-la-gueriniere-presentation.aspx',
      tags_du_lieu: null,
      description_du_lieu_fr: null,
      liens_du_lieu: null,
      acces_itineraire_fr: null,
      animateurs: null,
      organisateur: 'Biblioth\u00e8que de Caen',
      partenaire: 'Tandem, le D\u00f4me',
      geolocalisation: { lon: -0.34709599999999996, lat: 49.163128 },
      horaires_iso: '2017-10-11T14:00:00+02:00-2017-10-11T16:00:00+02:00',
      evenements_lies: null,
      titre_es: null,
      description_es: null,
      description_longue_es: null,
      detail_des_conditions_es: null,
      description_longue_html_es: null,
      mots_cles_es: null,
      derniere_date: '2017-10-11',
      derniere_ouverture: '0001-01-01T14:00:00+00:00',
      derniere_fermeture: '0001-01-01T16:00:00+00:00',
      public_specifique: null,
      inscription_necessaire: 'Non',
      accessibilite: null,
      credits_de_l_image_du_lieu: null,
      description_du_lieu_es: null,
      acces_itineraire_es: null,
      referent_scientifique: null,
      date_debut: 'mercredi 11 octobre 2017',
      date_debut_jour: '11',
      date_debut_mois: 'octobre',
      date_fin: 'mercredi 11 octobre 2017',
      date_fin_jour: '11',
      date_fin_mois: 'octobre',
      tranche: null,
      ages: null,
      nb_evenements: 1,
    },
    {
      dates: ['2017-10-11'],
      selection: ['\u00cele-de-France>Paris>Paris'],
      identifiant: '28150105',
      titre_fr: "L'Univers: du Big-Bang \u00e0 nos jours",
      description_fr:
        "La cosmologie a connu une r\u00e9volution observationnelle depuis des ann\u00e9es : les avanc\u00e9es technologiques permettent d'observer l'Univers \u00e0 diff\u00e9rentes \u00e9poques avec des m\u00e9thodes compl\u00e9mentaires.",
      description_longue_fr:
        "La cosmologie est un domaine qui a connu une v\u00e9ritable r\u00e9volution observationnelle depuis une vingtaine d'ann\u00e9es : les avanc\u00e9es technologiques permettent d\u00e9sormais d'observer l'Univers \u00e0 diff\u00e9rentes \u00e9poques avec de nombreuses m\u00e9thodes compl\u00e9mentaires. Le contenu et l'histoire de l'Univers posent, cependant, de nombreuses questions dont les plus criantes sont\u00a0: Qu'est-ce que la mati\u00e8re noire ? Qu'est-ce qui provoque l'acc\u00e9l\u00e9ration de l'expansion de l'Univers ? Que s'est-il pass\u00e9 aux tout premiers instants ?",
      detail_des_conditions_fr: 'Entr\u00e9e libre',
      description_longue_html_fr:
        '<p>La cosmologie est un domaine qui a connu une v\u00e9ritable r\u00e9volution observationnelle depuis une vingtaine d&#39;ann\u00e9es : les avanc\u00e9es technologiques permettent d\u00e9sormais d&#39;observer l&#39;Univers \u00e0 diff\u00e9rentes \u00e9poques avec de nombreuses m\u00e9thodes compl\u00e9mentaires. Le contenu et l&#39;histoire de l&#39;Univers posent, cependant, de nombreuses questions dont les plus criantes sont : Qu&#39;est-ce que la mati\u00e8re noire ? Qu&#39;est-ce qui provoque l&#39;acc\u00e9l\u00e9ration de l&#39;expansion de l&#39;Univers ? Que s&#39;est-il pass\u00e9 aux tout premiers instants ?</p>',
      type_d_animation: 'Conf\u00e9rence / Rencontre',
      mots_cles_fr: [
        'Temps',
        'Conf\u00e9rence',
        'Physique',
        'Cosmologie',
        'Grand public',
      ],
      image:
        'https://cibul.s3.amazonaws.com/event_l-univers-du-big-bang-a-nos-jours_981_106952.jpg',
      apercu:
        'https://cibul.s3.amazonaws.com/evtbevent_l-univers-du-big-bang-a-nos-jours_981_106952.jpg',
      image_source:
        'https://cibul.s3.amazonaws.com/evfevent_l-univers-du-big-bang-a-nos-jours_981_106952.jpg',
      derniere_mise_a_jour: '2017-08-29T14:59:14+00:00',
      resume_horaires_fr: 'Mercredi 11 octobre 2017, 14h00',
      horaires_detailles_fr: 'mercredi 11 octobre 2017 - 14h00 \u00e0 15h00',
      resume_dates_fr: 'mercredi 11 octobre 2017 - 14h00 \u00e0 15h00',
      thematiques: ['Astronomie, Espace, plan\u00e8te, univers'],
      publics_concernes: null,
      lien_d_inscription: null,
      age_minimum: null,
      age_maximum: null,
      en_une: null,
      statut: 'publi\u00e9',
      lien: 'https://openagenda.com/fetedelascience2017/events/l-univers-du-big-bang-a-nos-jours_981',
      identifiant_du_lieu: '32089244',
      nom_du_lieu:
        'Amphith\u00e9\u00e2tre 4C, Halle aux Farines - Universit\u00e9 Paris Diderot',
      adresse: 'Esplanade Pierre Vidal-Naquet, 75013 Paris',
      code_postal: '75013',
      ville: 'Paris',
      arrondissement: null,
      departement: 'Paris',
      region: '\u00cele-de-France',
      pays: 'France (M\u00e9tropole)',
      image_du_lieu: null,
      telephone_du_lieu: null,
      site_web_du_lieu: null,
      tags_du_lieu: null,
      description_du_lieu_fr: null,
      liens_du_lieu: null,
      acces_itineraire_fr: null,
      animateurs:
        'Jean-Christophe Hamilton, chercheur au laboratoire Astroparticules et Cosmologie',
      organisateur: 'Jean-Christophe Hamilton',
      partenaire: null,
      geolocalisation: { lon: 2.381434, lat: 48.829628 },
      horaires_iso: '2017-10-11T14:00:00+02:00-2017-10-11T15:00:00+02:00',
      evenements_lies: null,
      titre_es: null,
      description_es: null,
      description_longue_es: null,
      detail_des_conditions_es: null,
      description_longue_html_es: null,
      mots_cles_es: null,
      derniere_date: '2017-10-11',
      derniere_ouverture: '0001-01-01T14:00:00+00:00',
      derniere_fermeture: '0001-01-01T15:00:00+00:00',
      public_specifique: null,
      inscription_necessaire: 'Non',
      accessibilite: null,
      credits_de_l_image_du_lieu: null,
      description_du_lieu_es: null,
      acces_itineraire_es: null,
      referent_scientifique: null,
      date_debut: 'mercredi 11 octobre 2017',
      date_debut_jour: '11',
      date_debut_mois: 'octobre',
      date_fin: 'mercredi 11 octobre 2017',
      date_fin_jour: '11',
      date_fin_mois: 'octobre',
      tranche: null,
      ages: null,
      nb_evenements: 7,
    },
    {
      dates: ['2017-10-14'],
      selection: ['Hauts-de-France>Nord>Vieux-Berquin'],
      identifiant: '6566662',
      titre_fr: 'Jeu policier',
      description_fr: 'Enigmes et charades pour les moins de 8 ans.',
      description_longue_fr: 'Anim\u00e9 par " Village du jeu ".',
      detail_des_conditions_fr: 'Renseignements au 03 28 43 55 47.',
      description_longue_html_fr:
        '<p>Anim\u00e9 par &quot; Village du jeu &quot;.</p>',
      type_d_animation: 'Jeu',
      mots_cles_fr: null,
      image: null,
      apercu: null,
      image_source: null,
      derniere_mise_a_jour: '2017-09-12T10:11:18+00:00',
      resume_horaires_fr: 'Samedi 14 octobre 2017, 14h00',
      horaires_detailles_fr: 'samedi 14 octobre 2017 - 14h00 \u00e0 17h00',
      resume_dates_fr: 'samedi 14 octobre 2017 - 14h00 \u00e0 17h00',
      thematiques: [
        'Nouvelles technologies, num\u00e9rique, informatique',
        "Sciences de l'homme et de la soci\u00e9t\u00e9",
      ],
      publics_concernes: null,
      lien_d_inscription: null,
      age_minimum: null,
      age_maximum: null,
      en_une: null,
      statut: 'publi\u00e9',
      lien: 'https://openagenda.com/fetedelascience2017/events/jeu-policier',
      identifiant_du_lieu: '12041533',
      nom_du_lieu: 'm\u00e9diath\u00e8que de Vieux Berquin',
      adresse: '27 Grand Place 59232 Vieux Berquin',
      code_postal: '59232',
      ville: 'Vieux-Berquin',
      arrondissement: null,
      departement: 'Nord',
      region: 'Hauts-de-France',
      pays: 'France (M\u00e9tropole)',
      image_du_lieu: null,
      telephone_du_lieu: '03 28 43 55 47',
      site_web_du_lieu: null,
      tags_du_lieu: null,
      description_du_lieu_fr: null,
      liens_du_lieu: null,
      acces_itineraire_fr: null,
      animateurs: 'Village du Jeu',
      organisateur:
        'M\u00e9diath\u00e8que d\u00e9partementale du Nord - Biblioth\u00e8que en f\u00eate - Ram\u00e8ne ta science',
      partenaire: 'M\u00e9diath\u00e8que de Vieux Berquin',
      geolocalisation: { lon: 2.643024, lat: 50.694398 },
      horaires_iso: '2017-10-14T14:00:00+02:00-2017-10-14T17:00:00+02:00',
      evenements_lies: null,
      titre_es: null,
      description_es: null,
      description_longue_es: null,
      detail_des_conditions_es: null,
      description_longue_html_es: null,
      mots_cles_es: null,
      derniere_date: '2017-10-14',
      derniere_ouverture: '0001-01-01T14:00:00+00:00',
      derniere_fermeture: '0001-01-01T17:00:00+00:00',
      public_specifique: null,
      inscription_necessaire: 'Non',
      accessibilite: null,
      credits_de_l_image_du_lieu: null,
      description_du_lieu_es: null,
      acces_itineraire_es: null,
      referent_scientifique: null,
      date_debut: 'samedi 14 octobre 2017',
      date_debut_jour: '14',
      date_debut_mois: 'octobre',
      date_fin: 'samedi 14 octobre 2017',
      date_fin_jour: '14',
      date_fin_mois: 'octobre',
      tranche: null,
      ages: null,
      nb_evenements: 8,
    },
  ];

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // const response = await axios.request(options);

      setData(events);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
