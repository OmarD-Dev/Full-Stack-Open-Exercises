const Filter = ({ filterTerm, handleFilter }) => (
  <div>
    Filter shown with: <input value={filterTerm} onChange={handleFilter} />
  </div>
);

export default Filter;
