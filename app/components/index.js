import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import PopularEvents from "./home/event/PopularEvents";
import Popularjobs from "./home/popular/Popularjobs";

// job details screen
import GeneralEventInfo from "./eventdetails/general-event-info/GeneralEventInfo";
import { default as JobTabs } from "./eventdetails/tabs/Tabs";
import { default as EventAbout } from "./eventdetails/about/About";
import { default as JobFooter } from "./eventdetails/footer/Footer";
import PlaceDetails from "./eventdetails/place/PlaceDetails";

// common
import PopularEventCard from "./common/cards/event/PopularEventCard";

export {
  ScreenHeaderBtn,
  Welcome,
  PopularEvents,
  Popularjobs,
  GeneralEventInfo as EventInfo,
  JobTabs,
  EventAbout,
  JobFooter,
  PlaceDetails as Specifics,
  PopularEventCard
};