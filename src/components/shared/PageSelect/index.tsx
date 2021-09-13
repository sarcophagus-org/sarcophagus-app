interface PageSelectProps {
  page: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  pageNumbers: number[];
  goToPage: (page: number) => void;
}

const PageSelect = ({
  page,
  totalPages,
  handleNextPage,
  handlePrevPage,
  pageNumbers,
  goToPage,
}: PageSelectProps) => (
  <div className="flex w-full justify-end pt-4 px-4">
    <div className="text-md" style={{ lineHeight: "1.325rem" }}>
      <button
        type="button"
        onClick={() => handlePrevPage()}
        className={
          page === 0 ? "text-gray-500 focus:outline-none cursor-default" : "text-white focus:outline-none"
        }
      >
        {"<"}
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          type="button"
          disabled={totalPages === 0}
          onClick={() => goToPage(num)}
          className={
            page === num
              ? "px-2 text-white focus:outline-none text-lg font-bold cursor-default"
              : "px-2 text-white focus:outline-none"
          }
        >
          {num + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => handleNextPage()}
        className={
          page === totalPages
            ? "text-gray-500 focus:outline-none cursor-default"
            : "text-white focus:outline-none"
        }
      >
        {">"}
      </button>
    </div>
  </div>
);

export default PageSelect;
