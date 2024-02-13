import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import PopularEvents from "./home/event/PopularEvents";
import Popularjobs from "./home/popular/Popularjobs";

// job details screen
import EventInfo from "./eventdetails/company/EventInfo";
import { default as JobTabs } from "./eventdetails/tabs/Tabs";
import { default as EventAbout } from "./eventdetails/about/About";
import { default as JobFooter } from "./eventdetails/footer/Footer";
import Specifics from "./eventdetails/specifics/Specifics";

// common
import PopularEventCard from "./common/cards/event/PopularEventCard";

export {
  ScreenHeaderBtn,
  Welcome,
  PopularEvents,
  Popularjobs,
  EventInfo as Company,
  JobTabs,
  EventAbout,
  JobFooter,
  Specifics,
  PopularEventCard
};
