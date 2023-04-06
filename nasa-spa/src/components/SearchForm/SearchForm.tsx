import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/store";

const SearchForm = () => {

  const statusInputRef = useRef<HTMLInputElement>(null);
  const typeInputRef = useRef<HTMLInputElement>(null);
  const originalLaunchDateInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const searchFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const dateValue = originalLaunchDateInputRef.current?.value;
    dispatch(actions.applyFilter({
      originalLaunchUnix:  dateValue? new Date(dateValue).getTime() : null,
      type: typeInputRef.current?.value || '',
      status: statusInputRef.current?.value || ''
    }))
  }

  return <>
    <div className='flex flex-column justify-center mx-10 lg:mx-80 my-10 h-fit mt-8 flex-wrap'>
      <div className="flex flex-row justify-center items-center w-full h-fit my-8">
        <h1 className="text-3xl font-medium text-accent inline-block">Search</h1>
      </div>
      <div className="w-full flex flex-row h-max">
        <form className="w-full" onSubmit={searchFormSubmitHandler}>
          <div className="grid gap-6 mb-6 grid-cols-2">
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
              <input ref={statusInputRef} type="text" id="status" className="bg-white border border-secondary text-accent text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " placeholder="Status" ></input>
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Original Launch</label>
              <input ref={originalLaunchDateInputRef} type="date" id="original_launch" className="bg-white border border-secondary text-accent text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Original Launch" ></input>
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
              <input ref={typeInputRef} type="text" id="type" className="bg-white border border-secondary text-accent text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Type" ></input>
            </div>
            <div className="flex items-end flex-column">
              <button type="submit" className="w-full py-2.5 border-primary border bg-primary text-white rounded-xl hover:bg-white hover:text-primary">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default SearchForm;