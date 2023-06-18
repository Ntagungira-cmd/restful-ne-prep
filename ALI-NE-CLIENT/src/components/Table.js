import React, { useState } from "react";
import axios from "axios";
import API_URL from "../api/api";
import { FiDelete} from "react-icons/fi";

const Table = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(data);

  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open modal with selected restaurant
  const openModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Close modal
  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //push menu item to the restaurant object for update
      selectedRestaurant.menu.push(formData);
      const response = await axios.put(
        `${API_URL}/restaurants/update/${selectedRestaurant._id}`,
        selectedRestaurant,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Menu Item Added Successfully");
        closeModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="table-container">
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-[90%] m-5 bg-white shadow-md mx-auto rounded-lg">
            <colgroup>
              <col className="w-1/3" />
              <col className="w-1/3" />
              <col className="w-1/3" />
            </colgroup>
            <thead>
              <tr>
                <th className="py-2 bg-blue-500 text-white">Name</th>
                <th className="py-2 bg-blue-500 text-white">Address</th>
                <th className="py-2 bg-blue-500 text-white">Owner</th>
                <th className="py-2 bg-blue-500 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row) => (
                <tr
                  key={row._id}
                  className="bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => openModal(row)}
                >
                  <td className="py-2 text-center">{row.name}</td>
                  <td className="py-2 text-center">{row.address}</td>
                  <td className="py-2 text-center">{row.type}</td>
                  <td className="py-2 text-center text-red-500"><FiDelete className="m-5"/></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center">
            <nav className="mt-4 mb-8">
              <ul className="pagination">
                {Array.from(Array(totalPages), (item, index) => (
                  <li
                    key={index}
                    className={`${
                      currentPage === index + 1
                        ? "bg-blue-500 rounded"
                        : "bg-blue-200 rounded"
                    } inline-block mx-1`}
                  >
                    <button
                      className={`${
                        currentPage === index + 1
                          ? "text-white"
                          : "text-gray-800"
                      } py-2 px-4`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div>No Data</div>
      )}
      {selectedRestaurant && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg h-[50vh] overflow-y-scroll">
            <h2 className="text-2xl font-bold mb-4">Restaurant Menu</h2>
            <div>
              {selectedRestaurant.menu.map((item) => (
                <div key={item._id} className="mb-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600 mb-2">${item.price}</p>
                  <p className="text-gray-600">{item.description}</p>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-40 rounded-lg mt-2"
                  />
                </div>
              ))}

              {/* Add Menu Item Form */}
              <form className="mb-4" onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium mb-2">Add Menu Item</h3>
                <div className="flex flex-col mb-2">
                  <label htmlFor="itemName" className="text-gray-600">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    name="name"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-2 py-1"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="itemPrice" className="text-gray-600">
                    Price:
                  </label>
                  <input
                    type="number"
                    id="itemPrice"
                    step="0.01"
                    name="price"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-2 py-1"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="itemDescription" className="text-gray-600">
                    Description:
                  </label>
                  <textarea
                    id="itemDescription"
                    name="description"
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-2 py-1"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="itemImage" className="text-gray-600">
                    Image URL:
                  </label>
                  <input
                    type="text"
                    id="itemImage"
                    name="image"
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-lg px-2 py-1"
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                />
              </form>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
