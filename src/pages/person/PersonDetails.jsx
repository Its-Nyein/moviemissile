import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPersonDetails, imagePath } from "../../services/fetcher";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { formatBirthday, getGender } from "../../helpers/helpers";

export const PersonDetails = () => {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [biography, setBiography] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchPersonDetails(id);
        console.log(data);
        setPerson(data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleBiography = () => {
    setBiography((prev) => !prev);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!person) {
    return <p className="text-center mt-4 text-gray-500">Person not found.</p>;
  }

  return (
    <Fragment>
      <div className="container mx-auto max-w-7xl px-4 my-5 grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <img
            src={`${imagePath}/${person?.profile_path}`}
            className="object-cover rounded-lg shadow"
          />
        </div>
        <div className="col-span-8 mt-0 mt-md-2 mt-xl-4">
          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Name</h4>
            <p>{person?.name}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Known For</h4>
            <p>{person?.known_for_department}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Popularity</h4>
            <p>{person?.popularity}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Gender</h4>
            <p>{getGender(person?.gender)}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Birthday</h4>
            <p>{formatBirthday(person?.birthday)}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Place of Birth</h4>
            <p>{person?.place_of_birth}</p>
          </div>

          <div className="gap-2 mb-3 items-center text-sm md:text-lg">
            <h4 className="text-[#353535] font-bold">Also Known As</h4>
            {person?.also_known_as.map((item, index) => {
              return (
                <div key={index}>
                  <p className="mb-1">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 container mx-auto max-w-7xl px-4 my-5 grid">
        <h2 className="text-lg font-bold text-[#353535] mb-2">Biography</h2>
        <span style={{ lineHeight: "1.25rem" }}>
          {biography
            ? person?.biography
            : person?.biography?.slice(0, 300) + "..."}
          <button
            onClick={toggleBiography}
            className="text-blue-500 font-semibold"
          >
            {biography ? "See Less" : "See More"}
          </button>
        </span>
      </div>
    </Fragment>
  );
};
