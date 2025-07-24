import React, { useEffect, useReducer, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Blogpost from '../component/blogpost';
import Modal from '../component/modal';

export default function Home() {

  const [state, dispatch] = useReducer(reducer, {
    search: "",
    data: [],
    searchdata: [],
    filterdata: []
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");
  const [error, seterror] = useState("");
  function reducer(state, action) {
    switch (action.type) {
      case "handleSearchChange":
        return {
          ...state,
          search: action.nextvalue,
        };

      case "getData":
        return {
          ...state,
          data: action.valuedata,
          searchdata: action.valuedata,
          filterdata: action.valuedata,
        };

      case "searchData":
        return {
          ...state,
          filterdata: state.searchdata.filter((doc) =>
            doc.title.toLowerCase().includes(state.search.toLowerCase())
          ),
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        if (response.data) {
          dispatch({ type: "getData", valuedata: response.data });
        }
        setLoading(false);
      } catch (error) {
        seterror(error);
        setLoading(false);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "searchData" });
  }, [state.search]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="flex justify-center items-center mt-4">
      
        <div className="flex items-center bg-white shadow-lg rounded-xl px-4 py-2 border border-gray-300 w-72">
          <IoSearch className="text-gray-400 w-6 h-6" />
          <input
            type="text"
            className="ml-2 w-full p-2 rounded-lg focus:outline-none text-gray-600 placeholder-gray-400"
            placeholder="Search"
            value={state.search}
            onChange={(e) => dispatch({ type: "handleSearchChange", nextvalue: e.target.value })}
          />
        </div>
      </div>

      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      )}

    
      <div className="mt-10">
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-items-center">
          {state.filterdata.map((data, i) => (
            <div key={data.id} >
              <Blogpost setModal={setModal} index={data} i={i} />
              {modal === data.id && (
                <Modal modal={modal} height={"500px"} setModal={setModal}>
                  <div className="flex flex-col justify-between h-full  relative overflow-y-auto p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Modal</h2>
                    <div className="text-gray-700">
                      <h3 className="text-xl font-semibold">{data.title}</h3>
                      <p>{data.body}</p>
                    </div>
                    <div className="w-full mt-6 text-right">
                      <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                        onClick={() => setModal("")}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
