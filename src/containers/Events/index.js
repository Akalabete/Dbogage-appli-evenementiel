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
  const typeList = new Set(data?.events.map((event) => event.type));
  const filteredEvents = data?.events.filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      if (!type) {
        return true; 
        }
      return event.type.toLowerCase() === type.toLowerCase(); 
      }
    return false;
    
  });

  const filteredEventsByType = data?.events.filter((event) => {    
    if (type === null || event.type === type) {
      return true;
    }
    return false;
  });


  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType ? evtType.toLowerCase() : null);
    
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
            selection={[...Array.from(typeList)]}
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
            {filteredEventsByType.map((event) => (
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
