import { useDispatch, useSelector } from "react-redux"
import { AppState, actions } from "../../store/store"

const Paginator = () => {
  const totalFilteredCapsules = useSelector((state: AppState) => state.totalFilteredCapsules);
  const pageSize = useSelector((state: AppState) => state.pageSize);
  const currentPage = useSelector((state: AppState) => state.currentPage);

  const dispatch = useDispatch();

  let totalPages = totalFilteredCapsules / pageSize;
  const remainder = totalFilteredCapsules % pageSize;
  if(remainder !== 0) {
    totalPages++;
  }

  const pagesArr: number[] = [];
  for(let i = 1; i<=totalPages; i++) {
    pagesArr.push(i);
  }

  const pages = pagesArr.map((pageNo, index) => <li key={'paginator-'+index+'-'+pageNo}>
  <button onClick={() => dispatch(actions.setCurrentPage(pageNo-1))} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" >{pageNo}</button>
</li>)

  return <nav >
    <ul className="inline-flex -space-x-px">
      <li key={'paginator--1--1'} >
        <button disabled={currentPage === 0} onClick={() => dispatch(actions.prevPage())} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
      </li>
      {pages}
      <li key={'paginator-last-last'}>
        <button disabled={currentPage === totalPages - 1} onClick={() => dispatch(actions.nextPage())} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
      </li>
    </ul>
  </nav>
}

export default Paginator;