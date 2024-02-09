import { Stack, useGlobalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  EventAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import EventInfo from "../../components/eventdetails/company/Company";

const tabs = ["À Propos", "Qualifications", "Responsibilities"];

const EventDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', {
    query: 'React Native developer',
    num_pages: '1',
  });

  const event = {
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
  }

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    setRefreshing(false)
  }, []);


  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title='Qualifications'
            points={event.adresse ?? ["N/A"]}
          />
        );

      case "À Propos":
        return (
          <EventAbout info={event.description_longue_fr ?? "No data provided"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={event.type_d_animation ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : !event ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <EventInfo
                image={event.image}
                title={event.titre_fr}
                animationType={event.type_d_animation}
                conditions={event.detail_des_conditions_fr}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter url={event.lien ?? 'https://careers.google.com/jobs/results/'} />
      </>
    </SafeAreaView>
  );
};

export default EventDetails;
