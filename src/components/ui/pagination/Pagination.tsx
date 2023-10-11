/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GreenLeftArrow from "../../../assets/arrow-left-icon.svg";
import WhiteRightArrow from "../../../assets/white-arrow-right-icon.svg";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
  // params = true,
}: {
  postsPerPage: number;
  totalPosts: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
  params?: boolean;
}) {
  const [totalPages, setTotalPages] = useState(1);
  // Change page
  const paginateFront = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const paginateBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (totalPosts >= 0) {
      const total_Pages = Math.ceil(totalPosts / postsPerPage);
      setTotalPages(total_Pages);
    }
  }, [totalPosts, postsPerPage]);

  return (
    <div className="mt-[45px] px-10 py-4 sm:px-6 w-full bg-[#F4F7F9] ">
      <div className="flex flex-1 justify-between md:hidden">
        <a
          className={`relative inline-flex items-center px-2 py-2 rounded border border-aellaBlue bg-aellaBlue text-sm font-[200] text-white hover:bg-opacity-90 cursor-pointer ${
            currentPage <= 1 ? "opacity-50" : ""
          }    `}
          onClick={() => {
            paginateBack();
          }}
          href="#"
          aria-disabled={currentPage <= 1}
        >
          <span>Previous</span>
        </a>
        <a
          href="#"
          className="relative inline-flex items-center border border-[#EDEFF5] bg-[#F6F8FA] px-4 py-2 text-sm font-[200]"
        >
          {currentPage}
        </a>
        <a
          onClick={(e) => {
            if (currentPage >= totalPages) {
              e.preventDefault();
            } else {
              paginateFront();
            }
          }}
          href=""
          aria-disabled={currentPage >= totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded border border-aellaBlue bg-aellaBlue text-sm font-[200] text-white hover:bg-opacity-90 cursor-pointer ${
            currentPage >= totalPages ? "opacity-50" : ""
          }`}
        >
          <span>Next</span>
        </a>
      </div>
      <div className="hidden md:flex flex-1 items-center w-full justify-between">
        <div>
          <p className="text-[16px] leading[24px] font-[400] text-[#6F7174] tracking-[0.2px]">
            <span className="font-[500] text-[#4D5154]">Records: </span>
            <span className="">
              {totalPosts === 0
                ? "0"
                : currentPage * postsPerPage - (postsPerPage - 1)}
            </span>{" "}
            -{" "}
            <span className="">
              {" "}
              {currentPage < totalPages
                ? currentPage * postsPerPage
                : totalPosts}
            </span>{" "}
            of <span className="">{totalPosts}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex items-center"
            aria-label="Pagination"
          >
            <a
              onClick={() => {
                paginateBack();
              }}
              className={`relative inline-flex items-center px-2 py-2  w-8 h-8 rounded-full hover:bg-opacity-90 cursor-pointer 
               
           ${currentPage <= 1 ? "bg-[#C8CCD0]" : "bg-[#ffffff]"}
                `}
              aria-disabled={currentPage <= 1}
            >
              <img src={GreenLeftArrow} alt="" height={16} width={16} />
            </a>
            <span className="ml-4 text-[16px] leading[24px] font-[400] text-[#4D5154]">
              Page
            </span>
            <span className="relative inline-flex items-center border-[0.4px] text-[#6F7174]  border-[#6F7174] rounded-md bg-white px-2 py-1 text-[16px] leading-[24px] font-[400] mx-4">
              {currentPage}
            </span>
            <span className="mr-4 text-[16px] leading[24px] font-[400] text-[#4D5154]">
              of {totalPages}
            </span>
            <a
              onClick={(e) => {
                if (currentPage >= totalPages) {
                  e.preventDefault();
                } else {
                  paginateFront();
                }
              }}
              aria-disabled={currentPage >= totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-full w-8 h-8  text-sm font-[200] text-white hover:bg-opacity-90 cursor-pointer  ${
                currentPage >= totalPages ? "bg-[#C8CCD0]" : "bg-incoverGreen"
              }`}
            >
              <img src={WhiteRightArrow} alt="" height={16} width={16} />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
