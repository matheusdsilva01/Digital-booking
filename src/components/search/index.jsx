import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from '../../services/index.js';
import calendar from "../../assets/icons/calendar.svg";
import menuLocalizador from "../../assets/icons/icon-menu-localizador.svg";
import localizador from "../../assets/icons/localizador.svg";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.scss";
import "./index.scss";

export default function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCitys] = useState([]);
  const [datalist, setDatalist] = useState(document.getElementById("citys"));
  const [cityForSearch, setCityForSearch] = useState('');
  const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado",];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const navigate = useNavigate();
  const [largeWidth, setLargeWidth] = useState(false)

  useEffect(() => {
    window.innerWidth > 1207 ? setLargeWidth(true) : setLargeWidth(false)
    const handleResize = () => {
      if (window.innerWidth > 1207) {
        setLargeWidth(true)
      } else {
        setLargeWidth(false)
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [])


  useEffect(() => {
    api.get('cities').then(response => {
      setCitys(response.data)
    })
    setDatalist(document.getElementById("citys"));
  }, [])

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };
  const [myRef, setMyRef] = useState(false);

  const setValuesDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  const closeCalendar = () => {
    myRef.setOpen(false);
  };

  const verifyCityForSearch = () => {
    if (cityForSearch === '') {
      toast.error('Por favor, selecione um destino!', {
        position: "top-right",
        theme: "colored",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    } else {
      return true
    }
  }
  const mostOptions = (event) => {
    let value = event.target.value;
    let options = document.getElementsByClassName("option");
    setCityForSearch(value);

    for (const opt of options) {
      let text = opt.attributes.value.value.toLowerCase();
      if (text.includes(value.toLowerCase())) {
        opt.style.display = "flex";
      } else {
        opt.style.display = "none";
      }
    }
  };

  const displayOptions = () => {
    datalist.style.display = "block";
  };

  const close = () => {
    window.onclick = (e) => {
      if (e.target.className === "option") {
        setCityForSearch(e.target.attributes.value.value);
        datalist.style.display = "none"
      } else if (e.target.id === "input-destino") {
        datalist.style.display = "block"
      } else {
        datalist.style.display = "none"
      }
    }
  };

  const setValue = (e) => {
    document.getElementById("input-destino").value = e.target.attributes.value.value;
    close()
  };
  const generateDate = (date) => {
    if (date !== null) {
      let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
      let month = date.getMonth().toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      let year = date.getFullYear();
      return year + '/' + month + '/' + day;
    }
  }

  const searchByCitys = (e) => {
    e.preventDefault();
    let checkin = generateDate(startDate);
    let checkout = generateDate(endDate);
    if (verifyCityForSearch()) {
      navigate({
        pathname: `/search/${cityForSearch}`,
        search: `${createSearchParams({
          checkin: checkin,
          checkout: checkout,
        })}`
      })
    }
  }

  return (
    <>
      <section id="container-search">
        <h1>Buscar ofertas em hotéis, casas e muito mais</h1>
        <form className="inputs" onSubmit={(e) => searchByCitys(e)}>
          <div className="container-destino">
            <a>
              <img id="localizador" src={localizador} alt="icon-localizador" />
            </a>
            <input
              id="input-destino"
              onBlur={close}
              onFocus={displayOptions}
              onChange={mostOptions}
              type="text"
              autoComplete="off"
              placeholder="Onde vamos?"
            />
            <div className="datalist" onClick={(e) => setValue(e)} id="citys">
              {city.map((city) => (
                <div className="option" value={city.name} key={city.id}>
                  <img src={menuLocalizador} alt={menuLocalizador} className="icon" />
                  <div className="contents" >
                    {city.name}
                    <span>{city.country}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container-date">
            <a>
              <img id="calendar" src={calendar} alt="icon-calendar" />
            </a>
            <DatePicker
              locale={locale}
              formatWeekDay={(locale) => locale[0]}
              placeholderText="Check in - Check out"
              placeholder={true}
              selected={startDate}
              onChange={setValuesDate}
              shouldCloseOnSelect={false}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date() - 2}
              dateFormat="dd/MM/yyyy"
              selectsRange={true}
              monthsShown={largeWidth ? 2 : 1}
              excludeDates={[new Date()]}
              //close calendar
              ref={(r) => {
                setMyRef(r);
              }}
            >
              <div className="btn-close-calendar">
                <button onClick={closeCalendar}>Close</button>
              </div>
            </DatePicker>
          </div>
          <button id="confirm-search">Buscar</button>
        </form>
      </section>
    </>
  );
}
