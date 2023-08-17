import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState("Toutes");
  const [currentPage, setCurrentPage] = useState(1);
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));
typeList.unshift("Toutes");
  
const filteredEvents = data?.events.filter((event) => {
  const isTypeMatched = type === "Toutes" || event.type.toLowerCase() === type.toLowerCase();
  return isTypeMatched;
});
function getEventsForPage(events, perPage) {
  const startIndex = (currentPage - 1) * perPage;
  return events.slice(startIndex, startIndex + perPage);
}
const eventsToDisplay = getEventsForPage(filteredEvents, PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType ? evtType.toLowerCase() : "Toutes");
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => {
              if(value === "Toutes") {
                changeType(null);
                }else{
                changeType(value);
                }
              }
            }
        />
          <div id="events" className="ListContainer">
            {eventsToDisplay.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    key={event.id}
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
