import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import PopularEvents from "./home/event/PopularEvents";
import PopularRoutes from "./home/route/PopularRoutes";

// event details screen
import GeneralEventInfo from "./eventdetails/general-event-info/GeneralEventInfo";
import Tabs from "./eventdetails/tabs/Tabs";
import { default as EventAbout } from "./eventdetails/about/About";
import { default as EventFooter } from "./eventdetails/footer/Footer";
import { default as PlaceDetails } from "./eventdetails/place/PlaceDetails";

// common
import EventCard from "./common/cards/event/EventCard";
import RouteCard from "./common/cards/route/RouteCard";


export {
  ScreenHeaderBtn,
  Welcome,
  PopularEvents,
  PopularRoutes,
  GeneralEventInfo as EventInfo,
  Tabs,
  EventAbout,
  EventFooter,
  PlaceDetails,
  EventCard,
  RouteCard
};
