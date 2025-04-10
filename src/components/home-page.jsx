import { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { FaBolt } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import Swal from "sweetalert2";

export function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchLocation, setsearchLocation] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5050/get-data")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.log("Error in fetching data", error);
      });
  }, []);

  var filterJobs = jobs.filter((job) => {
    return job.location?.toLowerCase().includes(searchLocation.toLowerCase());
  });

  function QuickApply() {
    Swal.fire({
      title: "Success",
      text: "Applied Successfully",
      icon: "success",
    });
  }

  return (
    <>
      <div className="flex m-4 w-auto justify-end">
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setsearchLocation(e.target.value)}
          className="w-full max-w-md border-2 p-3 rounded-md border-amber-400"
        />
      </div>

      <div className="flex flex-col md:flex-row pe-2 m-4">
        <div className="w-full md:w-1/3 border-2 p-3 m-3 rounded-lg shadow-md h-[90vh] overflow-y-auto">
          {jobs.length === 0 ? (
            <p className="text-center text-blue-500 font-medium">
              Jobs Loading...
            </p>
          ) : filterJobs.length === 0 ? (
            <p className="text-center text-red-500 font-medium">
              No jobs found for this location
            </p>
          ) : (
            filterJobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className="bg-blend-darken cursor-pointer p-4 rounded-lg shadow-md w-full"
              >
                <h6 className="font-semibold">{job.title}</h6>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            ))
          )}
        </div>

        <div className="md:w-2/3 border-2 p-4 m-2 rounded-lg shadow-md">
          {selectedJob ? (
            <>
              <div className="flex flex-col  mt-2 gap-2">
                <div className="items-center">
                  <div className="flex items-center justify-between">
                    <h1 className="text-4xl text-black text-left rounded-sm font-bold">
                      {selectedJob.title}
                    </h1>
                    <img
                      src={selectedJob.companyImageUrl}
                      alt="Company Image"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <FaBuilding />

                    <p className="text-blue-600 p-1 bg-emerald-50">
                      {selectedJob.company}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-2 mb-2">
                    <FaLocationDot className="text-red-500" />
                    <p className="text-gray-700">
                      Location: {selectedJob.location}
                    </p>
                  </div>
                </div>
                <hr className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 border-0 rounded my-4" />

                <div className="flex flex-col">
                  <p className="text-3xl font-bold mb-2">Job Details</p>
                  <div className="col-auto border-1 p-3 m-2 rounded-sm">
                    <p className="cursor-pointer mb-2 ">
                      Job Link :{" "}
                      <a
                        className="text-blue-600 underline"
                        href={selectedJob.job_link}
                        target="_blank"
                      >
                        Click here
                      </a>{" "}
                    </p>
                    <p>Employment Type : {selectedJob.employment_type} </p>
                    <p>
                      Experience Required : {selectedJob.min_exp} -{" "}
                      {selectedJob.max_exp} Years
                    </p>
                    <p>Source : {selectedJob.source}</p>
                    <p>Country : {selectedJob.country}</p>
                    <p>
                      Posted :{" "}
                      {new Date(selectedJob.postedDateTime).toLocaleString(
                        "en-US",
                        { day: "2-digit", month: "long", year: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
                <hr className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 border-0 rounded my-4" />

                <buttonn
                  onClick={QuickApply}
                  className="flex items-center text-center w-40 border-2 gap-2 px-4 py-4  rounded-lg 
                                cursor-pointer bg-purple-800 text-white font-bold hover:bg-purple-900 transition duration-300"
                >
                  <FaBolt size={16} className="text-white" />
                  Quick Apply
                </buttonn>
              </div>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </>
  );
}
