import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState(data?.events || []);
  useEffect(() => {
    if (data) {
      const filtered = data.events.filter(event =>
        !type || event.type === type
      );
  
      setFilteredEvents(filtered);
      setCurrentPage(1);
    }
  }, [data, type]);

  const changeType = (evtType) => {
    if(evtType==="Toutes"){
      setType(null);
    }else {
      setType(evtType);
    }
    
  };

  const pageNumber = Math.ceil((filteredEvents?.length || 0) / PER_PAGE);

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(new Set(data?.events.map(event => event.type)))}
            onChange={changeType}
          />
          <div id="events" className="ListContainer">
            {filteredEvents
              .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
              .map(event => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
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
            {[...Array(pageNumber)].map((_, n) => (
              <a
              // eslint-disable-next-line react/no-array-index-key
                key={n}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
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





