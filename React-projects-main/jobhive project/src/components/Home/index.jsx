import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { categoryData, levelData } from '../../data/data';
import moment from 'moment';
import not_found_image from '../../images/not_found.PNG';
import { Link } from 'react-router-dom';

Home.propTypes = {
    jobList: PropTypes.array,
    onCompanySubmit: PropTypes.func,
    onLocationSubmit: PropTypes.func,
    onChooseLevel: PropTypes.func,
    onChooseCategory: PropTypes.func,
};

Home.defaultProps = {
    jobList: [],
    onCompanySubmit: null,
    onLocationSubmit: null,
    onChooseLevel: null,
    onChooseCategory: null,
}

function Home(props) {
    const {
        jobList,
        onCompanySubmit,
        onLocationSubmit,
        onChooseLevel,
        onChooseCategory,
    } = props;

    const [companyValue, setCompanyValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const typingTimeoutCompanyRef = useRef(null);
    const typingTimeoutLocationRef = useRef(null);


    //Searching company name - Search debounce
    const handleSearchCompany = (e) => {
        const value = e.target.value;
        setCompanyValue(value);

        if (!onCompanySubmit) return;
        //Clear previous Timeout TO set new Timeout
        //SET - 100 -> CLEAR, SET - 1000 -> SUBMIT
        //SET - 1000 -> SUBMIT
        if (typingTimeoutCompanyRef.current) {
            clearTimeout(typingTimeoutCompanyRef.current);
        }
        //This will wait for user input value, if stop input enough 1s
        //this useRef will be run
        typingTimeoutCompanyRef.current = setTimeout(() => {
            if (value === '') {
                onCompanySubmit('');
                return;
            }
            const formValues = {
                searchTerm: value
            };
            onCompanySubmit(formValues.searchTerm);
        }, 1000);
    }

    const handleSubmitCompany = (e) => {
        if (!onCompanySubmit) return;
        if (e.key === 'Enter') {
            onCompanySubmit(companyValue);
        }
    }

    const handleButtonSubmitCompany = () => {
        if (!onCompanySubmit) return;
        onCompanySubmit(companyValue);
    }

    //Searching location - Search debounce
    const handleSearchLocation = (e) => {
        const value = e.target.value;
        setLocationValue(value);

        if (!onLocationSubmit) return;

        if (typingTimeoutLocationRef.current) {
            clearTimeout(typingTimeoutLocationRef.current);
        }
        typingTimeoutLocationRef.current = setTimeout(() => {
            if (value === '') {
                onLocationSubmit('');
                return;
            }
            const formValues = {
                searchTerm: value
            };
            onLocationSubmit(formValues.searchTerm);
        }, 1000);
    }

    const handleSubmitLocation = (e) => {
        if (!onLocationSubmit) return;
        if (e.key === 'Enter') {
            onLocationSubmit(locationValue);
        }
    }


    //Filter level and category
    const handleOnChooseLevel = (level) => {
        if (!onChooseLevel) return;
        onChooseLevel(level.target.value)
    }

    const handleOnChooseCategory = (cate) => {
        if (!onChooseCategory) return;
        onChooseCategory(cate.target.value)
    }


    return (
        <div className="home">
            <div className="companySearch" >
                <div
                    className="search">
                    <div className="search-container">
                        <span className="material-icons">
                            work_outline
                        </span>
                        <input
                            className="search-container-large"
                            onKeyPress={(e) => handleSubmitCompany(e)}
                            type="text"
                            placeholder="Title, companies, expertise or benefits"
                            value={companyValue}
                            onChange={handleSearchCompany} />
                        <input
                            className="search-container-small"
                            onKeyPress={(e) => handleSubmitCompany(e)}
                            type="text"
                            placeholder="Title, companies, experti..."
                            value={companyValue}
                            onChange={handleSearchCompany} />
                        <button onClick={() => handleButtonSubmitCompany()}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="home-flex">
                {/* Side bar */}
                <div className="sidebar" >
                    <div className="sidebar-container">
                        <div className="sidebar-container-checkbox">
                            <input type="checkbox" />
                            <span>Full time</span>
                        </div>
                        <div className="sidebar-container-location">
                            <span>LOCATION</span>
                            <div>
                                <span className="material-icons">
                                    public
                                </span>
                                <input
                                    onKeyPress={(e) => handleSubmitLocation(e)}
                                    type="text"
                                    placeholder="City, state, zip code or country"
                                    value={locationValue}
                                    onChange={handleSearchLocation} />
                                <span className="toolTipText">
                                    After typing in the location, press Enter to search
                                </span>
                            </div>
                        </div>
                        <div className="sidebar-container-filter">
                            <div>
                                <label>Category</label>
                                <select onChange={handleOnChooseCategory}>
                                    {
                                        categoryData().map((category) => (
                                            <option value={category}>
                                                {category}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Level</label>
                                <select onChange={handleOnChooseLevel}>
                                    {
                                        levelData().map((level) => (
                                            <option value={level}>
                                                {level}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main */}
                <div className="main">
                    {
                        jobList.results &&
                        jobList.results.slice(0, 5).map((job) => (
                            <Link to={`/job/${job.id}`}>
                                <div
                                    className="main-job">
                                    <div
                                        className="main-job-logo">
                                        {
                                            job.company &&
                                            <img src={`https://assets.themuse.com/uploaded/companies/${job.company.id}/small_logo.png?v=10ea4eb650de2d1ade64d89d0317e18970e14ad334e29292d381b68572fd849b`} alt="" />
                                        }
                                        {
                                            job.company.id === undefined &&
                                            <img src={not_found_image} alt="" />
                                        }
                                    </div>
                                    <div className="main-job-infor">
                                        <div className="main-job-infor-top">
                                            <span>{job.company.name}</span>
                                            <span>{job.name}</span>
                                        </div>
                                        <div className="main-job-infor-bottom">
                                            <button>Full time</button>
                                            <div>
                                                <div>
                                                    <span className="material-icons">
                                                        public
                                                    </span>
                                                    <span>{job.locations[0] && job.locations[0].name}</span>
                                                </div>
                                                <div>
                                                    <span className="material-icons">
                                                        schedule
                                                    </span>
                                                    <span>{moment(job.publication_date).fromNow()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;