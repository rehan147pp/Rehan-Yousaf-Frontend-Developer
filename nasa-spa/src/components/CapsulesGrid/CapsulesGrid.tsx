import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, actions } from "../../store/store";
import {Capsule} from '../../interfaces/capsule.interface';
import Paginator from "../Paginator/Paginator";
import CapsuleGridItem from "./CapsuleGridItem/CapsuleGridItem";

const CapsulesGrid = () => {
  const filteredCapsules = useSelector((state: AppState) => state.filteredCapsules);
  const currentPageNo = useSelector((state: AppState) => state.currentPage);
  const pageSize = useSelector((state: AppState) => state.pageSize);
  const dispatch = useDispatch();

  const [currentPageCapsules, setCurrentPageCapsules] = useState([] as Capsule[]);

  const fetchCapsules = useCallback(async () => {
    try {
      dispatch(actions.setIsLoading(true));
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('token', localStorage.getItem('token') as string || '');
      const response = await fetch('http://localhost:3500/nasa-api/capsules', {
        method: 'GET',
        headers: requestHeaders
      });
      const capsules: Capsule[] = await response.json();
      dispatch(actions.setCapsules(capsules));
    } catch (e) {
      console.error('error', e);
    }
  }, []);

  useEffect(() => {
    fetchCapsules();
  }, []);

  useEffect(() => {
    const firstIndexOnCurrentPage = currentPageNo * pageSize;
    const lastIndexOnNextPage = currentPageNo * pageSize + pageSize;
    setCurrentPageCapsules(filteredCapsules.slice(firstIndexOnCurrentPage, lastIndexOnNextPage - 1))
  }, [pageSize, currentPageNo, filteredCapsules]);

  const gridView = currentPageCapsules.map((capsule) => <CapsuleGridItem key={capsule.capsule_serial} capsule={capsule}></CapsuleGridItem>);

  return <>
    <h1 className="mx-80 text-xl text-primary font-medium">Results</h1>
    <div className="grid grid-cols-4 gap-6  mx-80 my-10 h-fit mt-8">
      {gridView || null}    
      
    </div>
    <div className="mx-80 flex flex-row justify-center mb-8">
      <Paginator></Paginator>  
    </div>
  </>;
}

export default CapsulesGrid;