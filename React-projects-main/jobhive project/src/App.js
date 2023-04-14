import { useEffect, useState } from 'react';
import { getJobList } from './apis/getJobList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import queryString from 'query-string';
import './App.scss';

import Header from './components/Header';
import Loading from './components/Loading';
import Home from './components/Home';
import JobDescription from './components/JobDescription';


function App() {
  const [jobList, setJobList] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    company: null,
    location: null,
    category: null,
    level: null
  });
  const [loading, setLoading] = useState(true);

  //loading data
  useEffect(() => {
    const paramsString = queryString.stringify(filters, {
      skipNull: true
    });
    getJobList(paramsString)
      .then((res) => {
        setTimeout(() => {
          setJobList(res.data);
          setLoading(false);
        }, 3000)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [filters])


  const handlePageChange = (data) => {
    console.log('page', data.selected + 1);
    let newPage = data.selected + 1;
    setLoading(true);
    setFilters({
      ...filters,
      page: newPage
    })
  }

  const handleSubmitCompany = (company) => {
    setLoading(true);
    if (company === '') {
      setFilters({
        ...filters,
        company: null
      })
    }
    else {
      setFilters({
        ...filters,
        company: company,
        page: 1
      })
    }
  }

  const handleChooseCategory = (category) => {
    setLoading(true);
    if (category === 'All category') {
      setFilters({
        ...filters,
        category: null,
      })
    }
    else {
      setFilters({
        ...filters,
        category: category,
        page: 1
      })
    }
  }

  const handleChooseLevel = (level) => {
    setLoading(true);
    if (level === 'All level') {
      setFilters({
        ...filters,
        level: null,
      })
    }
    else {
      setFilters({
        ...filters,
        level: level,
        page: 1
      })
    }
  }

  const handleSubmitLocation = (location) => {
    setLoading(true);
    if (location === '') {
      setFilters({
        ...filters,
        location: null,
      })
    }
    else {
      setFilters({
        ...filters,
        location: location,
        page: 1
      })
    }
  }

  const handleResetPage = () => {
    window.location.reload();
  }


  return (
    <div className="app">
      <Header
        onPageChange={handleResetPage}
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              jobList={jobList}
              onCompanySubmit={handleSubmitCompany}
              onLocationSubmit={handleSubmitLocation}
              onChooseLevel={handleChooseLevel}
              onChooseCategory={handleChooseCategory}
            />
            <div className="app-pagination-container">
              <ReactPaginate
                previousLabel={
                  <span className="material-icons">
                    chevron_left
                  </span>}
                nextLabel={
                  <span className="material-icons">
                    chevron_right
                  </span>
                }
                breakLabel={
                  <span class="material-icons">
                    more_horiz
                  </span>
                }
                breakClassName="break-me"
                pageCount={jobList.page_count > 99 ? 99 : jobList.page_count}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName="app-pagination"
                activeClassName="active"
              />
            </div>
          </Route>
          <Route
            path='/job/:jobId' component={JobDescription} />
        </Switch>
      </Router>
      <Loading
        loading={loading}
      />
    </div>
  );
}

export default App;
