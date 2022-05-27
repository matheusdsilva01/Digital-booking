import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from '../pagination';
import { useParams, useSearchParams } from 'react-router-dom';
import CardResult from '../cardResult/cardResult';
import api from '../../services/index';
import './index.scss';

export default function ResultByCity() {
  const [hoteis, setHoteis] = useState([]);
  const hoteisPage = {
    content: hoteis,
    last: false,
    totalPages: '...',
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: false,
  };
  const [pageNumber, setPageNumber] = useState(0);
  const [page, setPage] = useState(hoteisPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const { city } = useParams();
  let checkin = searchParams.get('checkin');
  let checkout = searchParams.get('checkout');


  useEffect(() => {
    api.get(`products/search?city=${city}&checkin=${checkin}&checkout=${checkout}&size=5&page=${pageNumber}`).then(response => {
      setPage(response.data);
      setHoteis(response.data.content);
    }).catch((error) => {
      toast.error('Erro ao buscar os hoteis', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }, [city, checkin, checkout, pageNumber])

  const handlePageChange = (newNumber) => {
    setPageNumber(newNumber);
  };
  return (
    <>
      <section className='container-results' >
        <div className='container-cards'>
          <div className='title-container-results'>
            <p>Hoteis em <span>{city}</span>:</p>
          </div>
          {hoteis.length > 0 ?
            hoteis.map(hotel => (
              <CardResult key={hotel.id} item={hotel} />
            )) : <p>Ops sem hoteis nesta região</p>}
        </div>
        <Pagination page={page} onChange={handlePageChange} />
      </section>
    </>
  )
}
