import React, { useEffect, useState } from 'react';
import moment from 'moment';
import not_found_image from '../../images/not_found.PNG';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { getJobById } from '../../apis/getJobList';
import _ from 'lodash';
import { Fragment } from 'react';

function JobDescription() {
    const [job, setJob] = useState({});
    let { jobId } = useParams();
    console.log('param id', jobId);
    console.log('job choose 2', job);

    useEffect(() => {
        getJobById(jobId)
            .then((res) => {
                setJob(res.data);
            })
    }, [jobId])

    return (
        <Fragment>
            {
                !_.isEmpty(job) &&
                <div className="job">
                    <div className="sidebar-container">
                        <div className="sidebar-container-top">
                            <span className="material-icons">
                                trending_flat
                            </span>
                            <Link to="/">
                                <span>
                                    Back to search
                                </span>
                            </Link>
                        </div>
                        <div className="sidebar-container-bottom">
                            <span>HOW TO APPLY</span>
                            <span>
                                Please email a copy of your resume and online portfolio to
                            </span>
                            <a
                                href={job.refs.landing_page}
                                target="_blank" rel="noreferrer">
                                {`${job.company.name} landing page`}
                            </a>
                        </div>
                    </div>

                    <div className="main-description">
                        <div className="main-description-company">
                            <div>
                                <span>{job.name}</span>
                                <button>Full time</button>
                            </div>
                        </div>
                        <div className="main-description-time">
                            <span className="material-icons">
                                schedule
                            </span>
                            <span>{moment(job.publication_date).fromNow()}</span>
                        </div>
                        <div className="main-description-block">
                            <div>
                                {
                                    job.company &&
                                    <img src={`https://assets.themuse.com/uploaded/companies/${job.company.id}/small_logo.png?v=10ea4eb650de2d1ade64d89d0317e18970e14ad334e29292d381b68572fd849b`} alt="" />
                                }
                                {
                                    job.company === undefined &&
                                    <img src={not_found_image} alt="" />
                                }
                            </div>
                            <div>
                                <span>{job.company.name}</span>
                                <div>
                                    <span className="material-icons">
                                        public
                                    </span>
                                    <span>{job.locations[0].name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="main-description-content">
                            <div dangerouslySetInnerHTML={{ __html: job.contents }}></div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default JobDescription;