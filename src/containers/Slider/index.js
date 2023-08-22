import { useEffect, useState } from "react";
import { useData, api } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [byDateDesc, setByDateDesc] = useState([]);

  const loadData = async () => {
    try {
      const loadedData = await api.loadData();
      const sortedData = loadedData.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
        );
      setByDateDesc(sortedData);
    } catch (err) {
      // Handle error
    }
  };
  
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    if (!data) {
      loadData();
    } else {
      setByDateDesc(data.focus);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);

    return () => clearInterval(interval);
  }, [byDateDesc]);

  if (!byDateDesc.length) {
    return null; 
  }
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                /* eslint-disable-next-line react/no-array-index-key */
                  key={`radio-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  readOnly
                  checked={index === radioIdx}
                  
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
